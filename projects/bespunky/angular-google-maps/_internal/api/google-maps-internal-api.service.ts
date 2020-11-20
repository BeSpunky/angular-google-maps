import { BehaviorSubject            } from 'rxjs';
import { Injectable, NgZone, Inject } from '@angular/core';
import { promiseLater               } from '@bespunky/angular-zen/async';

import { GoogleMapsApiLoader       } from './google-maps-api-loader';
import { GoogleMapsApiReadyPromise } from './google-maps-api-ready.token';

/**
 * Takes care of initialization and the API ready notification.
 *
 * @internal
 * @export
 * @class GoogleMapsInternalApiService
 */
@Injectable({
    providedIn: 'root'
})
export class GoogleMapsInternalApiService
{
    private waitForApi: { promise: Promise<void>, resolve: () => void, reject: (error: any) => any };

    constructor(
        private zone  : NgZone,
        private loader: GoogleMapsApiLoader,
        @Inject(GoogleMapsApiReadyPromise) apiReadyPromise: BehaviorSubject<Promise<void>>)
    {
        this.waitForApi = promiseLater();

        // Write the created promise to the token so it can be fetched by other services
        apiReadyPromise.next(this.waitForApi.promise);
    }

    /**
     * A promise resolving when maps API has fully loaded.
     *
     * @readonly
     * @type {Promise<void>}
     */
    public get whenReady(): Promise<void>
    {
        return this.waitForApi.promise;
    }

    /**
     * Calls the provided loader to load maps API, then resolves or rejects the ready promise.
     *
     * @returns {Promise<any>}
     */
    public load(): Promise<any>
    {
        return this.zone.runOutsideAngular(() => this.loader.load ()
                                                            .then (this.waitForApi.resolve)
                                                            .catch(error =>
                                                            {
                                                                this.waitForApi.reject(error);
                                                                // Make sure the `load()` method rejects as well
                                                                return Promise.reject(error);
                                                            }));
    }
}
