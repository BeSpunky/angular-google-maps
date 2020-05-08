import { Wrapper                                        } from '../abstraction/types/abstraction';
import { FunctionProperties, WrapperFunctionsProperties } from '../abstraction/types/extraction';

/**
 * Defines if and how a native function should be delegated.
 *
 * @export
 * @enum {number}
 */
export enum Delegation
{
    /**
     * The native function will be delegated. Attempts to run it through the wrapper will pass wrapper arguments to it and fetch the returned value.
     * By default, all `getXXX()` and `setXXX()` native functions are wrapped and delegated by the @NativeObjectWrapper decorator, so it is not necessary to specify them for inclusion.
     */
    Direct,
    /**
     * Includes the native function for delegation. Attempts to run it through the wrapper will execute it outside of angular's zone while passing wrapper arguments and fetching the returned value.
     * This implies `Delegation.Include`. If `Delegation.OutsideAngular` is specified, `Delegation.Include` is not needed.
     */
    OutsideAngular,
    /**
     * The native function will not be delegated. Attempts to run it through the wrapper will throw an error.
     * Only necessary with native `getXXX()` and `setXXX()` functions, as the @NativeObjectWrapper decorator includes them automatically.
     * 
     * When specifying excluded functions, make sure to remove them from intellisense by creating a new `Partial<FunctionPartial<TNative>, ...>` or an
     * `Omit<FunctionPartial<TNative>, ...>` type for the wrapper extention interface.
     * 
     * @see https://www.typescriptlang.org/docs/handbook/interfaces.html#interfaces-extending-classes
     * @see https://www.typescriptlang.org/docs/handbook/utility-types.html
     */
    Exclude
};

/**
 * Defines delegation for a wrapper method which triggers a native method with a different signature.
 * Use in case the wrapper needs to "upgrade" the native function or do some preprocessing before calling the native function.
 */
export type LinkedDelegation<TNative extends Object, TWrapper extends Wrapper> = {
    /**
     * The form of delegation to use when wrapping the native function.
     * `Delegation.Exclude` cannot be used here. To exclude, specify `Delegation.Exclude` directly as the value, without object notation.
     */
    delegation: Exclude<Delegation, Delegation.Exclude>,
    /**
     * The name of the wrapper method which will trigger the native function.
     *
     * @type {WrapperFunctionsProperties<TNative, TWrapper>} The names of the functions defined by the wrapper.
     */
    triggeredBy: WrapperFunctionsProperties<TNative, TWrapper>
};

/**
 * The supported types for defining delegation for a single native function.
 * In case the signature of the native function is the same as the wrapper function's signature, specify one of `Delegation`'s values.
 * Otherwise, if the name of the native function is different to the wrapper function's signature, use the `LinkedDelegation` object notation.
 */
export type WrapperFunctionDefinition<TNative extends Object, TWrapper extends Wrapper> = LinkedDelegation<TNative, TWrapper> | Delegation;
/**
 * The complete definition of function wrapping.
 * An object which keys are the names of native functions, and values are their delegation definition.
 * 
 * @example
 * const options: WrapperDefinition<google.maps.Map, GoogleMap> = {
 *     panTo      : Delegation.Direct,
 *     panToBounds: Delegation.Exclude,
 *     fitBounds  : { delegation: Delegation.OutsideAngular, triggeredBy: 'fit' }
 * }
 */
export type WrapperDefinition<TNative extends Object, TWrapper extends Wrapper> = Partial<Record<FunctionProperties<TNative>, WrapperFunctionDefinition<TNative, TWrapper>>>;