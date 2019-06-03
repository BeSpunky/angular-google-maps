import { ElementRef } from '@angular/core';

import { IGoogleMapsEventfullObject } from '../core/igoogle-maps-eventfull-object';
import { GoogleMapsApiService } from '../api/google-maps-api.service';
import { Defaults } from '../config/defaults';
import { ZoomLevel } from './types/zoom-level.enum';
import { MapEvent } from './types/map-event.enum';
import { GoogleMapMarker } from '../google-map-marker/google-map-marker';

export class GoogleMap implements IGoogleMapsEventfullObject
{
    private whenReady: Promise<void>;
    private map: google.maps.Map;

    constructor(private mapElement: ElementRef,
                private api: GoogleMapsApiService,
                initialCenter?: google.maps.LatLng | google.maps.LatLngLiteral,
                initialZoom?: ZoomLevel | number)
    {
        this.whenReady = this.api.whenReady;

        this.api.runOutsideAngular(() =>
        {
            this.map = new google.maps.Map(this.mapElement.nativeElement, {
                center: initialCenter || Defaults.Center,
                zoom:   initialZoom   || Defaults.ZoomLevel
            });
        });
    }

    public get nativeMap(): Promise<google.maps.Map>
    {
        return this.whenReady.then(() => this.map);
    }

    public listenTo(eventName: MapEvent | string, handler: () => void): Promise<google.maps.MapsEventListener>
    {
        return this.whenReady.then(() => this.map.addListener(eventName, handler));
    }

    public stopListeningTo(eventName: MapEvent | string)
    {
        google.maps.event.clearListeners(this.map, eventName);
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
        return this.api.runOutsideAngular(() =>
        {
            const marker = new GoogleMapMarker(this.api, options);

            marker.nativeMarker.setMap(this.map);

            return marker;
        });
    }
}
