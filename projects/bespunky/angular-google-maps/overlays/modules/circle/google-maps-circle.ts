import { NativeObjectWrapper, OutsideAngular, GoogleMapsApiService, IGoogleMap, Delegation, BoundsLike } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay                   } from '../../abstraction/base/google-maps-drawable-overlay';
import { OverlayType                                 } from '../../abstraction/base/overlay-type.enum';
import { IGoogleMapsCircle, WrappedCircleFunctions   } from './i-google-maps-circle';

/** Extends intellisense for `GoogleMapsCircle` with native circle functions. */
export interface GoogleMapsCircle extends WrappedCircleFunctions { }

/**
 * The angular-ready wrapper for the native `google.maps.Circle` class.
 *
 * @export
 * @class GoogleMapsCircle
 * @extends {GoogleMapsDrawableOverlay<google.maps.Circle>}
 * @implements {IGoogleMapsCircle}
 */
// @dynamic
@NativeObjectWrapper<GoogleMapsCircle>({
    getMap: Delegation.Exclude,
    setMap: Delegation.Exclude
})
export class GoogleMapsCircle extends GoogleMapsDrawableOverlay<google.maps.Circle> implements IGoogleMapsCircle
{
    constructor(api: GoogleMapsApiService, map: IGoogleMap, ...nativeArgs: any[])
    {
        super(api, map, OverlayType.Circle, ...nativeArgs);
    }
    
    protected createNativeObject(options?: google.maps.CircleOptions): google.maps.Circle
    {
        return new google.maps.Circle(options);
    }
    
    public getCenter(): google.maps.LatLngLiteral
    {
        return this.api.geometry.toLiteralCoord(this.native.getCenter());
    }
    
    @OutsideAngular
    public setCenter(element: BoundsLike): void
    {
        this.native.setCenter(this.api.geometry.centerOf(element));
    }

    setClickable     (clickable: boolean)                        : void { this.setOptions({ clickable }); }
    setFillColor     (fillColor: string)                         : void { this.setOptions({ fillColor }); }
    setFillOpacity   (fillOpacity: number)                       : void { this.setOptions({ fillOpacity }); }
    setStrokeColor   (strokeColor: string)                       : void { this.setOptions({ strokeColor }); }
    setStrokeOpacity (strokeOpacity: number)                     : void { this.setOptions({ strokeOpacity }); }
    setStrokePosition(strokePosition: google.maps.StrokePosition): void { this.setOptions({ strokePosition }); }
    setStrokeWeight  (strokeWeight: number)                      : void { this.setOptions({ strokeWeight }); }
    setZIndex        (zIndex: number)                            : void { this.setOptions({ zIndex }); }
}
