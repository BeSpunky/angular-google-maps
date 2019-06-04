import * as _ from 'lodash';
import { Injectable, NgZone, EventEmitter, SimpleChanges, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GoogleMapsApiLoader } from '../loaders/google-maps-api-loader';
import { GoogleMapsConfig } from '../config/google-maps-config';
import { GoogleMapsApiService } from './google-maps-api.service';
import { GoogleMapsEventsMap } from '../types/google-maps-events-map.type';
import { IGoogleMapsNativeObjectWrapper } from '../abstraction/native/i-google-maps-native-object-wrapper';
import { GoogleMapsApiReadyPromise } from './google-maps-api-ready.token';
import { GoogleMapsEventData } from '../abstraction/angular/events/google-maps-event-data';


@Injectable({
    providedIn: 'root'
})
export class GoogleMapsInternalApiService
{
    public waitForApi: { promise: Promise<void>, resolve: () => void, reject: () => any };

    public isReady: boolean;

    constructor(public config: GoogleMapsConfig,
                public openApi: GoogleMapsApiService,
                private loader: GoogleMapsApiLoader,
                private zone: NgZone,
                @Inject(GoogleMapsApiReadyPromise)
                waitForApiReadyPromise: BehaviorSubject<Promise<void>>)
    {
        this.isReady = false;

        this.waitForApi = { promise: null, resolve: null, reject: null };

        const apiPromise = new Promise<void>((resolve, reject) =>
        {
            this.waitForApi.resolve = resolve;
            this.waitForApi.reject = reject;
        });

        this.waitForApi.promise = apiPromise.then(() => { this.isReady = true; });

        // Write the created promise to the token so it can be fetched by other services
        waitForApiReadyPromise.next(apiPromise);
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

    public hookEmitters(emittingComponent: any, eventsMap: GoogleMapsEventsMap, nativeWrapper: IGoogleMapsNativeObjectWrapper)
    {
        for (const event of eventsMap)
        {
            const emitter: EventEmitter<any> = emittingComponent[_.camelCase(event.name)];

            // Avoid failures and optimize by skipping registration if no emitter object was
            // instantiated in the component or no event binding was done by the user (i.e. template)
            if (!emitter || emitter.observers.length === 0) continue;

            // Hook the emitter to the listener and emit everytime the event is fired.
            // Note: Passing `emitter.emit` directly as a handler throws a strange error.
            //       Wrapping it in a functino that calls emit solved the problem.
            // tslint:disable-next-line:only-arrow-functions
            nativeWrapper.listenTo(event.reference, function()
            {
                const eventData = new GoogleMapsEventData(event.name, emittingComponent, null, arguments);

                emitter.emit(eventData);
            });
        }
    }

    public unhookEmitters(eventsMap: GoogleMapsEventsMap, nativeWrapper: IGoogleMapsNativeObjectWrapper)
    {
        for (const event of eventsMap)
            nativeWrapper.stopListeningTo(event.reference);
    }

    // Expects `wrapper` to have setters for the properties which, in turn, call the approperiate native function in the native object
    public delegateInputChangesToNativeObject(changes: SimpleChanges, wrapper: IGoogleMapsNativeObjectWrapper)
    {
        for (const propertyName in changes)
        {
            // If the wrapper has a setter for the property name, this will set the new values of @Input() values to the native object's properties
            if (propertyName in wrapper)
                wrapper[propertyName] = changes[propertyName].currentValue;
        }
    }
}
