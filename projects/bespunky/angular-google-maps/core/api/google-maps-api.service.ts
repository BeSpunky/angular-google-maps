import { BehaviorSubject            } from 'rxjs';
import { takeWhile                  } from 'rxjs/operators';
import { Injectable, NgZone, Inject } from '@angular/core';

import { GoogleMapsApiReadyPromise } from '@bespunky/angular-google-maps/_internal';
import { EventDataTransformService } from './transform/event-data-transform.service';
import { GeometryTransformService  } from './transform/geometry-transform.service';

/**
 * Provides tools for low-level framework actions and access to other injectable services.
 */
@Injectable({
    providedIn: 'root'
})
export class GoogleMapsApiService
{
    private mapsApiReady: Promise<void>;

    /**
     * Creates an instance of GoogleMapsApiService.
     
     * @param {EventDataTransformService} eventsData Facilitating tools for working with event data objects. Can also be injected directly into any component/service.
     * @param {GeometryTransformService} geometry Facilitating tools for working with and converting geometry objects. Can also be injected directly into any component/service.
     */
    constructor(
        private zone      : NgZone,
        public  eventsData: EventDataTransformService,
        public  geometry  : GeometryTransformService,
        @Inject(GoogleMapsApiReadyPromise) private apiReadyPromise: BehaviorSubject<Promise<void>>)
    {
        // Fetch the promise created by the internal api and store it
        this.apiReadyPromise.pipe(takeWhile(promise => !promise, true)).subscribe(promise => this.mapsApiReady = promise);
    }

    /**
     * A promise which resolves when Google Maps API has loaded and is ready for use.
     * This is mostly designed for internal works. See the `*bsSafe` directive on how to ensure that map components load when api is ready.
     * 
     * @readonly
     * @type {Promise<void>}
     */
    public get whenReady(): Promise<void>
    {
        return this.mapsApiReady;
    }

    /**
     * Runs the specified function outside angular's zone to avoid unnecessary change detection runs.
     *
     * @template TResult The type of result the function returns.
     * @param {() => TResult} fn The function to run outside angular.
     * @returns {TResult} The result which is returned by the function after running outside angular.
     */
    public runOutsideAngular<TResult>(fn: () => TResult): TResult
    {
        return this.zone.runOutsideAngular(fn);
    }

    /**
     * Brings the execution of the specified function into angular's zone, allowing change detection runs.
     *
     * @template TResult The type of result the function returns.
     * @param {() => TResult} fn The function to run inside angular.
     * @returns {TResult} The result which is returned by the function after running inside angular.
     */
    public runInsideAngular<TResult>(fn: () => TResult): TResult
    {
        return this.zone.run(fn);
    }
    
    /**
     * Waits for Google Maps API to load, then runs the specified function outside angular's zone to avoid unnecessary change detection runs.
     *
     * @template TResult The type of result the function returns.
     * @param {() => TResult} fn The function to run outside angular.
     * @returns {TResult} The result which is returned by the function after running outside angular.
     */
    public runOutsideAngularWhenReady<TResult>(fn: () => TResult): Promise<TResult>
    {
        return this.zone.runOutsideAngular(() => this.whenReady.then(fn));
    }

    /**
     * Waits for Google Maps API to load, brings the execution of the specified function into angular's zone, allowing change detection runs.
     *
     * @template TResult The type of result the function returns.
     * @param {() => TResult} fn The function to run inside angular.
     * @returns {TResult} The result which is returned by the function after running inside angular.
     */
    public runInsideAngularWhenReady<TResult>(fn: () => TResult): Promise<TResult>
    {
        return this.zone.run(() => this.whenReady.then(fn));
    }
}
