import * as _ from 'lodash';
import { Injectable, NgZone, EventEmitter } from '@angular/core';

import { GoogleMapsApiLoader } from '../loaders/google-maps-api-loader';
import { GoogleMapsConfig } from '../config/google-maps-config';
import { GoogleMapsEventsMap } from '../types/google-maps-events-map.type';
import { IGoogleMapsEventfullObject } from '../core/igoogle-maps-eventfull-object';

@Injectable({
    providedIn: 'root'
})
export class GoogleMapsApiService
{
    private waitForApi: { promise: Promise<void>, resolve: () => void, reject: () => any };

    public isReady: boolean;

    constructor(public config: GoogleMapsConfig, private loader: GoogleMapsApiLoader, private zone: NgZone)
    {
        this.isReady = false;

        this.waitForApi = { promise: null, resolve: null, reject: null };

        const apiPromise = new Promise<void>((resolve, reject) =>
        {
            this.waitForApi.resolve = resolve;
            this.waitForApi.reject = reject;
        });

        this.waitForApi.promise = apiPromise.then(() => { this.isReady = true; return; });
    }

    // TODO: Refactor and move to another non-exported service? so users won't be able to call the method.
    /** @internal */
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

    public get whenReady(): Promise<void>
    {
        return this.waitForApi.promise;
    }

    public runOutsideAngular(fn: () => any): any
    {
        return this.zone.runOutsideAngular(() =>
        {
            this.whenReady.then(fn);
        });
    }

    public hookEmitters(emittingComponent: any, eventsMap: GoogleMapsEventsMap, eventRaiser: IGoogleMapsEventfullObject)
    {
        for (const event of eventsMap)
        {
            const emitter: EventEmitter<any> = emittingComponent[_.camelCase(event.name)];

            if (!emitter) continue;

            // Hook the emitter to the listener and emit everytime the event is fired.
            // Note: Passing `emitter.emit` directly as a handler throws a strange error.
            //       Wrapping it in a functino that calls emit solved the problem.
            eventRaiser.listenTo(event.reference, () => emitter.emit());
        }
    }

    public unhookEmitters(eventsMap: GoogleMapsEventsMap, emittingObject: IGoogleMapsEventfullObject)
    {
        for (const event of eventsMap)
            emittingObject.stopListeningTo(event.reference);
    }
}
