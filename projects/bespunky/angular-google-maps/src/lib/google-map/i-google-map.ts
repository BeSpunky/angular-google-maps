import { IGoogleMapsNativeObjectEmittingWrapper } from '../core/abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsMarker } from '../overlays/marker/i-google-maps-marker';

export interface IGoogleMap extends IGoogleMapsNativeObjectEmittingWrapper
{
    createMarker(options?: google.maps.ReadonlyMarkerOptions): Promise<IGoogleMapsMarker>;
}
