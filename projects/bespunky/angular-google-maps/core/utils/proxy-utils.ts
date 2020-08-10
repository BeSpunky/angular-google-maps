import { NativeObjectWrapperSymbol                                } from '../decorators/native-object-wrapper.decorator';
import { OutsideAngularSymbol                                     } from '../decorators/outside-angular.decorator';
import { Delegation, WrapperFunctionDefinition, WrapperDefinition } from '../decorators/wrapper-definition';
import { Wrapper                                                  } from '../abstraction/types/abstraction';
import { IGoogleMapsNativeObject                                  } from '../abstraction/native/i-google-maps-native-object';
import { IGoogleMapsNativeObjectWrapper                           } from '../abstraction/base/i-google-maps-native-object-wrapper';

/** Represents the metadata for a wrapper object defined by decorators. Use `extractWrapperMetadata()` to retreive. */
export interface WrapperMetadata
{
    /** The constructor of the wrapper. */
    type: Function;
    /** Custom wrapping definitions defined for the wrapper class using the `@NativeObjectWrapper()` decorator. */
    definition: {};
    /** Map of manually decorated methods for execution outside angular. Structured as a map for O(1) access through the proxy object. */
    outsideAngular: { [methodName: string]: Delegation.OutsideAngular };
}

/**
 * Creates a proxy object trapping calls to the native object held by the wrapper.
 * Calls are delegated according to delegation rules and definitions. See `@NativeObjectWrapper()` decorator for default behavior.
 *
 * @template TNative The type of native object to proxy calls to.
 * @param {IGoogleMapsNativeObjectWrapper<TNative>} wrapper The wrapper which will be used to proxy calls to the native object.
 * @returns A proxy object delegating calls from the wrapper to the native object according to the rules defined by the library.
 * See `@NativeObjectWrapper()` decorator for default behavior.
 */
export function createNativeProxy<TWrapper extends IGoogleMapsNativeObjectWrapper<TNative>, TNative extends IGoogleMapsNativeObject = any>(wrapper: TWrapper)
{
    const { type, definition, outsideAngular } = extractWrapperMetadata(wrapper);
    
    return new Proxy(wrapper,
    {
        get: (wrapper, property) =>
        {
            const propertyName = property.toString();

            // If the wrapper contains a method with the specified name, give it precedence over the native function.
            // The manual wrapping method is now responsible for delegating execution to the native function.
            if (wrapper[property] instanceof Function) return delegateWrapperMethod(wrapper, propertyName, !!outsideAngular[propertyName]);
            // There is no method by the requested name on the wrapper.
            // If a native function by the requested name exists on the native object, delegate it.
            if (wrapper.native[property] instanceof Function) return delegateNativeFunction(wrapper, propertyName, definition[property], type.name);

            // No method or function with the name exists on the wrapper nor the native object. This is a property.
            return wrapper[property];
        }
    });
}

/**
 * Extracts decorators metadata from a wrapper object.
 *
 * @template TNative The type of native object being wrapped.
 * @param {Wrapper} wrapper The wrapper object to extract metadata from.
 * @returns {WrapperMetadata} The metadata defined for that type of wrapper.
 */
export function extractWrapperMetadata<TNative extends IGoogleMapsNativeObject>(wrapper: Wrapper): WrapperMetadata
{
    const type           = (wrapper as object).constructor;
    const definition     = Reflect.getMetadata(NativeObjectWrapperSymbol, type) as WrapperDefinition<TNative, Wrapper>                 || { };
    const outsideAngular = Reflect.getMetadata(OutsideAngularSymbol     , type) as { [methodName: string]: Delegation.OutsideAngular } || { };

    return { type, definition, outsideAngular };
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
 * @returns {Function} A function that will execute the wrapper method by its wrapping definition.
 */
export function delegateWrapperMethod(wrapper: Wrapper, methodName: string, outside: boolean): Function
{
    const wrapperMethod = wrapper[methodName];

    return outside ? delegateOutside(wrapperMethod.bind(wrapper), wrapper) : wrapperMethod;
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
 * @param {Type<Wrapper>} wrapperName The name of the wrapper class.
 * @returns {Function} A function that will execute the native function by its wrapping definition or by the defined default behaviour.
 */
export function delegateNativeFunction<TNative extends Object, TWrapper extends Wrapper>(wrapper: Wrapper, functionName: string, wrappingDef: WrapperFunctionDefinition<TNative, TWrapper>, wrapperName: string): Function
{
    const native = wrapper.native;
    const nativeFunction = native[functionName].bind(native);

    // If no special definitions were made, deduce delegation type
    if (!wrappingDef)
    {
        if (isGetter(functionName)) return nativeFunction;
        if (isSetter(functionName)) return delegateOutside(nativeFunction, wrapper);

        // The property function is not a getter or a setter. It shouldn't have been accessed.
        throwExcludedError(wrapperName, functionName);
    }

    return wrappingDef === Delegation.Exclude ? throwExcludedError(wrapperName, functionName) :
                wrappingDef === Delegation.Direct ? nativeFunction :
                    wrappingDef === Delegation.OutsideAngular ? delegateOutside(nativeFunction, wrapper) : void 0;
}

/**
 * Wraps the specified function in a function that will execute it outside angular.
 *
 * @param {Function} exec The function which actually implements the work to execute.
 * @param {Wrapper} wrapper The wrapper to bind the function to.
 * @returns {Function} A wrapping function that will execute the specified function outside angular.
 */
export function delegateOutside(exec: Function, wrapper: Wrapper): Function
{
    return function(...args: any[]): any
    {
        return this.api.runOutsideAngular(() => exec(...args));
    }.bind(wrapper);
}

export function isSetter(property: string): boolean { return /^set[A-Z][a-zA-Z0-9]*/.test(property); }
export function isGetter(property: string): boolean { return /^get[A-Z][a-zA-Z0-9]*/.test(property); }

export function throwExcludedError(wrapperTypeName: string, property: string): void
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