import { Type  } from '@angular/core';

import { Wrapper                       } from '../abstraction/types/abstraction';
import { GoogleMapsApiService          } from '../api/google-maps-api.service';
import { WrapperDefinition, Delegation } from './wrapper-definition';
import { OutsideAngularSymbol } from './outside-angular.decorator';
import { WrapperFunctionsProperties } from '../abstraction/types/extraction';

/**
 * Should be placed over classes implementing `IGoogleMapsNativeObjectWrapper` (directly or indirectly).
 * _________The decorator will scan the class for methods decorated with `@Wrap` or `@OutsideAngular` and replace their implementation
 * _________ with a wrapper method that calls the native function.
 * 
 * _________By itself, the decorator will not have any affect. Methods must be decorated for it to do the work.
 * _________This is necessary for the property delegation mechanism to work (see `GoogleMapsComponentApiService.delegateInputChangesToNativeObject()`).
 * _________You can implement the wrappers yourself but this will save you the need for repeating the same implementation each time.
 *  
 * @see `@Wrap` and `@OutsideAngular` to understand the implementation provided the decorators.
 *
 * @export
 * @template TNative The type of native object being wrapped.
 * @template TWrapper The type of wrapper.
 * @param {WrapperDefinition<TNative, TWrapper>} [definition] (Optional) Additional wrapping definitions for native functions.
 */
export function NativeObjectWrapper<TNative extends Object, TWrapper extends Wrapper = any>(definition: WrapperDefinition<TNative, TWrapper> = {})
{        
    return function NativeObjectWrapperFactory<TConstructor extends Type<Wrapper>>(wrapperType: TConstructor)
    {
        const outsideAngular = Reflect.getMetadata(OutsideAngularSymbol, wrapperType.prototype) as { [methodName: string]: Delegation } || { };
                
        return class extends wrapperType
        {
            // Allow intellisense to know that wrappers all have an api property.
            declare api: GoogleMapsApiService;

            constructor(...args: any[])
            {
                super(...args);

                return new Proxy(this, {
                    get: (wrapper, property, receiver) =>
                    {
                        console.log('wrapper:', wrapper);
                        console.log('property:', property);
                        console.log('receiver:', receiver);

                        const propertyName   = property.toString();
                        
                        // If the wrapper contains a method with the specified name, give it precedence to the native delegation.
                        // The manual wrapping method is now responsible for delegating execution to the native function.
                        if (wrapper[property] instanceof Function)
                        {
                            const wrapperMethod = wrapper[property].bind(wrapper);

                            return outsideAngular[propertyName] ? delegateOutside(wrapperMethod, this.api) : wrapperMethod; 
                        }

                        // --------------- There is no method by the requested name on the wrapper ---------------

                        const native         = wrapper.native;
                        const nativeProperty = native[property];

                        // If a native function by the requested name doesn't exist either, simply read the property from the wrapper object (it might be a value property, undefined, etc.)
                        if (!(nativeProperty instanceof Function)) return wrapper[property];
                        
                        // --------------- Native function exists with no wrapping implementation ---------------

                        const nativeFunction = nativeProperty.bind(native);
                        const wrappingDef    = definition[property];
                        
                        // If no special definitions were made, deduce delegation method
                        if (!wrappingDef)
                        {
                            if (isGetter(propertyName)) return nativeFunction;
                            if (isSetter(propertyName)) return delegateOutside(nativeFunction, this.api);

                            // The property function is not a getter or a setter. It shouldn't have been accessed.
                            throwExcludedError(wrapperType.name, propertyName);
                        }

                        return wrappingDef === Delegation.Exclude ? throwExcludedError(wrapperType.name, propertyName) :
                                 wrappingDef === Delegation.Direct ? nativeFunction :
                                   wrappingDef === Delegation.OutsideAngular ? delegateOutside(nativeFunction, this.api) : void 0;
                    }
                });
            }
        };
    };
}

function delegateOutside(exec: Function, api: GoogleMapsApiService): Function
{
    return function(...args: any[]): any
    {
        return api.runOutsideAngular(() => exec(...args));
    };
}

function isSetter(property: string): boolean { return /^set[A-Z][a-zA-Z0-9]*/.test(property); }
function isGetter(property: string): boolean { return /^get[A-Z][a-zA-Z0-9]*/.test(property); }

function throwExcludedError(wrapperTypeName: string, property: string): void
{
    throw new Error(
        `
        An attempt to read '${property}' on '${wrapperTypeName}' was made, but '${property}' was excluded from wrapper delegation.\n\n
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