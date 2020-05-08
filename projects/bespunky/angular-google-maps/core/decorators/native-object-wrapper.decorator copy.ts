import { Type  } from '@angular/core';

import { Wrapper                                                  } from '../abstraction/types/abstraction';
import { GoogleMapsApiService                                     } from '../api/google-maps-api.service';
import { WrapperDefinition, Delegation, WrapperFunctionDefinition } from './wrapper-definition';
import { OutsideAngularSymbol                                     } from './outside-angular.decorator';

/**
 * Takes care of delegating method calls to the native object.
 * Should be placed over classes implementing `IGoogleMapsNativeObjectWrapper` (directly or indirectly).
 *
 * There are 3 pieces to the puzzle:
 * 1. Intercepting access to methods that don't exist on the wrapper and redirecting them to the native object.
 * 2. Providing Intellisense for for wrapping methods without providing their implementation (as it will be automated by #1).
 * 3. Delegating component input changes to the wrapper's methods.
 * 
 * @see `FunctionsPartial`              for implementing #2.
 * @see `GoogleMapsComponentApiService` for implementing #3.
 * 
 * Default behaviour:
 * - `getXXX()` and `setXXX()` calls are automatically delegated to the native object.
 * - `setXXX()` methods are automatically delegated outside angular.
 * - Anything else will be excluded and will throw an error if it doesn't already have an implementation on the wrapper.
 * 
 * Custom behaviour:
 * - Use the `definition` param to control what gets delegated and how it will be wrapped.
 * - Decorate manually implemented wrapper methods which should run outside angular with @OutsideAngular.
 * 
 * @export
 * @template TNative The type of native object being wrapped.
 * @template TWrapper The type of wrapper.
 * @param {WrapperDefinition<TNative, TWrapper>} [definition] (Optional) Additional wrapping definitions for native functions.
 */
export function NativeObjectWrapper<TNative extends Object, TWrapper extends Wrapper = any>(definition: WrapperDefinition<TNative, TWrapper> = {})
{        
    return function NativeObjectWrapperFactory<TConstructor extends Type<Wrapper>>(wrapperType: TConstructor)
    {
        const outsideAngular = Reflect.getMetadata(OutsideAngularSymbol, wrapperType.prototype) as { [methodName: string]: Delegation } || { };
                
        return class extends wrapperType
        {
            // Allow intellisense to know that wrappers all have an api property.
            declare api: GoogleMapsApiService;

            constructor(...args: any[])
            {
                super(...args);

                return new Proxy(this, {
                    get: (wrapper, property) =>
                    {
                        const propertyName = property.toString();
                        
                        // If the wrapper contains a method with the specified name, give it precedence to the native delegation.
                        // The manual wrapping method is now responsible for delegating execution to the native function.
                        if (wrapper[property] instanceof Function) return delegateWrapperMethod(wrapper, propertyName, !!outsideAngular[propertyName], this.api);

                        // There is no method by the requested name on the wrapper.
                        // If a native function by the requested name doesn't exist either, simply read the property from the wrapper object (it might be a value property, undefined, etc.)
                        if (!(wrapper.native[property] instanceof Function)) return wrapper[property];
                        
                        // Native function exists with no wrapping implementation. Delegate implementation to the native object.
                        return delegateNativeFunction(wrapper, propertyName, definition[property], wrapperType, this.api);
                    }
                });
            }
        };
    };
}

/**
 * Determines how the wrapper method should be executed and returns a function that implements it accordingly.
 * If the method should be executed outside angular, it will be wrapped and returned.
 * Otherwise, the method itself will be returned.
 * 
 * Note: This is defined here and not as a private method of the extending class to avoid exposing it to the object's user.
 *
 * @param {Wrapper} wrapper The wrapper object holding the method to execute.
 * @param {string} methodName The name of the method to delegate.
 * @param {boolean} outside `true` if the method should be executed outside angular; otherwise `false`.
 * @param {GoogleMapsApiService} api An instance of GoogleMapsApiService.
 * @returns {Function} A function that will execute the wrapper method by its wrapping definition.
 */
