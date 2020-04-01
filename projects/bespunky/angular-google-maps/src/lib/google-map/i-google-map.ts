import { IGoogleMapsNativeObjectEmittingWrapper } from '../core/abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsMarker } from '../overlays/marker/i-google-maps-marker';
import { ZoomLevel } from './types/zoom-level.enum';
import { IGoogleMapsData } from '../overlays/data/i-google-maps-data';
import { IGoogleMapsDrawableOverlay } from '../core/abstraction/base/i-google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../core/abstraction/native/i-google-maps-native-drawable-overlay';

export interface IGoogleMap extends IGoogleMapsNativeObjectEmittingWrapper<google.maps.Map>
{
    createMarker(position: google.maps.LatLng | google.maps.LatLngLiteral, options?: google.maps.ReadonlyMarkerOptions): IGoogleMapsMarker;
    createDataLayer(options?: google.maps.Data.DataOptions): IGoogleMapsData;
    removeOverlay<TOverlay extends IGoogleMapsDrawableOverlay<IGoogleMapsNativeDrawableOverlay>>(overlay: TOverlay): void;

    /* === Native wrappers === */

    getCenter(): google.maps.LatLng;
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): void;

    getZoom(): number;
    setZoom(zoomLevel: ZoomLevel | number): void;
}
