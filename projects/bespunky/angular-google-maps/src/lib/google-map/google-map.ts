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
import { Coord } from '../core/abstraction/types/geometry-utils.type';
import { GoogleMapsData } from '../overlays/data/google-maps-data';
import { IGoogleMapsNativeDrawableOverlay } from '../core/abstraction/native/i-google-maps-native-drawable-overlay';

@NativeObjectWrapper
export class GoogleMap extends GoogleMapsNativeObjectEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    public readonly overlays = new OverlaysTracker();

    constructor(
        protected api       : GoogleMapsApiService,
        private   mapElement: ElementRef,
        private   options?  : google.maps.MapOptions
    )
    {
        super(api, mapElement);
    }

    protected createNativeObject(mapElement: ElementRef): google.maps.Map
    {
        const options = Object.assign({}, {
            center: Defaults.Center,
            zoom  : Defaults.ZoomLevel,
        }, this.options);

        return new google.maps.Map(mapElement.nativeElement, options);
    }

    public createMarker(position: Coord, options?: google.maps.ReadonlyMarkerOptions): GoogleMapsMarker
    {        
        options = Object.assign({}, options, { position: this.api.geometry.toCoordLiteral(position) });
        
        // Marker creation will cause rendering. Run outside...
        return this.createOverlay(() => new GoogleMapsMarker(this.api, this, options));
    }

    public createDataLayer(options?: google.maps.Data.DataOptions): GoogleMapsData
    {
        return this.createOverlay(() => new GoogleMapsData(this.api, this, options));
    }

    // TODO: Add here create methods for any new featured overlay type (e.g. polygons, polylines, etc.)

    private createOverlay<TOverlay extends IGoogleMapsDrawableOverlay<IGoogleMapsNativeDrawableOverlay>>(createObject: () => TOverlay): TOverlay
    {
        // Overlay creation will cause rendering. Run outside...
        const overlay = this.api.runOutsideAngular(createObject);

        this.overlays.add(overlay);

        return overlay;
    }

    public removeOverlay<TOverlay extends IGoogleMapsDrawableOverlay<IGoogleMapsNativeDrawableOverlay>>(overlay: TOverlay): void
    {
        // Overlay removal will cause rendering. Run outside...
        this.api.runOutsideAngular(() => overlay.removeFromMap());

        this.overlays.remove(overlay);
    }

    @Wrap()
    getCenter(): google.maps.LatLng { return null; }

    @Wrap() @OutsideAngular
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): void { return null; }

    @Wrap()
    getZoom(): number { return null; }

    @Wrap() @OutsideAngular
    setZoom(zoomLevel: ZoomLevel | number): void { return null; }
}
