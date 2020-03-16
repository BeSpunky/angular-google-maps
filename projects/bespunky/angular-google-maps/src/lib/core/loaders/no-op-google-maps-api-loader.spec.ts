import { NoOpGoogleMapsApiLoader } from './no-op-google-maps-api-loader';
import { WindowRef } from '@bespunky/angular-zen';

describe('NoOpGoogleMapsApiLoader', () =>
{
    let windowRef: WindowRef;
    let loader: NoOpGoogleMapsApiLoader;

    beforeEach(() =>
    {
        windowRef = new WindowRef({});

        loader = new NoOpGoogleMapsApiLoader(windowRef);
    });

    it('should create an instance', () =>
    {
        expect(loader).toBeTruthy();
    });

    it('should return a resolved promise if google maps api is already present in `window`', () =>
    {
        windowRef.nativeWindow.google = { maps: {} };

        const promise = loader.load();

        expect(promise instanceof Promise).toBeTruthy();

        promise.then(() => expect(true).toBeTruthy());
    });

    it('should throw an error if google maps api is not present in `window`', () =>
    {
        expect(() => loader.load()).toThrowError(/Google Maps API is not found/);
    });
});
