import { IGoogleMapsNativeObjectWrapper } from '../core/abstraction/base/i-google-maps-native-object-wrapper';
import { ZoomLevel } from './types/zoom-level.enum';
import { IGoogleMapsMarker } from '../overlays/marker/i-google-maps-marker';

export interface IGoogleMap extends IGoogleMapsNativeObjectWrapper
{
    getCenter(): Promise<google.maps.LatLng>;
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): void;

    getZoom(): Promise<number>;
    setZoom(zoomLevel: ZoomLevel | number): void;

    createMarker(options?: google.maps.ReadonlyMarkerOptions): Promise<IGoogleMapsMarker>;
}
