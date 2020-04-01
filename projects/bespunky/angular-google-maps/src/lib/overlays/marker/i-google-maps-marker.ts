import { IGoogleMapsDrawableOverlay } from '../../core/abstraction/base/i-google-maps-drawable-overlay';

export interface IGoogleMapsMarker extends IGoogleMapsDrawableOverlay<google.maps.Marker>
{
    getPosition(): google.maps.LatLng;
    setPosition(position: google.maps.LatLng | google.maps.LatLngLiteral): void;
}
