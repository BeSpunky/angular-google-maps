
import { GoogleMapsApiService, NativeObjectWrapper, IGoogleMap, OutsideAngular, BoundsLike, Delegation } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay                 } from '../../abstraction/base/google-maps-drawable-overlay';
import { OverlayType                               } from '../../abstraction/base/overlay-type.enum';
import { IGoogleMapsMarker, WrappedMarkerFunctions } from './i-google-maps-marker';

/** Extends intellisense for `GoogleMapsMarker` with native marker functions. */
export interface GoogleMapsMarker extends WrappedMarkerFunctions { }

/**
 * The angular-ready wrapper for the native `google.maps.Marker` class.
 *
 * @export
 * @class GoogleMapsMarker
 * @extends {GoogleMapsDrawableOverlay<google.maps.Marker>}
 * @implements {IGoogleMapsMarker}
 */
// @dynamic
@NativeObjectWrapper<GoogleMapsMarker>({
    getMap: Delegation.Exclude,
    setMap: Delegation.Exclude
})
export class GoogleMapsMarker extends GoogleMapsDrawableOverlay<google.maps.Marker> implements IGoogleMapsMarker
{
    constructor(api: GoogleMapsApiService, public map: IGoogleMap, options?: google.maps.ReadonlyMarkerOptions)
    {
        super(api, map, OverlayType.Marker, options);
    }

    protected createNativeObject(options?: google.maps.ReadonlyMarkerOptions): google.maps.Marker
    {
        return new google.maps.Marker(options);
    }
    
    public getBounds(): google.maps.LatLngBounds
    {
        return this.api.geometry.defineCoordBounds(this.getPosition());
    }

    public getPosition(): google.maps.LatLngLiteral
    {
        return this.api.geometry.toLiteralCoord(this.native.getPosition());
    }
    
    @OutsideAngular
    public setPosition(position: BoundsLike): void
    {
        this.native.setPosition(this.api.geometry.centerOf(position));
    }
}