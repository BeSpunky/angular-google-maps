import { Coord, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay    } from '../../abstraction/base/i-google-maps-drawable-overlay';

export type WrappedMarkerFunctions = WrappedNativeFunctions<google.maps.Marker, 'getPosition' | 'setPosition' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

export interface IGoogleMapsMarker extends IGoogleMapsDrawableOverlay<google.maps.Marker>, WrappedMarkerFunctions 
{
    getPosition(): google.maps.LatLngLiteral;
    setPosition(coord: Coord): void;
}
