import { IGoogleMapsNativeObjectEmittingWrapper } from '../core/abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsMarker } from '../overlays/marker/i-google-maps-marker';
import { ZoomLevel } from './types/zoom-level.enum';

export interface IGoogleMap extends IGoogleMapsNativeObjectEmittingWrapper
{
    createMarker(position: google.maps.LatLng | google.maps.LatLngLiteral, options?: google.maps.ReadonlyMarkerOptions): Promise<IGoogleMapsMarker>;

    getCenter(): Promise<google.maps.LatLng>;
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): Promise<void>;

    getZoom(): Promise<number>;
    setZoom(zoomLevel: ZoomLevel | number): Promise<void>;
}
