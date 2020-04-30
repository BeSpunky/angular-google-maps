import { IGoogleMapsNativeObject } from '../../../src/lib/core/abstraction/native/i-google-maps-native-object';

/** For typing of objects like `google.maps.Marker/Polygon/Map` etc. */
export interface IGoogleMapsNativeDrawableOverlay extends IGoogleMapsNativeObject
{
    getMap(): google.maps.Map | google.maps.StreetViewPanorama;
    setMap(map: google.maps.Map): void;
}
