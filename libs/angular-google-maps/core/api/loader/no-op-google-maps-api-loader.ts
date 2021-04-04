import { Injectable } from '@angular/core';
import { WindowRef  } from '@bespunky/angular-zen/core';

import { GoogleMapsApiLoader } from '@bespunky/angular-google-maps/_internal';

/**
 * Acts as an API loader but simply resolves or rejects loading immediately depending on the existance of
 * the `window.google.maps` namespace.
 *
 * @export
 * @class NoOpGoogleMapsApiLoader
 * @extends {GoogleMapsApiLoader}
 */
@Injectable({
    providedIn: 'root'
})
export class NoOpGoogleMapsApiLoader extends GoogleMapsApiLoader
{
    constructor(private windowRef: WindowRef) { super(); }

    /**
     * Checks whether `window.google.maps` has loaded already and resolves; rejects otherwise.
     *
     * @returns {Promise<any>}
     */
    public load(): Promise<any>
    {
        const window = this.windowRef.nativeWindow;

        if (window?.google?.maps) return Promise.resolve();

        return Promise.reject('[NoOpGoogleMapsApiLoader] Google Maps API is not found on `window.google.maps`. Either load it yourself before `GoogleMapsModule` is loaded or use the default `LazyGoogleMapsApiLoader` provider for `GoogleMapsApiLoader`.');
    }
}
