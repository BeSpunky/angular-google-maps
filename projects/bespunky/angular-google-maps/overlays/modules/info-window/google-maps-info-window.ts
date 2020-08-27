
import { GoogleMapsApiService, NativeObjectWrapper, IGoogleMap, OutsideAngular, Coord, Delegation } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay                 } from '../../abstraction/base/google-maps-drawable-overlay';
import { OverlayType                               } from '../../abstraction/base/overlay-type.enum';
import { IGoogleMapsInfoWindow, WrappedInfoWindowFunctions } from './i-google-maps-info-window';

export interface GoogleMapsInfoWindow extends WrappedInfoWindowFunctions { }

// @dynamic
@NativeObjectWrapper<google.maps.InfoWindow, GoogleMapsInfoWindow>({
    getMap: Delegation.Exclude,
    setMap: Delegation.Exclude
})
export class GoogleMapsInfoWindow extends GoogleMapsDrawableOverlay<google.maps.InfoWindow> implements IGoogleMapsInfoWindow
{
    constructor(api: GoogleMapsApiService, public map: IGoogleMap, options?: google.maps.ReadonlyInfoWindowOptions)
    {
        super(api, map, OverlayType.InfoWindow, options);
    }

    protected createNativeObject(options?: google.maps.ReadonlyInfoWindowOptions): google.maps.InfoWindow
    {
        return new google.maps.InfoWindow(options);
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
    public setPosition(position: Coord): void
    {
        this.native.setPosition(this.api.geometry.toLiteralCoord(position));
    }
}