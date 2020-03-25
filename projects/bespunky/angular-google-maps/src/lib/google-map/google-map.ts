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
import { Wrap } from '../core/decorators/wrap.decorator';
import { OutsideAngular } from '../core/decorators/outside-angular.decorator';
import { Coord } from '../core/types/geometry-utils.type';
import { GeometryTransformService } from '../utils/transform/geometry-transform.service';

@NativeObjectWrapper
export class GoogleMap extends GoogleMapsNativeObjectEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    public overlays = new OverlaysTracker();

    constructor(
        private   mapElement    : ElementRef,
        protected api           : GoogleMapsApiService,
        protected geometry      : GeometryTransformService,
        private   initialCenter?: google.maps.LatLng | google.maps.LatLngLiteral,
        private   initialZoom?  : ZoomLevel | number)
    {
        super(api);
    }

    protected createNativeObject(): google.maps.Map
    {
        return new google.maps.Map(this.mapElement.nativeElement, {
            center: this.initialCenter || Defaults.Center,
            zoom  : this.initialZoom   || Defaults.ZoomLevel
        });
    }

    public createMarker(position: Coord, options?: google.maps.ReadonlyMarkerOptions): Promise<GoogleMapsMarker>
    {        
        options = Object.assign({}, options, { position: this.geometry.toCoordLiteral(position) });

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

    @Wrap()
    getCenter(): Promise<google.maps.LatLng> { return null; }

    @Wrap() @OutsideAngular
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): Promise<void> { return null; }

    @Wrap()
    getZoom(): Promise<number> { return null; }

    @Wrap() @OutsideAngular
    setZoom(zoomLevel: ZoomLevel | number): Promise<void> { return null; }
}
