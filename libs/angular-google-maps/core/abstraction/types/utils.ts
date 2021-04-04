/** Extracts all property names matching `TProperty` in type. */
export type Properties<T extends Object, TProperty> = { [key in keyof T]: T[key] extends TProperty ? key : never }[keyof T];
/** Extracts all function names from the native type. */
export type FunctionProperties<T extends Object> = Properties<T, Function>;
/** Extracts an object type containing only the function defined by T. */
export type FunctionsPartial<T extends Object> = { [key in FunctionProperties<T>]: (...args: Parameters<T[key]>) => ReturnType<T[key]> };