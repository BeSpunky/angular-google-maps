import { Wrapper } from './abstraction';

/** Extracts all function names from the native type. */
export type FunctionProperties<TNative extends Object> = { [key in keyof TNative]: TNative[key] extends Function ? key : never }[keyof TNative];
/**
 * Extracts a type containing only the functions properties of a type.
 * Use this to declare an intellisense extension to a wrapper class. Remember to decorate the wrapper with @NativeObjectWrapper to actually add
 * implementations to the delegated functions.
 * 
 * @example
 * // Add all native map functions to map wrapper intellisense.
 * export interface GoogleMap extends FunctionsPartial<google.maps.Map>;
 */
export type FunctionsPartial<TNative extends Object> = { [key in FunctionProperties<TNative>]: (...args: Parameters<TNative[key]>) => ReturnType<TNative[key]> };
/**
 * Extracts all function names from the wrapper type, excluding names that were added to it by an extending interface.
 */
export type WrapperFunctionsProperties<TNative extends Object, TWrapper extends Wrapper> = Exclude<FunctionProperties<TWrapper>, FunctionProperties<TNative>>;