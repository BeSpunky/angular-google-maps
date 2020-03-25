import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';

export abstract class GoogleMapsNativeObjectWrapper<TNative extends IGoogleMapsNativeObject> implements IGoogleMapsNativeObjectWrapper                                                   
{
    public custom: any;

    protected nativeObject: TNative;

    constructor(protected api: GoogleMapsApiService)
    {
        this.api.runOutsideAngular(() =>
        {
            this.nativeObject = this.createNativeObject();
        });
    }

    public get native(): Promise<TNative>
    {
        return this.api.whenReady.then(() => this.nativeObject);
    }

    protected abstract createNativeObject(): TNative;
}