import { GoogleMapsDrawableOverlay } from '../../core/abstraction/base/google-maps-drawable-overlay';
import { IGoogleMapsData } from './i-google-maps-data';
import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { OverlayType } from '../../core/abstraction/base/overlay-type.enum';
import { NativeObjectWrapper } from '../../core/decorators/native-object-wrapper.decorator';
import { Wrap } from '../../core/decorators/wrap.decorator';
import { OutsideAngular } from '../../core/decorators/outside-angular.decorator';
import { Coord, CoordPath } from '../../core/abstraction/types/geometry.type';
import { IGoogleMapsFeature } from './feature/i-google-maps-feature';
import { GoogleMapsFeature } from './feature/google-maps-feature';
import { isGoogleMapsFeatureOptions } from '../../core/abstraction/type-guards/feature-options-type-guard';
import { FeatureTracker } from './feature-tracker';

@NativeObjectWrapper
export class GoogleMapsData extends GoogleMapsDrawableOverlay<google.maps.Data> implements IGoogleMapsData
{
    public readonly features = new FeatureTracker();

    constructor(api: GoogleMapsApiService, public map: IGoogleMap, options?: google.maps.Data.DataOptions)
    {
        super(api, map, OverlayType.Data, options);
    }

    protected createNativeObject(options?: google.maps.Data.DataOptions): google.maps.Data
    {
        return new google.maps.Data(options);
    }

    @OutsideAngular
    public createMarker(position: Coord, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature
    {
        options = this.buildOptions(this.api.geometry.createDataPoint(position), options);

        return this.addFeature(options);
    }

    @OutsideAngular
    public createPolygon(path: CoordPath, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature
    {
        options = this.buildOptions(this.api.geometry.createDataPolygon(path), options);

        return this.addFeature(options);
    }

    private buildOptions(geometry: google.maps.Data.Geometry, baseOptions?: google.maps.Data.FeatureOptions): google.maps.Data.FeatureOptions
    {
        return Object.assign({}, baseOptions, { geometry });
    }

    public addFeature(feature: IGoogleMapsFeature): IGoogleMapsFeature;
    public addFeature(options: google.maps.Data.FeatureOptions): IGoogleMapsFeature;
    public addFeature(feature: google.maps.Data.FeatureOptions | IGoogleMapsFeature): IGoogleMapsFeature
    {
        if (isGoogleMapsFeatureOptions(feature))
            feature = new GoogleMapsFeature(this.api, this, feature);

        this.add(feature.native);
        this.features.add(feature);

        return feature;
    }

    public removeFeature(feature: google.maps.Data.Feature): IGoogleMapsFeature;
    public removeFeature(feature: IGoogleMapsFeature): IGoogleMapsFeature;
    public removeFeature(featureId: string | number): IGoogleMapsFeature;
    @OutsideAngular
    public removeFeature(featureOrId: string | number | google.maps.Data.Feature | IGoogleMapsFeature): IGoogleMapsFeature
    {
        const removed = this.features.remove(featureOrId);

        if (removed)
            this.native.remove(removed.native);

        return removed;
    }

    public toGeoJson(): Promise<any>
    {
        return new Promise(resolve => this.native.toGeoJson(resolve));
    }

    @OutsideAngular
    public loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions): Promise<google.maps.Data.Feature[]>
    {
        return new Promise(resolve => this.native.loadGeoJson(url, options, resolve));
    }

    
    // Marked private so the addFeature() method will be the one exposed to the user, but this will be used in auto property delegation
    @Wrap() @OutsideAngular
    private add(feature: google.maps.Data.Feature): void { }

    @Wrap('getFeatureById')
    findFeature(id: string | number): google.maps.Data.Feature { return void 0; }

    @Wrap()
    getControlPosition(): google.maps.ControlPosition { return void 0; }

    @Wrap() @OutsideAngular
    setControlPosition(position: google.maps.ControlPosition): void { }

    @Wrap()
    getControls(): string[] { return void 0; }

    @Wrap() @OutsideAngular
    setControls(controls: string[]): void { }

    @Wrap()
    getDrawingMode(): string { return void 0; }

    @Wrap() @OutsideAngular
    setDrawingMode(mode: string): void { }

    @Wrap()
    getStyle(): google.maps.Data.StylingFunction | google.maps.Data.StyleOptions { return void 0; }

    @Wrap() @OutsideAngular
    setStyle(style: google.maps.Data.StylingFunction | google.maps.Data.StyleOptions): void { }
}