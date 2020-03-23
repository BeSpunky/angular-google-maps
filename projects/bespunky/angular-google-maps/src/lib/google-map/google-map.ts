import { ElementRef } from '@angular/core';

import { Defaults } from '../core/config/defaults';
import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { GoogleMapsNativeObjectEmittingWrapper } from '../core/abstraction/base/google-maps-native-object-emitting-wrapper';
import { IGoogleMapsDrawableOverlay } from '../core/abstraction/base/i-google-maps-drawable-overlay';
import { NativeObjectWrapper } from '../core/decorators/native-object-wrapper.decorator';
import { IGoogleMap } from './i-google-map';
import { OverlaysTracker } from '../overlays/overlays-tracker';
import { GoogleMapsMarker } from '../overlays/marker/google-maps-marker';
import { ZoomLevel } from './types/zoom-level.enum';

/**
 * Extends intellisense for the class without providing implementation for the methods dynamically set by the framework.
 * See documentation for the `@NativeObjectWrapper()` decorator for more info.
 */
export interface GoogleMap
{
    getCenter(): Promise<google.maps.LatLng>;
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): Promise<void>;

    getZoom(): Promise<number>;
    setZoom(zoomLevel: ZoomLevel | number): Promise<void>;
}

@NativeObjectWrapper({
    nativeType: google.maps.Map
})
export class GoogleMap extends GoogleMapsNativeObjectEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    public overlays = new OverlaysTracker();

    constructor(private mapElement: ElementRef,
                protected api: GoogleMapsApiService,
                private initialCenter?: google.maps.LatLng | google.maps.LatLngLiteral,
                private initialZoom?: ZoomLevel | number)
    {
        super(api);
    }

    protected createNativeObject(): google.maps.Map
    {
        return new google.maps.Map(this.mapElement.nativeElement, {
            center: this.initialCenter || Defaults.Center,
            zoom: this.initialZoom || Defaults.ZoomLevel
        });
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

    public async removeOverlay(overlay: IGoogleMapsDrawableOverlay)
    {
        // Overlay removal will cause rendering. Run outside...
        await this.api.runOutsideAngular(() => overlay.removeFromMap());

        this.overlays.remove(overlay);
    }
}
