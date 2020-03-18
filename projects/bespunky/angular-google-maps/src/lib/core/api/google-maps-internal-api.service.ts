import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Injectable, NgZone, EventEmitter, SimpleChanges, Inject } from '@angular/core';
import { promiseLater } from '@bespunky/angular-zen';

import { GoogleMapsApiLoader } from '../loaders/google-maps-api-loader';
import { GoogleMapsConfig } from '../config/google-maps-config';
import { GoogleMapsApiService } from './google-maps-api.service';
import { GoogleMapsEventsMap } from '../types/google-maps-events-map.type';
import { IGoogleMapsNativeObjectWrapper } from '../abstraction/base/i-google-maps-native-object-wrapper';
import { GoogleMapsApiReadyPromise } from './google-maps-api-ready.token';
import { GoogleMapsEventData } from '../abstraction/events/google-maps-event-data';
import { GoogleMapsLifecycleBase } from '../abstraction/base/google-maps-lifecycle-base';
import { EventDataTransformService } from '../../utils/transform/event-data-transform.service';


@Injectable({
    providedIn: 'root'
})
export class GoogleMapsInternalApiService
{
    public waitForApi: { promise: Promise<void>, resolve: () => void, reject: () => any };

    constructor(public config: GoogleMapsConfig,
                public openApi: GoogleMapsApiService,
                private loader: GoogleMapsApiLoader,
                private eventTransform: EventDataTransformService,
                private zone: NgZone,
                @Inject(GoogleMapsApiReadyPromise)
                waitForApiReadyPromise: BehaviorSubject<Promise<void>>)
    {
        this.waitForApi = promiseLater();

        // Write the created promise to the token so it can be fetched by other services
        waitForApiReadyPromise.next(this.waitForApi.promise);
    }

    load(): Promise<void>
    {
        return this.zone.runOutsideAngular(() =>
        {
            this.loader.load()
                .then(this.waitForApi.resolve)
                .catch(this.waitForApi.reject);

            return this.waitForApi.promise;
        });
    }

    /**
     * Registers event handlers for the specified events on the native object and hooks them to the emitters on the emitting component.
     * Event arguments are automatically transformed using the `EventDataTransformService`.
     * If the native object is different to the one contained in the emitting component, you can pass it in using the `nativeWrapper` argument.
     *
     * @param {GoogleMapsLifecycleBase} emittingComponent The component/directive emitting the events using Angular `EventEmitter`s.
     * @param {GoogleMapsEventsMap} eventsMap The map of native events supported by the native object to unregister from.
     * @param {IGoogleMapsNativeObjectWrapper} [nativeWrapper=emittingComponent.nativeWrapper] (Optional) The wrapper of the native object that defines the events. Default is `emittingComponent.nativeWrapper`.
     * Pass a value to this argument only if the emitting component is not the one containing the native object.
     * Example: Data layer native object raises events that should be emitted by the individual feature directives.
     * 
     * @see `google-maps-feature.directive.ts` for more info.
     */
    public hookEmitters(emittingComponent: GoogleMapsLifecycleBase, eventsMap: GoogleMapsEventsMap, nativeWrapper: IGoogleMapsNativeObjectWrapper = emittingComponent.nativeWrapper)
    {
        const transfrom = this.eventTransform;
        
        for (const event of eventsMap)
        {
            const emitter: EventEmitter<any> = emittingComponent[_.camelCase(event.name)];

            // Avoid failures and optimize by skipping registration if no emitter object was
            // instantiated in the component or no event binding was done by the user (i.e. template)
            if (!emitter || emitter.observers.length === 0) continue;

            // Hook the emitter to the listener and emit everytime the event is fired.
            // tslint:disable-next-line:only-arrow-functions
            nativeWrapper.listenTo(event.reference, function()
            {
                const args = transfrom.auto([...arguments]);

                const eventData = new GoogleMapsEventData(event.name, nativeWrapper, args, arguments);

                emitter.emit(eventData);
            });
        }
    }

    /**
     * Unregisters event listeners from the native object. The component's `nativeWrapper` property will be used.
     * Use this overload if `hookEmitters()` was used on a component holding the actual native object.
     * Example: Markers, Polygons, Polylines, etc.
     *
     * @param {GoogleMapsLifecycleBase} emittingComponent The component/directive for which event handlers were previously registered and hooked to its emitters.
     * @param {GoogleMapsEventsMap} eventMap The map of native events supported by the native object to unregister from.
     */
    public unhookEmitters(emittingComponent: GoogleMapsLifecycleBase, eventMap: GoogleMapsEventsMap): void;
    /**
     * Unregisters event listeners from the native object.
     * Use this overload if `hookEmitters()` was called for a native wrapper which was different to `emittingComponent.nativeWrapper`.
     * Example: The native google.maps.Data object defines events, but they are delegated to the features.
     * 
     * @see `google-maps-feature.directive.ts` for more info.
     *
     * @param {GoogleMapsLifecycleBase} nativeWrapper The native wrapper for which event handlers were previously registered and hooked to another component.
     * @param {GoogleMapsEventsMap} eventMap The map of native events supported by the native object to unregister from.
     */
    public unhookEmitters(nativeWrapper: IGoogleMapsNativeObjectWrapper, eventMap: GoogleMapsEventsMap): void;
    public unhookEmitters(emittingComponentOrNativeWrapper: GoogleMapsLifecycleBase | IGoogleMapsNativeObjectWrapper, eventsMap: GoogleMapsEventsMap)
    {
        const nativeWrapper = emittingComponentOrNativeWrapper instanceof GoogleMapsLifecycleBase ? emittingComponentOrNativeWrapper.nativeWrapper : emittingComponentOrNativeWrapper;

        for (const event of eventsMap)
            nativeWrapper.stopListeningTo(event.reference);
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
