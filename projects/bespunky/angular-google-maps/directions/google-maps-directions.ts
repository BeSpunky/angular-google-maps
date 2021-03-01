
import { ElementRef } from '@angular/core';

import { GoogleMapsApiService, NativeObjectWrapper, IGoogleMap, OutsideAngular, Delegation } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay, OverlayType } from '@bespunky/angular-google-maps/overlays';
import { IGoogleMapsDirections, WrappedDirectionsFunctions } from './i-google-maps-directions';

/** Extends intellisense for `GoogleMapsDirections` with native directions functions. */
export interface GoogleMapsDirections extends WrappedDirectionsFunctions { }

/**
 * The angular-ready wrapper for the native `google.maps.DirectionsRenderer` class.
 *
 * @export
 * @class GoogleMapsDirections
 * @extends {GoogleMapsDrawableOverlay<google.maps.DirectionsRenderer>}
 * @implements {IGoogleMapsDirections}
 */
// @dynamic
@NativeObjectWrapper<google.maps.DirectionsRenderer, GoogleMapsDirections>({
    getMap: Delegation.Exclude,
    setMap: Delegation.Exclude
})
export class GoogleMapsDirections extends GoogleMapsDrawableOverlay<google.maps.DirectionsRenderer> implements IGoogleMapsDirections
{
    constructor(api: GoogleMapsApiService, public map: IGoogleMap, options?: google.maps.DirectionsRendererOptions)
    {
        super(api, map, OverlayType.Directions, options);
    }
    
    protected createNativeObject(options?: google.maps.DirectionsRendererOptions): google.maps.DirectionsRenderer
    {
        return new google.maps.DirectionsRenderer(options);
    }
    
    public getBounds(): google.maps.LatLngBounds
    {
        return this.native.getDirections().routes.reduce((bounds, route) => bounds.union(route.bounds), new google.maps.LatLngBounds());
    }

    public getPanel(): ElementRef<any>
    {
        return new ElementRef(this.native.getPanel());
    }
    
    @OutsideAngular
    public setPanel({nativeElement}: ElementRef<any>): void
    {
        this.native.setPanel(nativeElement);
    }
}