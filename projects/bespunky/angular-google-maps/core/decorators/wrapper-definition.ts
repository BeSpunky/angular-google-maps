import { NativeOf, Wrapper            } from '../abstraction/types/abstraction';
import { FunctionProperties } from '../abstraction/types/utils';

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
     * This implicitly means `Delegation.Include` behind the scenes.
     */
    OutsideAngular,
    /**
     * The native function will not be delegated. Attempts to run it through the wrapper will throw an error.
     * Only necessary with native `getXXX()` and `setXXX()` functions, as the @NativeObjectWrapper decorator includes them automatically.
     * 
     * When specifying excluded functions, make sure to remove them from intellisense by creating a new `WrappedNativeFunctions` type for the wrapper extention interface.
     * If you need more flexability, replace `WrappedNativeFunctions` with your own implementation, like `Partial<FunctionPartial<TNative>, ...>` or `Omit<FunctionPartial<TNative>, ...>`.
     * 
     * @see https://www.typescriptlang.org/docs/handbook/interfaces.html#interfaces-extending-classes
     * @see https://www.typescriptlang.org/docs/handbook/utility-types.html
     */
    Exclude
};

/**
 * The supported types for defining delegation for a single native function.
 * 
 * Defined for scalability.
 */
export type WrapperFunctionDefinition<TWrapper extends Wrapper> = Delegation;

/**
 * The complete definition of function wrapping.
 * An object which keys are the names of native functions, and values are their delegation definition.
 * 
 * @example
 * const options: WrapperDefinition<GoogleMap> = {
 *     panTo      : Delegation.Direct,
 *     getOptions : Delegation.Exclude,
 *     fitBounds  : Delegation.OutsideAngular
 * }
 */
export type WrapperDefinition<TWrapper extends Wrapper> = Partial<Record<FunctionProperties<NativeOf<TWrapper>>, WrapperFunctionDefinition<TWrapper>>>;