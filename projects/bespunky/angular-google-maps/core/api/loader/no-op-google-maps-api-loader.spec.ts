import { async     } from '@angular/core/testing';
import { WindowRef } from '@bespunky/angular-zen';

import { NoOpGoogleMapsApiLoader } from '@bespunky/angular-google-maps/core';

describe('NoOpGoogleMapsApiLoader', () =>
{
    let windowRef: WindowRef;
    let loader   : NoOpGoogleMapsApiLoader;

    beforeEach(() =>
    {
        windowRef = new WindowRef({});

        loader    = new NoOpGoogleMapsApiLoader(windowRef);
    });

    it('should create an instance', () => expect(loader).toBeTruthy());

    it('should resolve if google maps api is already present in `window`', () =>
    {
        windowRef.nativeWindow.google = { maps: {} };

        const promise = loader.load();

        expect(promise instanceof Promise).toBeTruthy();

        promise.then(() => expect(true).toBeTruthy());
    });

    it('should reject if google maps api is not present in `window`', async(() =>
    {
        loader.load().catch(error => expect(error).toMatch(/Google Maps API is not found/));
    }));
});
