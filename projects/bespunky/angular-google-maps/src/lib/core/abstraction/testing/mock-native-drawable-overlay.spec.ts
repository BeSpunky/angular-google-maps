import { MockNative } from './mock-native.spec';

export class MockNativeDrawableOverlay extends MockNative
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