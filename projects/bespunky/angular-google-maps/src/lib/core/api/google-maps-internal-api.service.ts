import * as _ from 'lodash';
import { BehaviorSubject, fromEventPattern } from 'rxjs';
import { filter, switchMap, pluck } from 'rxjs/operators';
import { Injectable, NgZone, EventEmitter, SimpleChanges, Inject } from '@angular/core';
import { promiseLater } from '@bespunky/angular-zen';

import { GoogleMapsApiLoader } from '../loaders/google-maps-api-loader';
import { GoogleMapsConfig } from '../config/google-maps-config';
import { GoogleMapsApiService } from './google-maps-api.service';
import { GoogleMapsEventsMap } from '../abstraction/types/google-maps-events-map.type';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsNativeObjectWrapper } from '../abstraction/base/i-google-maps-native-object-wrapper';
import { GoogleMapsApiReadyPromise } from './google-maps-api-ready.token';
import { GoogleMapsEventData } from '../abstraction/events/google-maps-event-data';
import { GoogleMapsLifecycleBase } from '../abstraction/base/google-maps-lifecycle-base';
import { HookOutputSymbol } from '../decorators/hook.decorator';
    
@Injectable({
    providedIn: 'root'
})
export class GoogleMapsInternalApiService
{
    public waitForApi: { promise: Promise<void>, resolve: () => void, reject: () => any };

    constructor(public config: GoogleMapsConfig,
                public openApi: GoogleMapsApiService,
                private loader: GoogleMapsApiLoader,
                private zone: NgZone,
                @Inject(GoogleMapsApiReadyPromise)
                waitForApiReadyPromise: BehaviorSubject<Promise<void>>)
    {
        this.waitForApi = promiseLater();

        // Write the created promise to the token so it can be fetched by other services
        waitForApiReadyPromise.next(this.waitForApi.promise);
    }

    public load(): Promise<void>
    {
        return this.zone.runOutsideAngular(() =>
        {
            this.loader.load()
                       .then (this.waitForApi.resolve)
                       .catch(this.waitForApi.reject);

            return this.waitForApi.promise;
        });
    }

    /**
     * Registers event handlers for the specified events on the native object and hooks them to the emitters on the emitting component.
     * Event arguments are automatically transformed using the `EventDataTransformService`.
     * If the native object is different to the one contained in the emitting component, you can pass it in using the `wrapper` argument.
     *
     * @deprecated Use `hookAndSetEmitters()` instead.
     * 
     * @param {GoogleMapsLifecycleBase} emittingComponent The component/directive emitting the events using Angular `EventEmitter`s.
     * @param {GoogleMapsEventsMap} eventsMap The map of native events supported by the native object to unregister from.
     * @param {IGoogleMapsNativeObjectEmittingWrapper} [wrapper=emittingComponent.wrapper] (Optional) The wrapper of the native object that defines the events. Default is `emittingComponent.wrapper`.
     * Pass a value to this argument only if the emitting component is not the one containing the native object.
     * Example: Data layer native object raises events that should be emitted by the individual feature directives.
     * @see `google-maps-feature.directive.ts` for more info.
     * @param {(event: GoogleMapsEventData) => boolean} shouldEmit (Optional) A function that will determine if the a specific event should be emitted or not.
     */
    public hookEmitters(emittingComponent: GoogleMapsLifecycleBase<IGoogleMapsNativeObjectEmittingWrapper>, eventsMap: GoogleMapsEventsMap = [], wrapper: IGoogleMapsNativeObjectEmittingWrapper = emittingComponent.wrapper, shouldEmit?: (event: GoogleMapsEventData) => boolean | Promise<boolean>)
    {
        const transfrom = this.openApi.eventsData;
        
        for (const event of eventsMap)
        {
            const emitter: EventEmitter<any> = emittingComponent[_.camelCase(event.name)];

            // Avoid failures and optimize by skipping registration if no emitter object was
            // instantiated in the component or no event binding was done by the user (i.e. template)
            if (!emitter || emitter.observers.length === 0) continue;

            // Hook the emitter to the listener and emit everytime the event is fired.
            wrapper.listenTo(event.reference, function(...nativeArgs: any[])
            {
                const args = transfrom.auto(nativeArgs);
                const eventData = new GoogleMapsEventData(event.name, wrapper, this, args, nativeArgs, emittingComponent.wrapper);

                // If no filter function specified, or the filter function returned true, then emit. Wrapped in promise to simplify detection of return type.
                Promise.resolve(!shouldEmit || shouldEmit(eventData))
                       .then(emit => emit ? emitter.emit(eventData) : void 0);
            });
        }
    }

    public hookAndSetEmitters(emittingComponent: GoogleMapsLifecycleBase<IGoogleMapsNativeObjectEmittingWrapper>, wrapper: IGoogleMapsNativeObjectEmittingWrapper = emittingComponent.wrapper, shouldEmit?: (event: GoogleMapsEventData) => boolean | Promise<boolean>)
    {
        const transfrom = this.openApi.eventsData;
        const eventsMap = (Reflect.getMetadata(HookOutputSymbol, emittingComponent) || []) as GoogleMapsEventsMap;

        for (const event of eventsMap)
        {
            let emitter = fromEventPattern(
                // Hook native event to observable subscribe
                (handler) =>
                {
                    console.log(`listening to ${event.reference}`);
                    return wrapper.listenTo(event.reference, handler);
                },
                // Hook unregister function to observable unsubscribe
                (_, stopListening: () => void) => {
                    console.log(`unlistening to ${event.reference}`);
                    return stopListening();
                },
                // Map, simplify and storng-type event args
                (...nativeArgs: any)           => {
                    console.log(`mapping event data...`, nativeArgs);
                    return new GoogleMapsEventData(event.name, wrapper, this, transfrom.auto(nativeArgs), nativeArgs, emittingComponent.wrapper);
                }
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

            // Set the observable to the event emitter property
            emittingComponent[_.camelCase(event.name)] = emitter;
        }
    }

    /**
     * Unregisters event listeners from the native object.
     * 
     * @deprecated Use `hookAndSetEmitters()` instead of `hookEmitters()` to they will automatically unhook by angular.
     * 
     * @param {IGoogleMapsNativeObjectEmittingWrapper} wrapper The native wrapper for which event handlers were previously registered and hooked to another component.
     * @param {GoogleMapsEventsMap} eventMap The map of native events supported by the native object to unregister from.
     */
    public unhookEmitters(wrapper: IGoogleMapsNativeObjectEmittingWrapper, eventsMap: GoogleMapsEventsMap = []): void
    {
        for (const event of eventsMap)
            wrapper.stopListeningTo(event.reference);
    }

    // Expects `wrapper` to have setters for the properties which, in turn, call the approperiate native function in the native object
    public delegateInputChangesToNativeObject(changes: SimpleChanges, wrapper: IGoogleMapsNativeObjectWrapper)
    {
        for (const propertyName in changes)
        {
            if (!changes.hasOwnProperty(propertyName)) continue;

            const setterName = `set${_.upperFirst(propertyName)}`;

            // If the wrapper has a setter for the property name, this will set the new values of @Input() values to the native object's properties
            if (setterName in wrapper)
                wrapper[setterName](changes[propertyName].currentValue);
        }
    }
}
