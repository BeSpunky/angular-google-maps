import { Input } from '@angular/core';

export const WrapperInputSymbol = Symbol('LifecycleComponent.WrapperInput');

/**
 * Marks a component input member that will serve as the native wrapper.
 * Use in components/directive which inherit from `GoogleMapsLifecycleBase` to allow users of the component the flexibility of setting the nativeWrapper
 * themselves, instead of having the component instantiate one for them.
 *
 * This decorator wraps angular's `@Input()` decorator, so there's no need to mark the input member again.
 * @see GoogleMapComponent source code for an example.
 * 
 * @param {string} [bindingPropertyName] (Optional) A different name by which the member would be bound to the template. See angular's `@Input()` decorator for more info.
 */
export function WrapperInput(bindingPropertyName?: string)
{
    return function(target: any, propertyName: string)
    {
        const markInput = Input(bindingPropertyName);
        
        markInput(target, propertyName);

        Reflect.defineMetadata(WrapperInputSymbol, propertyName, target);
    }
}