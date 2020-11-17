import { BehaviorSubject            } from 'rxjs';
import { Injectable, NgZone, Inject } from '@angular/core';
import { promiseLater               } from '@bespunky/angular-zen/async';

import { GoogleMapsApiLoader       } from './google-maps-api-loader';
import { GoogleMapsApiReadyPromise } from './google-maps-api-ready.token';

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

    public get whenReady(): Promise<void>
    {
        return this.waitForApi.promise;
    }

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
