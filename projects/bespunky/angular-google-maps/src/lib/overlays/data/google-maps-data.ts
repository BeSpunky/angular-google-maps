import { GoogleMapsDrawableOverlay } from '../../core/abstraction/base/google-maps-drawable-overlay';
import { IGoogleMapsData } from './i-google-maps-data';
import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { OverlayType } from '../../core/abstraction/base/overlay-type.enum';
import { NativeObjectWrapper } from '../../core/decorators/native-object-wrapper.decorator';
import { Wrap } from '../../core/decorators/wrap.decorator';
import { OutsideAngular } from '../../core/decorators/outside-angular.decorator';

@NativeObjectWrapper
export class GoogleMapsData extends GoogleMapsDrawableOverlay<google.maps.Data> implements IGoogleMapsData
{
    constructor(public map: IGoogleMap, api: GoogleMapsApiService, private options?: google.maps.Data.DataOptions)
    {
        super(OverlayType.Data, map, api);
    }

    protected createNativeObject(): google.maps.Data
    {
        return new google.maps.Data(this.options);
    }
    
    public removeFeature(feature: google.maps.Data.Feature): Promise<google.maps.Data.Feature>;
    public removeFeature(featureId: string | number): Promise<google.maps.Data.Feature>;
    public removeFeature(featureOrId: string | number | google.maps.Data.Feature): Promise<google.maps.Data.Feature>
    {
        return this.api.runOutsideAngular(() =>
        { 
            const feature = featureOrId instanceof google.maps.Data.Feature ? featureOrId : this.nativeObject.getFeatureById(featureOrId);
            
            this.nativeObject.remove(feature);

            return feature;
        });
    }
    
    @Wrap('add') @OutsideAngular
    addFeature(feature: google.maps.Data.Feature): Promise<void> { return null; }

    @Wrap('getFeatureById')
    findFeature(id: string | number): Promise<google.maps.Data.Feature> { return null; }
    
    @OutsideAngular
    loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions): Promise<google.maps.Data.Feature[]>
    {
        return new Promise(resolve => this.nativeObject.loadGeoJson(url, options, resolve));
    }
    
    public async toGeoJson(): Promise<any>
    {
        await this.native;

        return new Promise(resolve => this.nativeObject.toGeoJson(resolve));
    }
}
