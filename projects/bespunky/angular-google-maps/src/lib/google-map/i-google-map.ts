import { IGoogleMapsNativeObjectWrapper } from '../core/abstraction/angular/i-google-maps-native-object-wrapper';
import { GoogleMapMarker } from './overlays/marker/google-map-marker';
import { ZoomLevel } from './types/zoom-level.enum';

export interface IGoogleMap extends IGoogleMapsNativeObjectWrapper
{
    getCenter(): Promise<google.maps.LatLng>;
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): void;

    getZoom(): Promise<number>;
    setZoom(zoomLevel: ZoomLevel | number): void;

    createMarker(options?: google.maps.ReadonlyMarkerOptions): Promise<GoogleMapMarker>;
}
