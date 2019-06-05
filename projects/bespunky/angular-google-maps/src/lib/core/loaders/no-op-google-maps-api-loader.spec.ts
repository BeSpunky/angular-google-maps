import { NoOpGoogleMapsApiLoader } from './no-op-google-maps-api-loader';
import { WindowRef } from '@bespunky/angular-zen';

describe('NoOpGoogleMapsApiLoader', () =>
{
    let windowRef: WindowRef;

    beforeEach(() =>
    {
        windowRef = {
            nativeWindow: {}
        };
    });

    it('should create an instance', () =>
    {
        expect(new NoOpGoogleMapsApiLoader(windowRef)).toBeTruthy();
    });
});
