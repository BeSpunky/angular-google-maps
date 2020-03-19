import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';

export abstract class GoogleMapsNativeObjectWrapper<TNative extends IGoogleMapsNativeObject> implements IGoogleMapsNativeObjectWrapper                                                   
{
    public custom: any;

    protected nativeObject: TNative;

    constructor(protected api: GoogleMapsApiService, createObject: () => TNative)
    {
        this.api.runOutsideAngular(() =>
        {
            this.nativeObject = createObject();
        });
    }

    public get native(): Promise<TNative>
    {
        return this.api.whenReady.then(() => this.nativeObject);
    }
}
