import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';

export abstract class GoogleMapsNativeObjectWrapper<TNative extends IGoogleMapsNativeObject> implements IGoogleMapsNativeObjectWrapper                                                   
{
    public custom: any;

    protected whenReady: Promise<void>;
    protected nativeObject: TNative;

    constructor(api: GoogleMapsApiService, createObject: () => TNative)
    {
        this.whenReady = api.whenReady;
        
        api.runOutsideAngular(() =>
        {
            this.nativeObject = createObject();
        });
    }

    public get native(): Promise<TNative>
    {
        return this.whenReady.then(() => this.nativeObject);
    }
}
