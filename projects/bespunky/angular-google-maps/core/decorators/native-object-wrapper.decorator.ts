import { Type } from '@angular/core';

import { Wrapper                                              } from '../abstraction/types/abstraction';
import { WrapperConfig, Delegation, WrapperFunctionDefinition } from './wrapper-definition';
import { OutsideAngularSymbol                                 } from './outside-angular.decorator';

/**
 * Takes care of delegating method calls to the native object.
 * Should be placed over classes implementing `IGoogleMapsNativeObjectWrapper` (directly or indirectly).
 *
 * There are 3 pieces to the puzzle:
 * 1. Scanning the native prototype for functions and creating a wrapping function for each on the wrapper prototype.
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
 * - Use @OutsideAngular to decorate manually implemented wrapper methods which should run outside angular.
 * 
 * @export
 * @template TNative The type of native object being wrapped.
 * @template TWrapper The type of wrapper.
 * @param {WrapperConfig<TNative, TWrapper>} [config] Details of how the native type should be wrapped.
 */
export function NativeObjectWrapper<TWrapper extends Wrapper = any, TNative extends Object = any>(config: WrapperConfig<TNative, TWrapper>)
{        
    return function NativeObjectWrapperFactory<TConstructor extends Type<Wrapper>>(wrapperType: TConstructor)
    {
        const native         = config.nativeType.prototype;
        const definition     = config.definition || {};
        const wrapper        = wrapperType.prototype;
        const outsideAngular = Reflect.getMetadata(OutsideAngularSymbol, wrapper) as string[] || [];
        
        // First wrap all implemented methods marked with @OutsideAngular
        outsideAngular.forEach(methodName => wrap(wrapper, methodName, delegateWrapperMethod(wrapper, methodName, true)));
        // Then scan all native functions and wrap ones which are not already wrapped manually
        extractFunctions(native).forEach(functionName => wrap(wrapper, functionName, delegateNativeFunction(wrapper, native, functionName, definition[functionName])));
    };
}

/**
 * Extracts an array with the names of all function members defined on the given type.
 * 
 * @param {any} prototype The prototype for the type from which function names should be extracted.
 */
function extractFunctions<T extends Object>(prototype: any): string[]
{
    return Object.keys(prototype).filter(property => prototype[property] instanceof Function);
}

/**
 * Verifies that no implementation for the specified function exists on the wrapper and plants it on the wrapper's prototype.
 * No action will be taken for methods which already exist on the wrapper prototype. They will not be overwritten.
 *
 * @param {Type<Wrapper>} wrapperPrototype The type of wrapping class.
 * @param {string} methodName The name of the wrapping method.
 * @param {Function} run The function that actually holds the work to be done. Should already be bound to the the proper `this` context.
 */
function wrap(wrapperPrototype: any, methodName: string, run: Function): void
{
    if (wrapperPrototype[methodName] instanceof Function) return;

    wrapperPrototype[methodName] = run;
}

/**
 * Determines how the wrapper method should be executed and returns a function that implements it accordingly, bound to the wrapper instance when executed.
 * 
 * @param {any} wrapperPrototype The prototype of the wrapper holding the method to execute.
 * @param {string} methodName The name of the method to delegate.
 * @param {boolean} outside `true` if the method should be executed outside angular; otherwise `false`.
 * @returns {Function} A function that will execute the wrapper method by its wrapping definition, bound to the wrapper instance.
 */
function delegateWrapperMethod(wrapperPrototype: any, methodName: string, outside: boolean): Function
{
    const wrapperMethod = wrapperPrototype[methodName];

    return outside ? delegateOutside(wrapperMethod, wrapper => wrapper) : delegateInside(wrapperMethod, wrapper => wrapper);
}

