export const WrapSymbol = Symbol('wrapNativeFunction');

/**
 * Marks a method as a wrapper for a native function.
 * The wrapping method will async wait for Google Maps API to be ready, then call the native function
 * that has the same name as the wrapping method. Arguments will be automatically passed-in.
 * 
 * This should be used inside classes marked with `@NativeObjectWrapper`.
 * You do not need to provide any implementation for the method, as it will be replaced anyways.
 * An empty body with a `return void 0;` statement or anything else will suffice.
 * 
 * Can be used together with `@OutsideAngular`.
 *
 * @param {string} [nativeName] (Optional) In case your wrapping method has a different name to the native function,
 * specify the native name here for correctly directing method calls.
 * 
 * @see `GoogleMapsFeature` implementation for an example.
 */
export function Wrap(nativeName?: string)
{
    return function WrapDecorator(target: any, methodName: string, descriptor: PropertyDescriptor)
    {
        const decorated = Reflect.getMetadata(WrapSymbol, target) || {};

        decorated[methodName] = nativeName || methodName;

        Reflect.defineMetadata(WrapSymbol, decorated, target);
    }
}