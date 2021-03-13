import { Type  } from '@angular/core';

import { Wrapper           } from '../abstraction/types/abstraction';
import { WrapperDefinition } from './wrapper-definition';

/** The symbol used for identifying wrapping definition metadata of a wrapper object. See [`NativeObjectWrapper`](/docs/miscellaneous/functions.html#NativeObjectWrapper) decorator. */
export const NativeObjectWrapperSymbol = Symbol('nativeObjectWrapper');

/**
 * Takes care of delegating method calls to the native object.
 * All classes implementing `IGoogleMapsNativeObjectWrapper` (directly or indirectly) should be decorated with `@NativeObjectWrapper`.
 *
 * There are 3 pieces to the puzzle:
 * 1. Intercepting access to methods that don't exist on the wrapper and redirecting them to the native object.
 * 2. Providing Intellisense for for wrapping methods without providing their implementation (as it will be automated by #1).
 * 3. Delegating component input changes to the wrapper's methods.
 * 
 * See [`WrappedNativeFunctions`](/docs/miscellaneous/typealiases.html#WrappedNativeFunctions) for implementing #2.  
 * See [`GoogleMapsComponentApiService`](/docs/injectables/GoogleMapsComponentApiService.html) for implementing #3.
 *
 * #### Default behaviour:
 * - `getXXX()` and `setXXX()` calls are automatically delegated to the native object.
 * - `setXXX()` methods are automatically delegated outside angular.
 * - Anything else will be excluded and will throw an error if it doesn't already have an implementation on the wrapper.
 * 
 * #### Custom behaviour:
 * - Use the `definition` param to override and control what gets delegated and how it will be wrapped.
 * - Decorate manually implemented wrapper methods which should run outside angular with @OutsideAngular.
 *  
 * @template TWrapper The type of wrapper.
 * @param {WrapperDefinition<TWrapper>} [definition] (Optional) Additional wrapping definitions for native functions.
 */
export function NativeObjectWrapper<TWrapper extends Wrapper = any>(definition: WrapperDefinition<TWrapper> = {})
{
    return function NativeObjectWrapperFactory<TConstructor extends Type<Wrapper>>(wrapperType: TConstructor)
    {
        Reflect.defineMetadata(NativeObjectWrapperSymbol, definition, wrapperType);
    }
}
