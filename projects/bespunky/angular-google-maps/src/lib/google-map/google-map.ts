import { ElementRef } from '@angular/core';

import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { Defaults } from '../core/config/defaults';
import { ZoomLevel } from './types/zoom-level.enum';
import { GoogleMapsMarker } from './overlays/marker/google-maps-marker';
import { GoogleMapsNativeObjectWrapper } from '../core/abstraction/angular/google-maps-native-object-wrapper';
import { IGoogleMap } from './i-google-map';

export class GoogleMap extends GoogleMapsNativeObjectWrapper implements IGoogleMap
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

    public async getCenter(): Promise<google.maps.LatLng>
    {
        await this.whenReady;

        return this.map.getCenter();
    }

    public setCenter(lngLat: google.maps.LatLng | google.maps.LatLngLiteral)
    {
        this.api.runOutsideAngular(() => this.map.setCenter(lngLat));
    }

    public async getZoom(): Promise<number>
    {
        await this.whenReady;

        return this.map.getZoom();
    }

    public setZoom(zoomLevel: ZoomLevel | number)
    {
        this.api.runOutsideAngular(() => this.map.setZoom(zoomLevel));
    }

    public createMarker(options?: google.maps.ReadonlyMarkerOptions): Promise<GoogleMapsMarker>
    {
        // Marker creation will cause rendering. Run outside...
        return this.api.runOutsideAngular(() => new GoogleMapsMarker(this, this.api, options));
    }
}
