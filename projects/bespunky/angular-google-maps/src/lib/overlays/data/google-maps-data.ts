import { GoogleMapsDrawableOverlay } from '../../core/abstraction/base/google-maps-drawable-overlay';
import { IGoogleMapsData } from './i-google-maps-data';
import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { OverlayType } from '../../core/abstraction/base/overlay-type.enum';
import { NativeObjectWrapper } from '../../core/decorators/native-object-wrapper.decorator';
import { Wrap } from '../../core/decorators/wrap.decorator';
import { OutsideAngular } from '../../core/decorators/outside-angular.decorator';
import { Coord } from '../../core/abstraction/types/geometry-utils.type';
import { IGoogleMapsFeature } from './feature/i-google-maps-feature';
import { GoogleMapsFeature } from './feature/google-maps-feature';

@NativeObjectWrapper
export class GoogleMapsData extends GoogleMapsDrawableOverlay<google.maps.Data> implements IGoogleMapsData
{
    constructor(api: GoogleMapsApiService, public map: IGoogleMap, private options?: google.maps.Data.DataOptions)
    {
        super(api, map, OverlayType.Data);
    }

    protected createNativeObject(): google.maps.Data
    {
        return new google.maps.Data(this.options);
    }

    @OutsideAngular
    public createMarker(position: Coord, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature
    {
        options = Object.assign({}, options, { geometry: new google.maps.Data.Point(position) });

        return new GoogleMapsFeature(this.api, this, options);
    }

    public addFeature(feature: google.maps.Data.Feature | IGoogleMapsFeature): void
    {
        const nativeFeature = feature instanceof google.maps.Data.Feature ? feature : feature.native;

        return this.add(nativeFeature);
    }

    public removeFeature(feature: google.maps.Data.Feature): google.maps.Data.Feature;
    public removeFeature(feature: IGoogleMapsFeature): google.maps.Data.Feature;
    public removeFeature(featureId: string | number): google.maps.Data.Feature;
    @OutsideAngular
    public removeFeature(featureOrId: string | number | google.maps.Data.Feature | IGoogleMapsFeature): google.maps.Data.Feature
    {
        // If it's a native feature, use it
        const feature = featureOrId instanceof google.maps.Data.Feature ? featureOrId :
            // If it's a wrapping feature, fetch native and use it
            typeof featureOrId === 'object' ? featureOrId.native :
                // This is an id, find feature and use it
                this.native.getFeatureById(featureOrId);

        this.native.remove(feature);

        return feature;
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

    
    // Marked private so the addFeature() method will be the one exposed to the user
    @Wrap() @OutsideAngular
    private add(feature: google.maps.Data.Feature): void { return void 0; }

    @Wrap('getFeatureById')
    findFeature(id: string | number): google.maps.Data.Feature { return void 0; }

    @Wrap()
    getControlPosition(): google.maps.ControlPosition { return void 0; }

    @Wrap() @OutsideAngular
    setControlPosition(position: google.maps.ControlPosition): void { return void 0; }

    @Wrap()
    getControls(): string[] { return void 0; }

    @Wrap() @OutsideAngular
    setControls(controls: string[]): void { return void 0; }

    @Wrap()
    getDrawingMode(): string { return void 0; }

    @Wrap() @OutsideAngular
    setDrawingMode(mode: string): void { return void 0; }

    @Wrap()
    getStyle(): google.maps.Data.StylingFunction | google.maps.Data.StyleOptions { return void 0; }

    @Wrap() @OutsideAngular
    setStyle(style: google.maps.Data.StylingFunction | google.maps.Data.StyleOptions): void { return void 0; }
}