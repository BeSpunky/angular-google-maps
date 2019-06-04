import { Injectable } from '@angular/core';
import { WindowRef } from '@bespunky/angular-zen';

import { GoogleMapsApiLoader } from './google-maps-api-loader';

@Injectable({
    providedIn: 'root'
})
export class NoOpGoogleMapsApiLoader extends GoogleMapsApiLoader
{
    constructor(private windowRef: WindowRef) { super(); }

    public load(): Promise<any>
    {
        const window = this.windowRef.nativeWindow;

        if (window.google && window.google.maps) return Promise.resolve();

        throw new Error('[NoOpGoogleMapsApiLoader] Google Maps API is not found on `window.google.maps`. Either load it yourself before `GoogleMapsModule` is loaded or use the default `LazyGoogleMapsApiLoader` provider for `GoogleMapsApiLoader`.');
    }
}
