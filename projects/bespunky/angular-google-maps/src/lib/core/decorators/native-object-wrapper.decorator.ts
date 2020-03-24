import { Type } from '@angular/core';
import { IGoogleMapsNativeObject } from '../abstraction/native/i-google-maps-native-object';
import { IGoogleMapsNativeObjectWrapper } from '../abstraction/base/i-google-maps-native-object-wrapper';

/** Defines the structure for providing wrapper definitions when using the `@NativeObjectWrapper()`. */
export interface NativeObjectWrapperDefinition
{
    /** The type of object being wrapped (e.g. `google.maps.Map`, `google.maps.Marker`, etc.). */
    nativeType: Type<IGoogleMapsNativeObject>,
    /**
     * Any specific native functions not starting the word 'get' to include or exclude as getters.
     * See decorator documentation to understand how the function will be wrapped.
     * 
     * Specify the native function name as key, and assign it `true` to force include, `false` to force exclude.
     */
    explicitGetters?: { [name: string]: boolean }
     /**
     * Any specific native functions not starting the word 'set' to include or exclude as setters.
     * See decorator documentation to understand how the function will be wrapped.
     * 
     * Specify the native function name as key, and assign it `true` to force include, `false` to force exclude.
     */
    explicitSetters?: { [name: string]: boolean }
}

/**
 * Mark classes implementing `IGoogleMapsNativeObjectWrapper` (directly or indirectly) and they will be assigned
 * with all the `getXXX()` and `setXXX()` functions that exist on the corresponding native type.
 * For example, marking GoogleMap will add `getZoom()`, `setZoom()`, `getCenter()`, `setCenter()`, etc.
 * 
 * Getters will wait on the map api ready promise, then retrieve the value from the native object.
 * Setters will wait on the map api ready promise, then, outside angular, will set the new value to the native object.
 * 
 * This is necessary for the property delegation mechanism to work (see `GoogleMapsInternalApiService.delegateInputChangesToNativeObject()`).
 * 
 * If you want to implement the getter/setter wrapper yourself, simply do. The decorator will detect the existing function and will not overwrite it.
 * 
 * Note: To have intellisense list the getters and setters on wrapper objects, create an interface with the same name as the wrapper class
 * and define the method signatures (see `interface GoogleMap` at `google-map.ts`).
 *
 * @param {NativeObjectWrapperDefinition} wrapperDef The definition of the native wrapper.
 */
export function NativeObjectWrapper(wrapperDef: NativeObjectWrapperDefinition)
{
    const { nativeType, explicitGetters: specialGetters, explicitSetters: specialSetters } = wrapperDef;

    return function NativeObjectWrapperDecorator(wrapper: Type<IGoogleMapsNativeObjectWrapper>): void
    {
        // Using object instead of array to allow O(1) access
        const excluded = {
            constructor: true
        };

        // Using for...in so all keys are extracted at all prototype levels
        for (let name in nativeType.prototype)
        {
            if (excluded[name]) continue;
            
            if (shouldWrap(name, specialGetters, /^get[A-Z]/))
            {
                if (!alreadyWrapped(wrapper, name))
                    wrapGetter(wrapper, name);
            }
            else if (shouldWrap(name, specialSetters, /^set[A-Z]/))
            {
                if (!alreadyWrapped(wrapper, name))
                    wrapSetter(wrapper, name);
            }
        }
    }
}

function shouldWrap(nativeName: string, explicits: { [name: string]: boolean } = {}, regex: RegExp)
{
    // Wrap only functions that match the getter/setter pattern and weren't excluded (i.e. they weren't configured with `false`),
    // or functions that were included (i.e. they were configured with `true`)

    if (explicits[nativeName] === undefined) return nativeName.match(regex);
    
    return explicits[nativeName];
}

function alreadyWrapped(wrapper: Type<IGoogleMapsNativeObjectWrapper>, name: string): boolean
{
    return wrapper.prototype[name] instanceof Function;
}

function wrapGetter(wrapper: Type<IGoogleMapsNativeObjectWrapper>, name: string)
{
    wrapper.prototype[name] = async function(...args: any[])
    {
        return (await this.native)[name](...args);
    };
}

function wrapSetter(wrapper: Type<IGoogleMapsNativeObjectWrapper>, name: string)
{
    wrapper.prototype[name] = function(...args: any[])
    {
        return this.api.runOutsideAngular(() => this.native.then(native => native[name](...args)));
    };
}