import { Path, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay } from '../../abstraction/base/i-google-maps-drawable-overlay';

/** A type for the native functions of an polyline which should be wrapped. Used along with the extension interface for the wrapper. */
export type WrappedPolylineFunctions = WrappedNativeFunctions<google.maps.Polyline, 'getPath' | 'setPath' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

/**
 * Represents the functionality that a polyline wrapper should provide.
 *
 * @export
 * @interface IGoogleMapsPolyline
 * @extends {IGoogleMapsDrawableOverlay<google.maps.Polyline>}
 * @extends {WrappedPolylineFunctions}
 */
export interface IGoogleMapsPolyline extends IGoogleMapsDrawableOverlay<google.maps.Polyline>, WrappedPolylineFunctions
{
    getPath(): google.maps.LatLngLiteral[];
    setPath(coords: Path): void;

    // Options delegators
    setClickable     (clickable: boolean)                  : void;
    setStrokeColor   (color: string)                       : void;
    setStrokeOpacity (opacity: number)                     : void;
    setStrokeWeight  (weight: number)                      : void;
    setZIndex        (zIndex: number)                      : void;
    setGeodesic      (geodesic: boolean)                   : void;
}
