import { IGoogleMapsEmittingNativeObject } from './i-google-maps-emitting-native-object';

// For typing of objects like google.maps.Marker/Polygon/Map etc.
export interface IGoogleMapsNativeDrawableOverlay extends IGoogleMapsEmittingNativeObject
{
    setMap(map: google.maps.Map): void;
}
