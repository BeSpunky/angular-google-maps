import { ElementRef } from '@angular/core';

import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { Defaults } from '../core/config/defaults';
import { ZoomLevel } from './types/zoom-level.enum';
import { GoogleMapsMarker } from '../overlays/marker/google-maps-marker';
import { GoogleMapsNativeObjectEmittingWrapper } from '../core/abstraction/base/google-maps-native-object-emitting-wrapper';
import { IGoogleMap } from './i-google-map';
import { OverlaysTracker } from '../overlays/overlays-tracker';
import { IGoogleMapsDrawableOverlay } from '../core/abstraction/base/i-google-maps-drawable-overlay';

export class GoogleMap extends GoogleMapsNativeObjectEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    public overlays = new OverlaysTracker();

    constructor(private mapElement: ElementRef,
                protected api: GoogleMapsApiService,
                initialCenter?: google.maps.LatLng | google.maps.LatLngLiteral,
                initialZoom?: ZoomLevel | number)
    {
        super(api, () => new google.maps.Map(mapElement.nativeElement, {
            center: initialCenter || Defaults.Center,
            zoom:   initialZoom   || Defaults.ZoomLevel
        }));
    }

    public async getCenter(): Promise<google.maps.LatLng>
    {
        return (await this.native).getCenter();
    }

    public setCenter(lngLat: google.maps.LatLng | google.maps.LatLngLiteral)
    {
        this.api.runOutsideAngular(() => this.nativeObject.setCenter(lngLat));
    }

    public async getZoom(): Promise<number>
    {
        return (await this.native).getZoom();
    }

    public setZoom(zoomLevel: ZoomLevel | number)
    {
        this.api.runOutsideAngular(() => this.nativeObject.setZoom(zoomLevel));
    }

    public createMarker(options?: google.maps.ReadonlyMarkerOptions): Promise<GoogleMapsMarker>
    {
        // Marker creation will cause rendering. Run outside...
        return this.createOverlay(() => new GoogleMapsMarker(this, this.api, options));
    }

    // TODO: Add here create methods for any new featured overlay type (e.g. polygons, polylines, etc.)

    private async createOverlay<TOverlay extends IGoogleMapsDrawableOverlay>(createObject: () => TOverlay): Promise<TOverlay>
    {
        // Overlay creation will cause rendering. Run outside...
        const overlay = await this.api.runOutsideAngular(createObject);

        this.overlays.add(overlay);

        return overlay;
    }

    private async removeOverlay(overlay: IGoogleMapsDrawableOverlay)
    {
        // Overlay removal will cause rendering. Run outside...
        await this.api.runOutsideAngular(() => overlay.removeFromMap());

        this.overlays.remove(overlay);
    }
}
