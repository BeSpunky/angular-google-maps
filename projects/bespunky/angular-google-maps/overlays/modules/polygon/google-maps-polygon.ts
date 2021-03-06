import { CoordPath, NativeObjectWrapper, OutsideAngular, GoogleMapsApiService, IGoogleMap, Delegation } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay                   } from '../../abstraction/base/google-maps-drawable-overlay';
import { OverlayType                                 } from '../../abstraction/base/overlay-type.enum';
import { IGoogleMapsPolygon, WrappedPolygonFunctions } from './i-google-maps-polygon';

/** Extends intellisense for `GoogleMapsPolygon` with native polygon functions. */
export interface GoogleMapsPolygon extends WrappedPolygonFunctions { }

/**
 * The angular-ready wrapper for the native `google.maps.Polygon` class.
 *
 * @export
 * @class GoogleMapsPolygon
 * @extends {GoogleMapsDrawableOverlay<google.maps.Polygon>}
 * @implements {IGoogleMapsPolygon}
 */
// @dynamic
@NativeObjectWrapper<GoogleMapsPolygon>({
    getMap: Delegation.Exclude,
    setMap: Delegation.Exclude
})
export class GoogleMapsPolygon extends GoogleMapsDrawableOverlay<google.maps.Polygon> implements IGoogleMapsPolygon
{
    constructor(map: IGoogleMap, api: GoogleMapsApiService, native: google.maps.Polygon)
    {
        super(OverlayType.Polygon, map, api, native);
    }

    public getBounds(): google.maps.LatLngBounds
    {
        return this.api.geometry.definePathBounds(this.getPath());
    }

    public getPath(): google.maps.LatLngLiteral[][]
    {
        return this.api.geometry.toLiteralMultiPath(this.native.getPaths());
    }

    @OutsideAngular
    public setPath(coords: CoordPath): void
    {
        this.native.setPaths(this.api.geometry.toLiteralMultiPath(coords));
    }

    setClickable     (clickable: boolean)                        : void { this.setOptions({ clickable }); }
    setFillColor     (fillColor: string)                         : void { this.setOptions({ fillColor }); }
    setFillOpacity   (fillOpacity: number)                       : void { this.setOptions({ fillOpacity }); }
    setStrokeColor   (strokeColor: string)                       : void { this.setOptions({ strokeColor }); }
    setStrokeOpacity (strokeOpacity: number)                     : void { this.setOptions({ strokeOpacity }); }
    setStrokePosition(strokePosition: google.maps.StrokePosition): void { this.setOptions({ strokePosition }); }
    setStrokeWeight  (strokeWeight: number)                      : void { this.setOptions({ strokeWeight }); }
    setZIndex        (zIndex: number)                            : void { this.setOptions({ zIndex }); }
    setGeodesic      (geodesic: boolean)                         : void { this.setOptions({ geodesic }); }
}
