import { GoogleMapsDrawableOverlay } from '../../core/abstraction/base/google-maps-drawable-overlay';
import { IGoogleMapsData } from './i-google-maps-data';
import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { OverlayType } from '../../core/abstraction/base/overlay-type.enum';

export class GoogleMapsData extends GoogleMapsDrawableOverlay<google.maps.Data> implements IGoogleMapsData
{
    constructor(public map: IGoogleMap, api: GoogleMapsApiService, options?: google.maps.Data.DataOptions)
    {
        super(OverlayType.Data, map, api, () => new google.maps.Data(options));
    }
    
    public async addFeature(feature: google.maps.Data.Feature): Promise<void>
    {
        await this.api.runOutsideAngular(() => this.nativeObject.add(feature));
    }
    
    public async removeFeature(feature: google.maps.Data.Feature): Promise<google.maps.Data.Feature>;
    public async removeFeature(featureId: string | number): Promise<google.maps.Data.Feature>;
    public async removeFeature(featureOrId: string | number | google.maps.Data.Feature): Promise<google.maps.Data.Feature>
    {
        return await this.api.runOutsideAngular(() =>
        { 
            const feature = featureOrId instanceof google.maps.Data.Feature ? featureOrId : this.nativeObject.getFeatureById(featureOrId);
            
            this.nativeObject.remove(feature);

            return feature;
        });
    }
    
    public async findFeature(id: string | number): Promise<google.maps.Data.Feature>
    {
        return (await this.native).getFeatureById(id);
    }
    
    public async loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions): Promise<google.maps.Data.Feature[]>
    {
        return await this.api.runOutsideAngular(() =>
        {
            return new Promise(resolve => this.nativeObject.loadGeoJson(url, options, resolve));
        });
    }
    
    public async toGeoJson(): Promise<any>
    {
        await this.native;

        return new Promise(resolve => this.nativeObject.toGeoJson(resolve));
    }
}
