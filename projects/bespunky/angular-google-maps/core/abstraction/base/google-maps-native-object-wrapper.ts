import { GoogleMapsApiService           } from '../../api/google-maps-api.service';
import { IGoogleMapsNativeObject        } from '../native/i-google-maps-native-object';
import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';

export abstract class GoogleMapsNativeObjectWrapper<TNative extends IGoogleMapsNativeObject>
           implements IGoogleMapsNativeObjectWrapper<TNative>
{
    public custom: any;

    protected nativeObject: TNative;

    constructor(protected api: GoogleMapsApiService, ...nativeArgs: any[])
    {
        this.api.runOutsideAngular(() =>
        {
            this.nativeObject = this.createNativeObject(...nativeArgs);
        });
    }

    public get native(): TNative
    {
        return this.nativeObject;
    }

    protected abstract createNativeObject(...nativeArgs: any[]): TNative;
}