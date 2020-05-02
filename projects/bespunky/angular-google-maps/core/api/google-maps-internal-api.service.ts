import { upperFirst, camelCase } from 'lodash';
import { BehaviorSubject, fromEventPattern } from 'rxjs';
import { filter, switchMap, pluck } from 'rxjs/operators';
import { Injectable, NgZone, SimpleChanges, Inject } from '@angular/core';
import { promiseLater } from '@bespunky/angular-zen';

import { GoogleMapsApiLoader } from './loader/google-maps-api-loader';
import { GoogleMapsApiReadyPromise } from './loader/google-maps-api-ready.token';
import { GoogleMapsApiService } from './google-maps-api.service';
import { GoogleMapsEventsMap } from '../abstraction/types/events-map.type';
import { GoogleMapsEventData } from '../abstraction/events/google-maps-event-data';
import { GoogleMapsLifecycleBase } from '../abstraction/base/google-maps-lifecycle-base';
import { HookOutputSymbol } from '../decorators/hook.decorator';
import { EmittingWrapper, Wrapper } from '../abstraction/types/abstraction';
    
@Injectable({
    providedIn: 'root'
})
export class GoogleMapsInternalApiService
{
    private waitForApi: { promise: Promise<void>, resolve: () => void, reject: () => any };

    constructor(
        public  openApi: GoogleMapsApiService,
        private loader : GoogleMapsApiLoader,
        private zone   : NgZone,
        @Inject(GoogleMapsApiReadyPromise) apiReadyPromise: BehaviorSubject<Promise<void>>)
    {
        this.waitForApi = promiseLater();

        // Write the created promise to the token so it can be fetched by other services
        apiReadyPromise.next(this.waitForApi.promise);
    }

    public get whenReady(): Promise<void>
    {
        return this.waitForApi.promise;
    }

    public load(): Promise<any>
    {
        return this.zone.runOutsideAngular(() => this.loader.load ()
                                                            .then (this.waitForApi.resolve)
                                                            .catch(this.waitForApi.reject));
    }

    /**
     * Creates and assignes observables for component outputs decorated with the `@Hook()`. Any existing values will be overwritten.
     * The generated observables are automatically hooked to events of the native object represented by the given wrapper.
     * This method should be called in the component's constructor. This way, when angular attempts to bind template events it
     * will pick up the generated observables.
     *
     * Event arguments are automatically transformed using the `EventDataTransformService`.
     * In case a component needs to hook to events of a native wrapped by an object external to the emitting component,
     * you can pass the it in using the `wrapper` argument.
     * 
     * Note: [02-04-2020 Shy Agam] The whole idea of this method is to generate the observables itself and assign it to the `@Output()` members
     * so angular could subscribe and unsubscribe automatically without the need for handling `OnInit` and `OnDestroy`.
     * Currently, angular uses `EventEmitter` objects as standard. However, going the angular way requires a mechamism that will trigger the
     * `emit()` method of the emitter. Wrapping it in a class that manages an observable and hooks the `emit()` method? Merging somehow the observable with
     * with the emitter stream? Too complex and seems unnecessary as events can work perfectly with (and rely on) RxJs observables.
     * In case angular's implementation changes, or a better solution comes up, this should be reevaluated.
     * 
     * @param {GoogleMapsLifecycleBase<EmittingWrapper>} emittingComponent The component/directive emitting the events. Should decorate `@Output()` members with `@Hook()`.
     * Hooked members will be assigned with a new observable, overwriting any existing value.
     * 
     * @param {EmittingWrapper} [wrapper=emittingComponent.wrapper] (Optional) The wrapper of the native object which defines the events. By default, events will be hooked to
     * the native object contained by `emittingComponent.wrapper`. Pass a value to this argument only if the emitting component is not the one containing the native object.
     * Example: Google Maps's data layer native object raises events that should be emitted by the individual feature directives.
     * @see `google-maps-feature.directive.ts` for more info.
     * 
     * @param {((event: GoogleMapsEventData) => boolean | Promise<boolean>)} [shouldEmit] (Optional) A function that will determine if the a specific event should be emitted or not.
     */
    public hookAndSetEmitters(emittingComponent: GoogleMapsLifecycleBase<EmittingWrapper>, wrapper: EmittingWrapper = null, shouldEmit?: (event: GoogleMapsEventData) => boolean | Promise<boolean>)
    {
        const transfrom = this.openApi.eventsData;
        const eventsMap = (Reflect.getMetadata(HookOutputSymbol, emittingComponent) || []) as GoogleMapsEventsMap;

        wrapper = wrapper || emittingComponent.wrapper;

        for (const event of eventsMap)
        {
            let emitter = fromEventPattern(
                // Hook native event to observable subscribe
                (handler)                      => wrapper.listenTo(event.reference, handler),
                // Hook unregister function to observable unsubscribe
                (_, stopListening: () => void) => stopListening(),
                // Map, simplify and storng-type event args
                (...nativeArgs: any)           => new GoogleMapsEventData(event.name, wrapper, wrapper.native, transfrom.auto(nativeArgs), nativeArgs, emittingComponent.wrapper)
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
            emittingComponent[camelCase(event.name)] = emitter;
        }
    }

    // Expects `wrapper` to have setters for the properties which, in turn, call the approperiate native function in the native object
    public delegateInputChangesToNativeObject(changes: SimpleChanges, wrapper: Wrapper)
    {
        for (const propertyName in changes)
        {
            const setterName = `set${upperFirst(propertyName)}`;

            // If the wrapper has a setter for the property name, this will set the new values of @Input() values to the native object's properties
            if (setterName in wrapper)
                wrapper[setterName](changes[propertyName].currentValue);
        }
    }
}
