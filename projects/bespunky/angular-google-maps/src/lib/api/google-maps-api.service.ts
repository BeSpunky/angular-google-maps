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
        const apiPromise = new Promise<void>((resolve, reject) =>
        {
            this.waitForApi = {
                promise: apiPromise,
                resolve,
                reject
            };
        });

        this.isReady = false;
    }

    public load(): Promise<void>
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
