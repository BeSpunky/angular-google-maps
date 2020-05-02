import { MockNative                       } from '@bespunky/angular-google-maps/core/testing';
import { IGoogleMapsNativeDrawableOverlay } from '@bespunky/angular-google-maps/overlays';

export class MockNativeDrawableOverlay extends MockNative implements IGoogleMapsNativeDrawableOverlay
{
    public nativeMap: any;

    getMap(): google.maps.Map | google.maps.StreetViewPanorama
    {
        return this.nativeMap;
    }

    setMap(map: google.maps.Map): void
    {
        this.nativeMap = map;
    }
}