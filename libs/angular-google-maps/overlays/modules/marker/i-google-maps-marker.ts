import { BoundsLike, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay    } from '../../abstraction/base/i-google-maps-drawable-overlay';

/** A type for the native functions of a marker which should be wrapped. Used along with the extension interface for the wrapper.  */
export type WrappedMarkerFunctions = WrappedNativeFunctions<google.maps.Marker, 'getPosition' | 'setPosition' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

/**
 * Represents the functionality that a marker wrapper should provide.
 *
 * @export
 * @interface IGoogleMapsMarker
 * @extends {IGoogleMapsDrawableOverlay<google.maps.Marker>}
 * @extends {WrappedMarkerFunctions}
 */
export interface IGoogleMapsMarker extends IGoogleMapsDrawableOverlay<google.maps.Marker>, WrappedMarkerFunctions 
{
    getPosition(): google.maps.LatLngLiteral;
    setPosition(position: BoundsLike): void;
}
