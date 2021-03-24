import { NativeObjectWrapper, OutsideAngular, GoogleMapsApiService, IGoogleMap, Delegation, Path } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay                     } from '../../abstraction/base/google-maps-drawable-overlay';
import { OverlayType                                   } from '../../abstraction/base/overlay-type.enum';
import { IGoogleMapsPolyline, WrappedPolylineFunctions } from './i-google-maps-polyline';

/** Extends intellisense for `GoogleMapsPolyline` with native polyline functions. */
export interface GoogleMapsPolyline extends WrappedPolylineFunctions { }

/**
 * The angular-ready wrapper for the native `google.maps.Polyline` class.
 *
 * @export
 * @class GoogleMapsPolyline
 * @extends {GoogleMapsDrawableOverlay<google.maps.Polyline>}
 * @implements {IGoogleMapsPolyline}
 */
// @dynamic
@NativeObjectWrapper<GoogleMapsPolyline>({
    getMap: Delegation.Exclude,
    setMap: Delegation.Exclude
})
export class GoogleMapsPolyline extends GoogleMapsDrawableOverlay<google.maps.Polyline> implements IGoogleMapsPolyline
{
    constructor(map: IGoogleMap, api: GoogleMapsApiService, native: google.maps.Polyline)
    {
        super(OverlayType.Polyline, map, api, native);
    }

    public getBounds(): google.maps.LatLngBounds
    {
        return this.api.geometry.definePathBounds(this.getPath());
    }

    public getPath(): google.maps.LatLngLiteral[]
    {
        return this.api.geometry.toLiteralMultiPath(this.native.getPath())[0];
    }

    @OutsideAngular
    public setPath(path: Path): void
    {
        this.native.setPath(this.api.geometry.toLiteralMultiPath(path)[0]);
    }

    setClickable     (clickable: boolean)                        : void { this.setOptions({ clickable }); }
    setStrokeColor   (strokeColor: string)                       : void { this.setOptions({ strokeColor }); }
    setStrokeOpacity (strokeOpacity: number)                     : void { this.setOptions({ strokeOpacity }); }
    setStrokeWeight  (strokeWeight: number)                      : void { this.setOptions({ strokeWeight }); }
    setZIndex        (zIndex: number)                            : void { this.setOptions({ zIndex }); }
    setGeodesic      (geodesic: boolean)                         : void { this.setOptions({ geodesic }); }
}
