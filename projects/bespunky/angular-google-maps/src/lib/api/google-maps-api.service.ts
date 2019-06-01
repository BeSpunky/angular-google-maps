import { Injectable } from '@angular/core';

import { GoogleMapsApiLoader } from '../loaders/google-maps-api-loader';

@Injectable({
    providedIn: 'root'
})
export class GoogleMapsApiService
{
    private waitForApi: { promise: Promise<void>, resolve: () => void, reject: () => any };

    public isReady: boolean;

    constructor(private loader: GoogleMapsApiLoader)
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
        this.loader.load()
                   .then(this.waitForApi.resolve)
                   .catch(this.waitForApi.reject);

        return this.waitForApi.promise;
    }

    public get whenReady(): Promise<void>
    {
        return this.waitForApi.promise;
    }
}
