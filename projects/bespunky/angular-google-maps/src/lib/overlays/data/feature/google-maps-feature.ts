import { GoogleMapsNativeObjectWrapper } from '../../../core/abstraction/base/google-maps-native-object-wrapper';
import { IGoogleMapsFeature } from './i-google-maps-feature';
import { IGoogleMapsData } from '../i-google-maps-data';
import { GoogleMapsApiService } from '../../../core/api/google-maps-api.service';
import { NativeObjectWrapper } from '../../../core/decorators/native-object-wrapper.decorator';

/**
 * Extends intellisense for the class without providing implementation for the methods dynamically set by the framework.
 * See documentation for the `@NativeObjectWrapper()` decorator for more info.
 */
export interface GoogleMapsFeature
{
    getId(): Promise<number | string>;
    
    getGeometry()                                                                                    : Promise<google.maps.Data.Geometry>;
    setGeometry(geometry: google.maps.Data.Geometry | google.maps.LatLng | google.maps.LatLngLiteral): Promise<void>;

    getProperty(name: string)            : Promise<any>;
    setProperty(name: string, value: any): Promise<any>;
}

@NativeObjectWrapper({
    nativeType: google.maps.Data.Feature
})
export class GoogleMapsFeature extends GoogleMapsNativeObjectWrapper<google.maps.Data.Feature> implements IGoogleMapsFeature
{
    constructor(public data: IGoogleMapsData, protected api: GoogleMapsApiService, private options?: google.maps.Data.FeatureOptions)
    {
        super(api);
    }
    
    protected createNativeObject(): google.maps.Data.Feature
    {
        return new google.maps.Data.Feature(this.options);
    }
    
    public async toGeoJson(): Promise<any>
    {
        await this.native;

        return new Promise(resolve => this.nativeObject.toGeoJson(resolve));
    }
}
