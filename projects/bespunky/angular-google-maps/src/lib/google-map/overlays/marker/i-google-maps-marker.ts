import { IGoogleMapsDrawableOverlay } from '../../../core/abstraction/angular/overlays/i-google-maps-drawable-overlay';

export interface IGoogleMapsMarker extends IGoogleMapsDrawableOverlay
{
    getPosition(): Promise<google.maps.LatLng>;
    setPosition(position: google.maps.LatLng | google.maps.LatLngLiteral): void;
}
