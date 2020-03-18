import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';

export abstract class GoogleMapsNativeObjectWrapper implements IGoogleMapsNativeObjectWrapper
{
    abstract readonly native: Promise<IGoogleMapsNativeObject>;
    public custom: any;
    
    protected whenReady: Promise<void>;

    constructor(api: GoogleMapsApiService)
    {
        this.whenReady = api.whenReady;
    }

    listenTo(eventName: string, handler: () => void): void
    {
        this.native.then(nativeObject => nativeObject.addListener(eventName, handler));
    }

    stopListeningTo(eventName: string): void
    {
        this.native.then(nativeObject => google.maps.event.clearListeners(nativeObject, eventName));
    }
}
