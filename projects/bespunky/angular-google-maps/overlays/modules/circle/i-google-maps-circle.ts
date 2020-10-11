import { BoundsLike, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay } from '../../abstraction/base/i-google-maps-drawable-overlay';

export type WrappedCircleFunctions = WrappedNativeFunctions<google.maps.Circle, 'getCenter' | 'setCenter' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

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
