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
    public async createMarker(position: Coord, options?: google.maps.Data.FeatureOptions): Promise<IGoogleMapsFeature>
    {
        options = Object.assign({}, options, { geometry: new google.maps.Data.Point(position) });

        return new GoogleMapsFeature(this.api, this, options);
    }

    public async addFeature(feature: google.maps.Data.Feature | IGoogleMapsFeature): Promise<void>
    {
        const nativeFeature = feature instanceof google.maps.Data.Feature ? feature : await feature.native;

        return this.add(nativeFeature);
    }

    public async removeFeature(feature: google.maps.Data.Feature): Promise<google.maps.Data.Feature>;
    public async removeFeature(feature: IGoogleMapsFeature): Promise<google.maps.Data.Feature>;
    public async removeFeature(featureId: string | number): Promise<google.maps.Data.Feature>;
    @OutsideAngular
    public async removeFeature(featureOrId: string | number | google.maps.Data.Feature | IGoogleMapsFeature): Promise<google.maps.Data.Feature>
    {
        // If it's a native feature, use it
        const feature = featureOrId instanceof google.maps.Data.Feature ? featureOrId :
            // If it's a wrapping feature, fetch native and use it
            typeof featureOrId === 'object' ? await featureOrId.native :
                // This is an id, find feature and use it
                this.nativeObject.getFeatureById(featureOrId);

        this.nativeObject.remove(feature);

        return feature;
    }

    public async toGeoJson(): Promise<any>
    {
        await this.native;

        return new Promise(resolve => this.nativeObject.toGeoJson(resolve));
    }

    @OutsideAngular
    public loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions): Promise<google.maps.Data.Feature[]>
    {
        return new Promise(resolve => this.nativeObject.loadGeoJson(url, options, resolve));
    }

    // Marked private so the addFeature() method will be the one exposed to the user
    @Wrap() @OutsideAngular
    private add(feature: google.maps.Data.Feature): Promise<void> { return null; }

    @Wrap('getFeatureById')
    findFeature(id: string | number): Promise<google.maps.Data.Feature> { return null; }
}