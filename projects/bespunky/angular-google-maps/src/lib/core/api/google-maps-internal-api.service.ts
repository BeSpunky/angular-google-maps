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

    public hookEmitters(emittingComponent: GoogleMapsLifecycleBase, eventsMap: GoogleMapsEventsMap)
    {
        for (const event of eventsMap)
        {
            const emitter: EventEmitter<any> = emittingComponent[_.camelCase(event.name)];

            // Avoid failures and optimize by skipping registration if no emitter object was
            // instantiated in the component or no event binding was done by the user (i.e. template)
            if (!emitter || emitter.observers.length === 0) continue;

            const nativeWrapper = emittingComponent.nativeWrapper;
            const transfrom = this.eventTransform;

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

    public unhookEmitters(emittingComponent: GoogleMapsLifecycleBase, eventsMap: GoogleMapsEventsMap)
    {
        for (const event of eventsMap)
            emittingComponent.nativeWrapper.stopListeningTo(event.reference);
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