/**
 * Determines how the native function should be executed and returns a function that implements it accordingly, bound to the native object instance when executed.
 * If a wrapping definition is provided for the function, it will be wrapped accordingly.
 * Otherwise:
 * - getXXX() functions will be returned as-is, bound to the native object.
 * - setXXX() functions will be wrapped with a function executing outside angular, bound to the native object.
 * - Anything else will be considered as an excluded function and will throw an error.
 *
 * @template TNative The type of native object holding the function to execute.
 * @template TWrapper The type of wrapper pointing to the native object.
 * @param {any} wrapperPrototype The prototype of the wrapper type.
 * @param {string} functionName The name of the function to delegate.
 * @param {WrapperFunctionDefinition<TNative, TWrapper>} wrappingDef The wrapping definition for the function.
 * @returns {Function} A function that will execute the native function by its wrapping definition or by the defined default behaviour, bound to the native object instance.
 */
function delegateNativeFunction<TNative extends Object, TWrapper extends Wrapper>(wrapperPrototype: any, nativePrototype: any, functionName: string, wrappingDef: WrapperFunctionDefinition<TNative, TWrapper>): Function
{
    const nativeFunction = nativePrototype[functionName];

    // If no special definitions were made, deduce delegation type
    if (!wrappingDef)
    {
        if (isGetter(functionName)) return delegateInside(nativeFunction, wrapper => wrapper.native);
        if (isSetter(functionName)) return delegateOutside(nativeFunction, wrapper => wrapper.native);

        // The function is not a getter or a setter. It should neither be accessed nor specified as existant on the wrapper's intellisense list.
        return delegateExcludedError(wrapperPrototype.name, functionName);
    }

    return wrappingDef === Delegation.Exclude ? delegateExcludedError(wrapperPrototype.name, functionName) :
             wrappingDef === Delegation.OutsideAngular ? delegateOutside(nativeFunction, wrapper => wrapper.native) :
               wrappingDef === Delegation.Direct ? delegateInside(nativeFunction, wrapper => wrapper.native) : void 0;
}

/**
 * Wraps the specified function in a function that will execute it, bound to the context retrieved by `thisContext()`.
 * 
 * @param {Function} exec The function which actually implements the work to execute.
 * @param {(wrapperInstance: Wrapper) => any} thisContext A function that will return the object instance to bind execution to.
 * @returns {Function} A wrapping function that will execute the specified function, bound to the given context.
 */
function delegateInside(exec: Function, thisContext: (wrapperInstance: Wrapper) => any): Function
{
    return function(...args: any[]): any
    {
        return exec.apply(thisContext(this), args);
    };
}

/**
 * Wraps the specified function in a function that will execute it outside angular, bound to the context retrieved by `thisContext()`.
 * This function assumes that the wrapper has an `api: GoogleMapsApiService` property.
 * 
 * @param {Function} exec The function which actually implements the work to execute.
 * @param {(wrapperInstance: Wrapper) => any} thisContext A function that will return the object instance to bind execution to.
 * @returns {Function} A wrapping function that will execute the specified function outside angular, bound to the given context.
 */
function delegateOutside(exec: Function, thisContext: (wrapperInstance: Wrapper) => any): Function
{
    return function(...args: any[]): any
    {
        return this.api.runOutsideAngular(() => exec.apply(thisContext(this), args));
    };
}

/**
 * Creates a function that throws the excluded native function error with the specified details.
 */
function delegateExcludedError(wrapperTypeName: string, methodName: string): Function
{
    return () => throwExcludedError(wrapperTypeName, methodName);
}

function throwExcludedError(wrapperTypeName: string, functionName: string): void
{
    throw new Error(
        `
        An attempt to execute '${wrapperTypeName}.${functionName}' was made, but '${functionName}' was excluded from wrapper delegation.\n\n
        Probable causes:\n
        - Your TypeScript wrapper extension interface doesn't omit '${functionName}' and intellisense permitted access to it.\n
        - This read attempt was made through a weak-typed object.\n
        - You didn't define delegation for '${functionName}'.\n\n
        Solutions:\n
        - Omit '${functionName}' from the TypeScript wrapper extension interface so TypeScript won't allow access to it.\n
        - Define delegation for '${functionName}' in the @NativeObjectWrapper decorator for '${wrapperTypeName}' to allow its delegation.
        `
    );
}

function isSetter(property: string): boolean { return /^set[A-Z][a-zA-Z0-9]*/.test(property); }
function isGetter(property: string): boolean { return /^get[A-Z][a-zA-Z0-9]*/.test(property); }
