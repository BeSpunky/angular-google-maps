import { GoogleMapsNativeObjectWrapper } from '../../../core/abstraction/base/google-maps-native-object-wrapper';
import { IGoogleMapsFeature } from './i-google-maps-feature';
import { IGoogleMapsData } from '../i-google-maps-data';
import { GoogleMapsApiService } from '../../../core/api/google-maps-api.service';

export class GoogleMapsFeature extends GoogleMapsNativeObjectWrapper<google.maps.Data.Feature> implements IGoogleMapsFeature
{
    constructor(public data: IGoogleMapsData, private api: GoogleMapsApiService, options?: google.maps.Data.FeatureOptions)
    {
        super(api, () => new google.maps.Data.Feature(options));
    }
    
    public async getId(): Promise<string | number>
    {
        return (await this.native).getId();
    }
    
    public async getGeometry(): Promise<google.maps.Data.Geometry>
    {
        return (await this.native).getGeometry();
    }
    
    public setGeometry(geometry: google.maps.Data.Geometry | google.maps.LatLng | google.maps.LatLngLiteral): Promise<void>
    {
        return this.api.runOutsideAngular(() => this.nativeObject.setGeometry(geometry));
    }
    
    public async getProperty(name: string): Promise<any>
    {
        return (await this.native).getProperty(name);
    }
    
    public setProperty(name: string, value: any): Promise<any>
    {
        return this.api.runOutsideAngular(() => this.nativeObject.setProperty(name, value));
    }
    
    public async toGeoJson(): Promise<any>
    {
        await this.native;

        return new Promise(resolve => this.nativeObject.toGeoJson(resolve));
    }
}
