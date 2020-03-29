import { IGoogleMapsNativeObjectEmittingWrapper } from '../core/abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsMarker } from '../overlays/marker/i-google-maps-marker';
import { ZoomLevel } from './types/zoom-level.enum';
import { IGoogleMapsData } from '../overlays/data/i-google-maps-data';
import { IGoogleMapsDrawableOverlay } from '../core/abstraction/base/i-google-maps-drawable-overlay';

export interface IGoogleMap extends IGoogleMapsNativeObjectEmittingWrapper
{
    createMarker(position: google.maps.LatLng | google.maps.LatLngLiteral, options?: google.maps.ReadonlyMarkerOptions): Promise<IGoogleMapsMarker>;
    createDataLayer(options?: google.maps.Data.DataOptions): Promise<IGoogleMapsData>;
    removeOverlay(overlay: IGoogleMapsDrawableOverlay): Promise<void>;

    /* === Native wrappers === */

    getCenter(): Promise<google.maps.LatLng>;
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): Promise<void>;

    getZoom(): Promise<number>;
    setZoom(zoomLevel: ZoomLevel | number): Promise<void>;
}
