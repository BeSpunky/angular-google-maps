
import { ElementRef } from '@angular/core';

import { GoogleMapsApiService, NativeObjectWrapper, IGoogleMap, OutsideAngular, Delegation, GoogleMapsComponentBase } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay, IGoogleMapsInfoWindow, OverlayType } from '@bespunky/angular-google-maps/overlays';
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
    public setPanel(element: ElementRef<any> | HTMLElement): void
    {
        this.native.setPanel(element instanceof ElementRef ? element.nativeElement : element);
    }
    
    public setDraggable             (draggable: boolean                                                                ): void { this.setOptions({draggable});}
    public setHideRouteList         (hideRouteList: boolean                                                            ): void { this.setOptions({hideRouteList});}
    public setInfoWindow            (infoWindow: GoogleMapsComponentBase<IGoogleMapsInfoWindow> | IGoogleMapsInfoWindow): void { this.setOptions({ infoWindow: (infoWindow instanceof GoogleMapsComponentBase ? infoWindow.wrapper : infoWindow).native }); }
    public setMarkerOptions         (markerOptions: google.maps.MarkerOptions                                          ): void { this.setOptions({markerOptions});}
    public setPolylineOptions       (polylineOptions: google.maps.PolylineOptions                                      ): void { this.setOptions({polylineOptions});}
    public setPreserveViewport      (preserveViewport: boolean                                                         ): void { this.setOptions({preserveViewport});}
    public setSuppressBicyclingLayer(suppressBicyclingLayer: boolean                                                   ): void { this.setOptions({suppressBicyclingLayer});}
    public setSuppressInfoWindows   (suppressInfoWindows: boolean                                                      ): void { this.setOptions({suppressInfoWindows});}
    public setSuppressMarkers       (suppressMarkers: boolean                                                          ): void { this.setOptions({suppressMarkers});}
    public setSuppressPolylines     (suppressPolylines: boolean                                                        ): void { this.setOptions({suppressPolylines});}
}
