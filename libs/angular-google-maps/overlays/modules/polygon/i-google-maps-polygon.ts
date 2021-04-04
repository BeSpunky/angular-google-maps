import { CoordPath, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay } from '../../abstraction/base/i-google-maps-drawable-overlay';

/** A type for the native functions of an polygon which should be wrapped. Used along with the extension interface for the wrapper. */
export type WrappedPolygonFunctions = WrappedNativeFunctions<google.maps.Polygon, 'getPath' | 'setPath' | 'getPaths' | 'setPaths' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

/**
 * Represents the functionality that a polygon wrapper should provide.
 *
 * @export
 * @interface IGoogleMapsPolygon
 * @extends {IGoogleMapsDrawableOverlay<google.maps.Polygon>}
 * @extends {WrappedPolygonFunctions}
 */
export interface IGoogleMapsPolygon extends IGoogleMapsDrawableOverlay<google.maps.Polygon>, WrappedPolygonFunctions
{
    getPath(): google.maps.LatLngLiteral[][];
    setPath(coords: CoordPath): void;

    // Options delegators
    setClickable     (clickable: boolean)                  : void;
    setFillColor     (color: string)                       : void;
    setFillOpacity   (opacity: number)                     : void;
    setStrokeColor   (color: string)                       : void;
    setStrokeOpacity (opacity: number)                     : void;
    setStrokePosition(position: google.maps.StrokePosition): void;
    setStrokeWeight  (weight: number)                      : void;
    setZIndex        (zIndex: number)                      : void;
    setGeodesic      (geodesic: boolean)                   : void;
}
