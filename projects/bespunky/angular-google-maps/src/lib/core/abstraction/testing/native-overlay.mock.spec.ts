import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';

export class MockNativeDrawableOverlay implements IGoogleMapsNativeDrawableOverlay
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
