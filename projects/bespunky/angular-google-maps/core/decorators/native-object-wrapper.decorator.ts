/**
 * The previous implementation of this decorator was done using a Proxy object.
 * Wrapper classes would get extended on instantiation and their constructor would return a proxy.
 * This was a cleaner solution code-wise, however it was very annoying for me to see a proxy object instead of
 * my class types when debugging, and also it caused inconcistencies...
 * 
 * @example
 * `const map = new GoogleMap(...)` would result in:
 * // map is Proxy
 * // map.superpowers.use(...).map is GoogleMap
 * map === map.superpowers.use(...).map // false 😒
 * 
 * As it was uncomfortable working like that, I reverted to and improved the first implementation which plants new
 * methods on the wrapper's prototype.
 * At any rate, the prototype implementation has the advantage of running once at initialization time and that's it.
 * The Proxy implementation had to analyze each read and redelegate.
 * Disadvantages: Does it make for a slower initialization? 🤔 not sure...
 * 
 * @see commit d11f5b426636694499bcf382f8bde56938288f31 for Proxy implementation.
 * https://dev.azure.com/BeSpunky/Libraries/_git/angular-google-maps/commit/d11f5b426636694499bcf382f8bde56938288f31?refName=refs%2Fheads%2Frefactor%2Finvisible-method-delegation
 */

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
export function NativeObjectWrapper<TNative extends Object, TWrapper extends Wrapper>(config: WrapperConfig<TNative, TWrapper>)
{        
    return function NativeObjectWrapperFactory<TConstructor extends Type<TWrapper>>(wrapperType: TConstructor)
    {
        const native         = config.nativeType.prototype;
        const definition     = config.definition || {};
        const outsideAngular = Reflect.getMetadata(OutsideAngularSymbol, wrapperType.prototype) as string[] || [];
        
        // First wrap all implemented methods marked with @OutsideAngular
        outsideAngular.forEach(methodName => wrapWrapperMethodOutside(wrapperType, methodName));
        // Then scan all native functions and wrap ones which are not already wrapped manually
        extractFunctions(native).forEach(functionName => wrapNativeFunction(wrapperType, functionName, definition[functionName]));
    };
}

/**
 * Extracts an array with the names of all function members defined on the given type.
 * 
 * @param {any} prototype The prototype for the type from which function names should be extracted.
 */
function extractFunctions(prototype: any): string[]
{
    if (!prototype) return [];

    return Object.getOwnPropertyNames(prototype)
                 .filter(property => property !== 'constructor' &&  prototype[property] instanceof Function)
                 .concat(extractFunctions(Object.getPrototypeOf(prototype)));
}

function wrapWrapperMethodOutside<TWrapper extends Wrapper>(wrapperType: Type<TWrapper>, methodName: string)
{
    const work = wrapperType.prototype[methodName];

    wrapperType.prototype[methodName] = function(...args: any[]): any
    {
        return this.api.runOutsideAngular(() => work.apply(this, args));
    };
}

function wrapNativeFunction<TNative extends Object, TWrapper extends Wrapper>(wrapperType: Type<TWrapper>, functionName: string, definition: WrapperFunctionDefinition<TNative, TWrapper>)
{
    if (wrapperType.prototype[functionName] instanceof Function) return;

    wrapperType.prototype[functionName] = delegateNativeFunction(wrapperType.name, functionName, definition);
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
 * @param {string} wrapperName The name of the wrapper class.
 * @param {string} functionName The name of the function to delegate.
 * @param {WrapperFunctionDefinition<TNative, TWrapper>} wrappingDef The wrapping definition for the function.
 * @returns {Function} A function that will execute the native function by its wrapping definition or by the defined default behaviour, bound to the native object instance.
 */
function delegateNativeFunction<TNative extends Object, TWrapper extends Wrapper>(wrapperName: string, functionName: string, wrappingDef: WrapperFunctionDefinition<TNative, TWrapper>): Function
{
    // If no special definitions were made, deduce delegation type
    if (wrappingDef === undefined)
    {
        if (isGetter(functionName)) return delegateInside(functionName);
        if (isSetter(functionName)) return delegateOutside(functionName);

        // The function is not a getter or a setter. It should neither be accessed nor specified as existant on the wrapper's intellisense list.
        return delegateExcludedError(wrapperName, functionName);
    }

    return wrappingDef === Delegation.Exclude ? delegateExcludedError(wrapperName, functionName) :
             wrappingDef === Delegation.OutsideAngular ? delegateOutside(functionName) :
               wrappingDef === Delegation.Direct ? delegateInside(functionName) : void 0;
}

/**
 * Wraps the specified function in a function that will execute it, bound to the context retrieved by `thisContext()`.
 * 
 * @param {Function} exec The function which actually implements the work to execute.
 * @returns {Function} A wrapping function that will execute the specified function, bound to the given context.
 */
function delegateInside(functionName: string): Function
{
    return function(...args: any[]): any
    {
        return this.native[functionName](...args);
    };
}

/**
 * Wraps the specified function in a function that will execute it outside angular, bound to the context retrieved by `thisContext()`.
 * This function assumes that the wrapper has an `api: GoogleMapsApiService` property.
 * 
 * @param {Function} exec The function which actually implements the work to execute.
 * @returns {Function} A wrapping function that will execute the specified function outside angular, bound to the given context.
 */
function delegateOutside(functionName: string): Function
{
    return function(...args: any[]): any
    {
        return this.api.runOutsideAngular(() => this.native[functionName](...args));
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
