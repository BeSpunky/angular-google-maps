import { BehaviorSubject            } from 'rxjs';
import { Injectable, NgZone, Inject } from '@angular/core';
import { promiseLater               } from '@bespunky/angular-zen';

import { GoogleMapsApiService      } from './google-maps-api.service';
import { GoogleMapsApiLoader       } from './loader/google-maps-api-loader';
import { GoogleMapsApiReadyPromise } from './loader/google-maps-api-ready.token';

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
}