function delegateWrapperMethod(wrapper: Wrapper, methodName: string, outside: boolean, api: GoogleMapsApiService): Function
{
    const wrapperMethod = wrapper[methodName].bind(wrapper);

    return outside ? delegateOutside(wrapperMethod, api) : wrapperMethod;
}

/**
 * Determines how the native function should be executed and returns a function that implements it accordingly.
 * If a wrapping definition is provided for the function, it will be wrapped accordingly.
 * Otherwise:
 * - getXXX() functions will be returned as-is.
 * - setXXX() functions will be wrapped with a function executing outside angular.
 * - Anything else will be considered as an excluded function and will throw an error.
 *
 * Note: This is defined here and not as a private method of the extending class to avoid exposing it to the object's user.
 * 
 * @template TNative The type of native object holding the function to execute.
 * @template TWrapper The type of wrapper pointing to the native object.
 * @param {Wrapper} wrapper The wrapper holding the native object.
 * @param {string} functionName The name of the function to delegate.
 * @param {WrapperFunctionDefinition<TNative, TWrapper>} wrappingDef The wrapping definition for the function.
 * @param {Type<Wrapper>} wrapperType The type of the wrapping object.
 * @param {GoogleMapsApiService} api An instance of GoogleMapsApiService.
 * @returns {Function} A function that will execute the native function by its wrapping definition or by the defined default behaviour.
 */
function delegateNativeFunction<TNative extends Object, TWrapper extends Wrapper>(wrapper: Wrapper, functionName: string, wrappingDef: WrapperFunctionDefinition<TNative, TWrapper>, wrapperType: Type<Wrapper>, api: GoogleMapsApiService): Function
{
    const native         = wrapper.native;
    const nativeFunction = native[functionName].bind(native);

    // If no special definitions were made, deduce delegation type
    if (!wrappingDef)
    {
        if (isGetter(functionName)) return nativeFunction;
        if (isSetter(functionName)) return delegateOutside(nativeFunction, api);

        // The property function is not a getter or a setter. It shouldn't have been accessed.
        throwExcludedError(wrapperType.name, functionName);
    }

    return wrappingDef === Delegation.Exclude ? throwExcludedError(wrapperType.name, functionName) :
             wrappingDef === Delegation.Direct ? nativeFunction :
               wrappingDef === Delegation.OutsideAngular ? delegateOutside(nativeFunction, api) : void 0;
}

/**
 * Wraps the specified function in a function that will execute it outside angular.
 *
 * @param {Function} exec The function which actually implements the work to execute.
 * @param {GoogleMapsApiService} api An instance of GoogleMapsApiService.
 * @returns {Function} A wrapping function that will execute the specified function outside angular.
 */
function delegateOutside(exec: Function, api: GoogleMapsApiService): Function
{
    return function(...args: any[]): any
    {
        return api.runOutsideAngular(() => exec(...args));
    };
}

function isSetter(property: string): boolean { return /^set[A-Z][a-zA-Z0-9]*/.test(property); }
function isGetter(property: string): boolean { return /^get[A-Z][a-zA-Z0-9]*/.test(property); }

function throwExcludedError(wrapperTypeName: string, property: string): void
{
    throw new Error(
        `
        An attempt to execute '${wrapperTypeName}.${property}' was made, but '${property}' was excluded from wrapper delegation.\n\n
        Probable causes:\n
        - Your TypeScript wrapper extension interface doesn't omit '${property}' and intellisense permitted access to it.\n
        - This read attempt was made through a weak-typed object.\n
        - You didn't define delegation for '${property}'.\n\n
        Solutions:\n
        - Omit '${property}' from the TypeScript wrapper extension interface so TypeScript won't allow access to it.\n
        - Define delegation for '${property}' in the @NativeObjectWrapper decorator for '${wrapperTypeName}' to allow its delegation.
        `
    );
}