import { BoundsLike, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay } from '../../abstraction/base/i-google-maps-drawable-overlay';

/** A type for the native functions of a circle which should be wrapped. Used along with the extension interface for the wrapper.  */
export type WrappedCircleFunctions = WrappedNativeFunctions<google.maps.Circle, 'getCenter' | 'setCenter' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

/**
 * Represents the functionality that a circle wrapper should provide.
 *
 * @export
 * @interface IGoogleMapsCircle
 * @extends {IGoogleMapsDrawableOverlay<google.maps.Circle>}
 * @extends {WrappedCircleFunctions}
 */
export interface IGoogleMapsCircle extends IGoogleMapsDrawableOverlay<google.maps.Circle>, WrappedCircleFunctions
{
    getCenter(): google.maps.LatLngLiteral;
    setCenter(element: BoundsLike): void;

    // Options delegators
    setClickable     (clickable: boolean)                  : void;
    setFillColor     (color: string)                       : void;
    setFillOpacity   (opacity: number)                     : void;
    setStrokeColor   (color: string)                       : void;
    setStrokeOpacity (opacity: number)                     : void;
    setStrokePosition(position: google.maps.StrokePosition): void;
    setStrokeWeight  (weight: number)                      : void;
    setZIndex        (zIndex: number)                      : void;
}
