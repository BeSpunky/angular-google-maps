import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { GoogleMapsNativeObjectWrapper } from './google-maps-native-object-wrapper';
import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';

export abstract class GoogleMapsNativeObjectEmittingWrapper<TNative extends IGoogleMapsNativeObject>
                extends GoogleMapsNativeObjectWrapper<TNative> implements IGoogleMapsNativeObjectEmittingWrapper                                                   
{
    constructor(api: GoogleMapsApiService)
    {
        super(api);
    }

    public listenTo(eventName: string, handler: () => void): Promise<any>
    {
        return this.native.then(native => google.maps.event.addListener(native, eventName, handler));
    }

    public stopListeningTo(eventName: string): Promise<any>
    {
        return this.native.then(native => google.maps.event.clearListeners(native, eventName));
    }
}
