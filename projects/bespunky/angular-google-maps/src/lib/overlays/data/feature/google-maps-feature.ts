import { GoogleMapsNativeObjectWrapper } from '../../../core/abstraction/base/google-maps-native-object-wrapper';
import { IGoogleMapsFeature } from './i-google-maps-feature';
import { IGoogleMapsData } from '../i-google-maps-data';
import { GoogleMapsApiService } from '../../../core/api/google-maps-api.service';
import { NativeObjectWrapper } from '../../../core/decorators/native-object-wrapper.decorator';
import { Wrap } from '../../../core/decorators/wrap.decorator';
import { OutsideAngular } from '../../../core/decorators/outside-angular.decorator';

@NativeObjectWrapper
export class GoogleMapsFeature extends GoogleMapsNativeObjectWrapper<google.maps.Data.Feature> implements IGoogleMapsFeature
{
    constructor(protected api: GoogleMapsApiService, public data: IGoogleMapsData, private options?: google.maps.Data.FeatureOptions)
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

    @Wrap()
    getId(): Promise<number | string> { return null; }
    
    @Wrap()
    getGeometry(): Promise<google.maps.Data.Geometry> { return null; }
    
    @Wrap() @OutsideAngular
    setGeometry(geometry: google.maps.Data.Geometry | google.maps.LatLng | google.maps.LatLngLiteral): Promise<void> { return null; }

    @Wrap()
    getProperty(name: string): Promise<any> { return null; }
    
    @Wrap() @OutsideAngular
    setProperty(name: string, value: any): Promise<any> { return null; }
}
