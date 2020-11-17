import { Injectable } from '@angular/core';
import { WindowRef  } from '@bespunky/angular-zen/core';

import { GoogleMapsApiLoader } from '@bespunky/angular-google-maps/_internal';

@Injectable({
    providedIn: 'root'
})
export class NoOpGoogleMapsApiLoader extends GoogleMapsApiLoader
{
    constructor(private windowRef: WindowRef) { super(); }

    public load(): Promise<any>
    {
        const window = this.windowRef.nativeWindow;

        if (window?.google?.maps) return Promise.resolve();

        return Promise.reject('[NoOpGoogleMapsApiLoader] Google Maps API is not found on `window.google.maps`. Either load it yourself before `GoogleMapsModule` is loaded or use the default `LazyGoogleMapsApiLoader` provider for `GoogleMapsApiLoader`.');
    }
}
