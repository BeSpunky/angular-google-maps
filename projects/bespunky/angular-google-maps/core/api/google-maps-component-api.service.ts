import { fromEventPattern, Observable } from 'rxjs';
import { filter, switchMap, pluck     } from 'rxjs/operators';
import { Injectable, SimpleChanges    } from '@angular/core';

import { camelCase                } from '@bespunky/angular-google-maps/_internal';
import { GoogleMapsEventsMap      } from '../abstraction/types/events-map.type';
import { GoogleMapsEventData      } from '../abstraction/events/google-maps-event-data';
import { GoogleMapsComponentBase  } from '../abstraction/base/google-maps-component-base';
import { EmittingWrapper, Wrapper } from '../abstraction/types/abstraction';
import { HookOutputSymbol         } from '../decorators/hook.decorator';
import { GoogleMapsApiService     } from './google-maps-api.service';
    
/**
 * Provides tools for automating the component <-> wrapper relationship.
 */
@Injectable({
    providedIn: 'root'
})
export class GoogleMapsComponentApiService
{
    /**
     * Creates an instance of GoogleMapsComponentApiService.
     * @param {GoogleMapsApiService} api The low-level tools of the framework.
     */
    constructor(public api: GoogleMapsApiService) { }

    /**
     * Creates and assigns observables for component outputs decorated with the `@Hook()`. Any existing values will be overwritten.
     * The generated observables are automatically hooked to events of the native object represented by the given wrapper.
     * This method should be called in the component's constructor. This way, when angular attempts to bind template events it
     * will pick up the generated observables.
     *
     * Event arguments are automatically transformed using the `EventDataTransformService`.
     * In case a component's events should be hooked to a wrapper different to the one it holds, you can pass the it in using the `wrapper` argument.
     * 
     * Note: [02-04-2020 Shy Agam] The whole idea of this method is to generate the observables itself and assign it to the `@Output()` members
     * so angular could subscribe and unsubscribe automatically without the need for manually handling `OnInit` and `OnDestroy`.
     * Currently, angular uses `EventEmitter` objects as standard. However, going the angular way requires a mechamism that will trigger the
     * `emit()` method of the emitter. Wrapping it in a class that manages an observable and hooks the `emit()` method? Merging somehow the observable with
     * with the emitter stream? Too complex and seems unnecessary as events can work perfectly with (and rely on) RxJs observables.
     * In case angular's implementation changes, or a better solution comes up, this should be reevaluated.
     * 
     * @param {GoogleMapsComponentBase<EmittingWrapper>} emittingComponent The component/directive emitting the events. Should decorate `@Output()` members with `@Hook()`.
     * Hooked members will be assigned with a new observable, overwriting any existing value.
     * 
     * @param {EmittingWrapper} [wrapper=emittingComponent.wrapper] (Optional) The wrapper of the native object which defines the events. By default, events will be hooked to
     * the native object contained by `emittingComponent.wrapper`. Pass a value to this argument only if the emitting component is not the one containing the native object.
     * Example: Google Maps's data layer native object raises events that should be emitted by the individual feature directives.
     * @see `google-maps-feature.directive.ts` for more info.
     * 
     * @param {((event: GoogleMapsEventData) => boolean | Promise<boolean>)} [shouldEmit] (Optional) A filter function that will determine if the a specific event should be emitted or not.
     */
    public hookAndSetEmitters(emittingComponent: GoogleMapsComponentBase<EmittingWrapper>, wrapper: EmittingWrapper = null, shouldEmit?: (event: GoogleMapsEventData) => boolean | Promise<boolean>)
    {
        const eventsMap = (Reflect.getMetadata(HookOutputSymbol, emittingComponent) || []) as GoogleMapsEventsMap;

        wrapper = wrapper || emittingComponent.wrapper;

        for (const event of eventsMap)
        {
            // Set the observable to the event emitter property
            emittingComponent[camelCase(event.name)] = this.createEventEmitter(wrapper, event.name, event.reference, emittingComponent.wrapper, shouldEmit);;
        }
    }

    /**
     * Creates an observable hooked to a native event of a wrapper object and automatically transforms its event data.
     * Subscribe and unsubscribe are both hooked.
     * 
     * @param {EmittingWrapper} wrapper The wrapper for which the event should be hooked.
     * @param {string} eventName The library's (camelCase) name for the event.
     * @param {string} eventReference The native name of the event.
     * @param {EmittingWrapper} associatedWrapper (Optional) The wrapper of the native object which defines the events. By default, events will be hooked to
     * the native object contained by `wrapper`. Pass a value to this argument only if the emitting wrapper is not the one containing the native object.
     * Example: Google Maps's data layer native object raises events that should be emitted by the individual feature directives.
     * @see `google-maps-feature.directive.ts` for more info.
     * @param {((event: GoogleMapsEventData) => boolean | Promise<boolean>)} [shouldEmit] (Optional) A filter function that will determine if the a specific event should be emitted or not.
     * @returns {Observable<GoogleMapsEventData>} An observable hooked to the native event of the wrapper.
     */
    public createEventEmitter(wrapper: EmittingWrapper, eventName: string, eventReference: string, associatedWrapper: EmittingWrapper = wrapper, shouldEmit?: (event: GoogleMapsEventData) => boolean | Promise<boolean>): Observable<GoogleMapsEventData>
    {
        let emitter = fromEventPattern(
            // Hook native event to observable subscribe
            (handler)                      => wrapper.listenTo(eventReference, handler),
            // Hook unregister function to observable unsubscribe
            (_, stopListening: () => void) => stopListening(),
            // Map, simplify and storng-type event args
            (...nativeArgs: any)           => new GoogleMapsEventData(eventName, wrapper, this.api.eventsData.auto(nativeArgs), nativeArgs, associatedWrapper)
        );
        
        // If a filtering function was provided, pipe it in
        if (shouldEmit) emitter = emitter.pipe(
            // Determine if the event should be emitted. Wrapped in a Promise.resolve() call to avoid detecting the return type of the filter function
            switchMap(event => Promise.resolve(shouldEmit(event)), (event, emit) => ({ event, emit })),
            // Filter by the boolean result of the shouldEmit function
            filter(data => data.emit),
            // Get and pass along only the event object
            pluck('event')
        );

        return emitter;
    }

    /**
     * Goes through all changes presented by an `ngOnChanges()` call and, if wrapper has a matching setter method, delegates them to the setter on the wrapper.
     * Expects wrapper setter methods name to conform to the format of `setProperty` (`set` prefix, followed by a CamelCase component property name).
     * 
     * @param {SimpleChanges} changes The changes object as received from the call to `ngOnChanges()`
     * @param {Wrapper} wrapper The wrapper to delegate changes to.
     */
    public delegateInputChangesToNativeObject(changes: SimpleChanges, wrapper: Wrapper)
    {
        for (const propertyName in changes)
        {
            const setterName = `set${camelCase(propertyName, true)}`;

            // If the wrapper has a setter for the property name, this will set the new values of @Input() values to the native object's properties
            if (setterName in wrapper)
                wrapper[setterName](changes[propertyName].currentValue);
        }
    }
}
