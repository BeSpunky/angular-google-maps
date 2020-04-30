import { MockNative } from '../../../src/lib/core/abstraction/testing/mock-native.spec';
import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';

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