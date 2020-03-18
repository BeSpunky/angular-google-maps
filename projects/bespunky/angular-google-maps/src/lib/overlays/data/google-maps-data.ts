import { GoogleMapsDrawableOverlay } from '../../core/abstraction/base/google-maps-drawable-overlay';
import { IGoogleMapsData } from './i-google-maps-data';
import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { OverlayType } from '../../core/abstraction/base/overlay-type.enum';

export class GoogleMapsData extends GoogleMapsDrawableOverlay implements IGoogleMapsData
{
    private data: google.maps.Data;

    constructor(public map: IGoogleMap, api: GoogleMapsApiService, options?: google.maps.Data.DataOptions)
    {
        super(OverlayType.Data, map, api);

        this.whenReady.then(() =>
        {
            this.data = new google.maps.Data(options);
        });
    }

    public get native(): Promise<google.maps.Data>
    {
        return this.whenReady.then(() => this.data);
    }
    
    public async addFeature(feature: google.maps.Data.Feature): Promise<void>
    {
        await this.api.runOutsideAngular(() => this.data.add(feature));
    }
    
    public async removeFeature(feature: google.maps.Data.Feature): Promise<google.maps.Data.Feature>;
    public async removeFeature(featureId: string | number): Promise<google.maps.Data.Feature>;
    public async removeFeature(featureOrId: string | number | google.maps.Data.Feature): Promise<google.maps.Data.Feature>
    {
        return await this.api.runOutsideAngular(() =>
        { 
            const feature = featureOrId instanceof google.maps.Data.Feature ? featureOrId : this.data.getFeatureById(featureOrId);
            
            this.data.remove(feature);

            return feature;
        });
    }
    
    public findFeature(id: string | number): Promise<google.maps.Data.Feature>
    {
        return this.whenReady.then(() => this.data.getFeatureById(id));
    }
    
    public async loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions): Promise<google.maps.Data.Feature[]>
    {
        return await this.api.runOutsideAngular(() =>
        {
            return new Promise(resolve => this.data.loadGeoJson(url, options, resolve));
        });
    }
    
    public async toGeoJson(): Promise<any>
    {
        await this.whenReady;

        return new Promise(resolve => this.data.toGeoJson(resolve));
    }
}
