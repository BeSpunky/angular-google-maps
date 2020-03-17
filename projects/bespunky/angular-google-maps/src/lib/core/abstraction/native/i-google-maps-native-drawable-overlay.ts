import { IGoogleMapsNativeObject } from './i-google-maps-native-object';

// For typing of objects like google.maps.Marker/Polygon/Map etc.
export interface IGoogleMapsNativeDrawableOverlay extends IGoogleMapsNativeObject
{
    setMap(map: google.maps.Map): void;
}
