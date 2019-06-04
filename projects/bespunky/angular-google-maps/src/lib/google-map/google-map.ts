import { ElementRef } from '@angular/core';

import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { Defaults } from '../core/config/defaults';
import { ZoomLevel } from './types/zoom-level.enum';
import { MapEvent } from './types/map-event.enum';
import { GoogleMapMarker } from './overlays/marker/google-map-marker';
import { GoogleMapsNativeObjectWrapper } from '../core/abstraction/angular/google-maps-native-object-wrapper';

export class GoogleMap extends GoogleMapsNativeObjectWrapper
{
    private whenReady: Promise<void>;
    private map: google.maps.Map;

    constructor(private mapElement: ElementRef,
                private api: GoogleMapsApiService,
                initialCenter?: google.maps.LatLng | google.maps.LatLngLiteral,
                initialZoom?: ZoomLevel | number)
    {
        super();

        this.whenReady = this.api.whenReady;

        this.api.runOutsideAngular(() =>
        {
            this.map = new google.maps.Map(this.mapElement.nativeElement, {
                center: initialCenter || Defaults.Center,
                zoom:   initialZoom   || Defaults.ZoomLevel
            });
        });
    }

    public get native(): Promise<google.maps.Map>
    {
        return this.whenReady.then(() => this.map);
    }

    /**
     * Overrides the `listenTo()` method of the base class in order to wait for the map before attempting to register.
     *
     * @param eventName The name of the event for which to register the handler.
     * @param handler   The function to call when the event is fired.
     */
    public listenTo(eventName: MapEvent | string, handler: () => void)
    {
        this.whenReady.then(() => this.map.addListener(eventName, handler));
    }

    public getCenter(): Promise<google.maps.LatLng>
    {
        return this.whenReady.then(this.map.getCenter);
    }

    public set center(lngLat: google.maps.LatLng | google.maps.LatLngLiteral)
    {
        this.api.runOutsideAngular(() => this.map.setCenter(lngLat));
    }

    public getZoom(): Promise<number>
    {
        return this.whenReady.then(this.map.getZoom);
    }

    public set zoom(zoomLevel: ZoomLevel | number)
    {
        this.api.runOutsideAngular(() => this.map.setZoom(zoomLevel));
    }

    public createMarker(options?: google.maps.ReadonlyMarkerOptions): Promise<GoogleMapMarker>
    {
        // Marker creation will cause rendering. Run outside...
        return this.api.runOutsideAngular(() => new GoogleMapMarker(this, options));
    }
}
