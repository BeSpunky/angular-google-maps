
import { GoogleMapsApiService, NativeObjectWrapper, IGoogleMap, OutsideAngular, Coord, WrappedNativeFunctions, Delegation } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay } from '../../abstraction/base/google-maps-drawable-overlay';
import { OverlayType               } from '../../abstraction/base/overlay-type.enum';
import { IGoogleMapsMarker         } from './i-google-maps-marker';

export type WrappedMarkerFunctions = WrappedNativeFunctions<google.maps.Marker, 'getPosition' | 'setPosition' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

export interface GoogleMapsMarker extends WrappedMarkerFunctions { }

// @dynamic
@NativeObjectWrapper<google.maps.Marker, GoogleMapsMarker>({
    getMap     : Delegation.Exclude,
    setMap     : Delegation.Exclude
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