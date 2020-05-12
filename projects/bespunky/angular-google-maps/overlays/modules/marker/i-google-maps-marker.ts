import { Coord                      } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay } from '../../abstraction/base/i-google-maps-drawable-overlay';

export interface IGoogleMapsMarker extends IGoogleMapsDrawableOverlay<google.maps.Marker>
{
    getPosition(): google.maps.LatLngLiteral;
    setPosition(coord: Coord): void;
}
