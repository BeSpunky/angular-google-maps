import { Type } from '@angular/core';

import { OutsideAngularSymbol } from './outside-angular.decorator';
import { WrapSymbol } from './wrap.decorator';
import { Wrapper } from '../abstraction/types/abstraction';

/**
 * Should be placed over classes implementing `IGoogleMapsNativeObjectWrapper` (directly or indirectly).
 * The decorator will scan the class for methods decorated with `@Wrap` or `@OutsideAngular` and replace their implementation
 * with a wrapper method that calls the native function.
 * 
 * By itself, the decorator will not have any affect. Methods must be decorated for it to do the work.
 * This is necessary for the property delegation mechanism to work (see `GoogleMapsComponentApiService.delegateInputChangesToNativeObject()`).
 * You can implement the wrappers yourself but this will save you the need for repeating the same implementation each time.
 *  
 * @see `@Wrap` and `@OutsideAngular` to understand the implementation provided the decorators.
 */
export function NativeObjectWrapper(wrapper: Type<Wrapper>): void
{
    // Find all decorated methods
    const wrappedMap     = Reflect.getMetadata(WrapSymbol,           wrapper.prototype) as { [name: string]: string } || {};
    const outsideAngular = Reflect.getMetadata(OutsideAngularSymbol, wrapper.prototype) as string[]                   || [];

    const wrapped = Object.keys(wrappedMap);

    if (!wrapped.length) console.warn(`[NativeObjectWrapper ${wrapper.name}]: No method marked for wrapping. Property delegation will not work. Please use the @Wrap decorator.`);

    // Replace implementation for all methods decorated for wrapping
    wrapped.forEach(methodName => wrapNative(wrapper, methodName, wrappedMap[methodName]));

    // Wrap all decorated for outside angular execution with a call to `api.runOutsideAngular()`
    outsideAngular.forEach(methodName => wrapOutside(wrapper, methodName));
}

function wrapNative(wrapper: Type<Wrapper>, wrapperName: string, nativeName: string): void
{
    wrapper.prototype[wrapperName] = function(...args: any[])
    {
        // As the function is assigned to the prototype, not the instance, the original function should be bound
        // to the instance of the native object for which the call was triggered. Hence the call to `apply(native, args)`.
        return this.native[nativeName].apply(this.native, args);
    };
}

function wrapOutside(wrapper: Type<Wrapper>, wrapperName: string): void
{
    const original = wrapper.prototype[wrapperName] as (...args: any[]) => any;

    wrapper.prototype[wrapperName] = function(...args: any[])
    {
        // As the function is assigned to the prototype, not the instance, the original function should be bound
        // to the instance which triggered the call. Hence the call to `apply(this, args)`.
        return this.api.runOutsideAngular(() => original.apply(this, args));
    };
}