import { GoogleMapsEventsMap } from '../abstraction/types/events-map.type';

export const HookOutputSymbol = Symbol('LifecycleComponent.HookOutput');

/**
 * Marks a component @Output() member that will serve as an emitter of a native event.
 * Use in components/directive which inherit from `GoogleMapsComponentBase` to allow users of the component to handle native events in angular.
 * 
 * @param {string} nativeName (Optional) The name of the native event. If not provided, the name of the component member will be used.
 * 
 * @example
 * ``` @Hook @Output() public click: EventEmitter<IGoogleMapsEventData>;```
 */
export function Hook(nativeName?: string)
{
    return function HookDecorator(target: any, propertyName: string)
    {
        const decorated: GoogleMapsEventsMap = Reflect.getMetadata(HookOutputSymbol, target) || [];

        decorated.push({ name: propertyName, reference: nativeName || propertyName });

        Reflect.defineMetadata(HookOutputSymbol, decorated, target);
    }
}