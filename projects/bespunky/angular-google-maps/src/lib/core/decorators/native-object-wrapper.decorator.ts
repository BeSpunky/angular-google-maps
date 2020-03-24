import { keyBy } from 'lodash';
import { Type } from '@angular/core';
import { IGoogleMapsNativeObject } from '../abstraction/native/i-google-maps-native-object';
import { IGoogleMapsNativeObjectWrapper } from '../abstraction/base/i-google-maps-native-object-wrapper';

/** Defines the structure for providing wrapper definitions when using the `@NativeObjectWrapper()`. */
export interface NativeObjectWrapperDefinition
{
    /** The type of object being wrapped (e.g. `google.maps.Map`, `google.maps.Marker`, etc.). */
    nativeType: Type<IGoogleMapsNativeObject>;
    /**
     * The names specific native functions to explicitly include or exclude as from wrapping.
     * No need to specify native functions matching the pattern 'getXXX'. They will automatically wrap.
     * Functions explictly included here will execute async **inside of angular** when maps api is ready.
     * 
     * If you want the wrapping method to have a different name to the native one, use object notation instead of array.
     * @example
    * wrapInside: ['add', 'remove'] // will wrap the `add` and `remove` functions with the same names.
    * wrapInside: { add: 'addFeature', remove: 'removeFeature' } // will wrap them with new names.
     */
    wrapInside?: string[] | { [name: string]: string };
    /**
    * The names specific native functions to explicitly include or exclude as from wrapping.
    * No need to specify native functions matching the pattern 'getXXX'. They will automatically wrap.
    * Functions explictly included will execute async **outside of angular** when maps api is ready.
    * 
    * If you want the wrapping method to have a different name to the native one, use object notation instead of array.
    * @example
    * wrapOutside: ['add', 'remove'] // will wrap the `add` and `remove` functions with the same names.
    * wrapOutside: { add: 'addFeature', remove: 'removeFeature' } // will wrap them with new names.
    */
    wrapOutside?: string[] | { [name: string]: string };
    /** The names of any native 'getXXX' or 'setXXX' functions to exclude from automatic wrapping. */
    exclude?: string[]
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
    const { nativeType, wrapInside = [], wrapOutside = [], exclude = [] } = wrapperDef;

    exclude.push('constructor'); // Never wrap the constructor

    // Map arrays to objects instead of array to allow O(1) access
    const wrapInsideMap  = Array.isArray(wrapInside)  ? keyBy(wrapInside)  : wrapInside;
    const wrapOutsideMap = Array.isArray(wrapOutside) ? keyBy(wrapOutside) : wrapOutside;
    const excluded       = keyBy(exclude);

    return function NativeObjectWrapperDecorator(wrapper: Type<IGoogleMapsNativeObjectWrapper>): void
    {
        // Using for...in so all keys are extracted at all prototype levels
        for (let name in nativeType.prototype)
        {
            if (excluded[name]) continue;

            if (shouldWrap(name, wrapInsideMap, excluded, /^get[A-Z]/))
            {
                if (!alreadyWrapped(wrapper, wrapInsideMap[name] || name))
                    wrapInsideAngular(wrapper, name, wrapInsideMap[name]);
            }
            else if (shouldWrap(name, wrapOutsideMap, excluded, /^set[A-Z]/))
            {
                if (!alreadyWrapped(wrapper, wrapInsideMap[name] || name))
                    wrapOutsideAngular(wrapper, name, wrapOutsideMap[name]);
            }
        }
    }
}

function shouldWrap(nativeName: string, explicitWrap: { [name: string]: string }, excluded: { [name: string]: string}, regex: RegExp): boolean
{   
    return !excluded[nativeName] && (!!explicitWrap[nativeName] || !!nativeName.match(regex));
}

function alreadyWrapped(wrapper: Type<IGoogleMapsNativeObjectWrapper>, name: string): boolean
{
    return wrapper.prototype[name] instanceof Function;
}

function wrapInsideAngular(wrapper: Type<IGoogleMapsNativeObjectWrapper>, nativeName: string, wrapperName: string = nativeName)
{
    wrapper.prototype[wrapperName] = async function(...args: any[])
    {
        return (await this.native)[nativeName](...args);
    };
}

function wrapOutsideAngular(wrapper: Type<IGoogleMapsNativeObjectWrapper>, nativeName: string, wrapperName: string = nativeName)
{
    wrapper.prototype[wrapperName] = function(...args: any[])
    {
        return this.api.runOutsideAngular(() => this.native.then(native => native[nativeName](...args)));
    };
}