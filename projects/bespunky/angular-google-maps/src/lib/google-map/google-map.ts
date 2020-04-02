import { ElementRef } from '@angular/core';

import { Defaults } from '../core/config/defaults';
import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { GoogleMapsNativeObjectEmittingWrapper } from '../core/abstraction/base/google-maps-native-object-emitting-wrapper';
import { NativeObjectWrapper } from '../core/decorators/native-object-wrapper.decorator';
import { IGoogleMap } from './i-google-map';
import { OverlaysTracker } from '../overlays/overlays-tracker';
import { GoogleMapsMarker } from '../overlays/marker/google-maps-marker';
import { ZoomLevel } from './types/zoom-level.enum';
import { Wrap } from '../core/decorators/wrap.decorator';
import { OutsideAngular } from '../core/decorators/outside-angular.decorator';
import { Coord } from '../core/abstraction/types/geometry-utils.type';
import { GoogleMapsData } from '../overlays/data/google-maps-data';
import { DrawableOverlay } from '../core/abstraction/types/drawable-overlay.type';

@NativeObjectWrapper
export class GoogleMap extends GoogleMapsNativeObjectEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    public readonly overlays = new OverlaysTracker();

    constructor(protected api: GoogleMapsApiService, mapElement: ElementRef, options?: google.maps.MapOptions)
    {
        super(api, mapElement, options);
    }

    protected createNativeObject(mapElement: ElementRef, options?: google.maps.MapOptions): google.maps.Map
    {
        options = Object.assign({}, {
            center: Defaults.Center,
            zoom  : Defaults.ZoomLevel,
        }, options);

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

    private createOverlay<TOverlay extends DrawableOverlay>(createObject: () => TOverlay): TOverlay
    {
        // Overlay creation will cause rendering. Run outside...
        const overlay = this.api.runOutsideAngular(createObject);

        this.overlays.add(overlay);

        return overlay;
    }

    public removeOverlay<TOverlay extends DrawableOverlay>(overlay: TOverlay): void
    {
        // Overlay removal will cause rendering. Run outside...
        this.api.runOutsideAngular(() => overlay.detach());

        this.overlays.remove(overlay);
    }

    // TODO: Implement facilitating transformations for fitBounts, panTo, panToBounds
    @Wrap() @OutsideAngular
    fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void { return void 0; }
    
    @Wrap() @OutsideAngular
    panTo(position: google.maps.LatLng | google.maps.LatLngLiteral): void { return void 0; }
    
    @Wrap() @OutsideAngular
    panToBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void { return void 0; }
    

    @Wrap() @OutsideAngular
    panBy(x: number, y: number): void { return void 0; }

    @Wrap() @OutsideAngular
    setOptions(options: google.maps.MapOptions): void { return void 0; }

    @Wrap()
    getBounds(): google.maps.LatLngBounds { return void 0; }

    @Wrap()
    getCenter(): google.maps.LatLng { return void 0; }

    @Wrap() @OutsideAngular
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): void { return void 0; }

    @Wrap()
    getClickableIcons(): boolean { return void 0; }

    @Wrap() @OutsideAngular
    setClickableIcons(clickable: boolean): void { return void 0; }

    @Wrap()
    getHeading(): number { return void 0; }

    @Wrap() @OutsideAngular
    setHeading(heading: number): void { return void 0; }

    @Wrap('getMapTypeId')
    getMapType(): string | google.maps.MapTypeId { return void 0; }

    @Wrap('setMapTypeId') @OutsideAngular
    setMapType(type: string | google.maps.MapTypeId): void { return void 0; }

    @Wrap()
    getProjection(): google.maps.Projection { return void 0; }

    @Wrap()
    getStreetView(): google.maps.StreetViewPanorama { return void 0; }

    @Wrap() @OutsideAngular
    setStreetView(panorama: google.maps.StreetViewPanorama): void { return void 0; }

    @Wrap()
    getTilt(): number { return void 0; }

    @Wrap() @OutsideAngular
    setTilt(tilt: number): void { return void 0; }

    @Wrap()
    getZoom(): number { return void 0; }

    @Wrap() @OutsideAngular
    setZoom(zoomLevel: ZoomLevel | number): void { return void 0; }
}
