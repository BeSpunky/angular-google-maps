import { Coord, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay    } from '../../abstraction/base/i-google-maps-drawable-overlay';

export type WrappedInfoWindowFunctions = WrappedNativeFunctions<google.maps.InfoWindow, 'getPosition' | 'setPosition' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

export interface IGoogleMapsInfoWindow extends IGoogleMapsDrawableOverlay<google.maps.InfoWindow>, WrappedInfoWindowFunctions 
{
    getPosition(): google.maps.LatLngLiteral;
    setPosition(coord: Coord): void;
}
