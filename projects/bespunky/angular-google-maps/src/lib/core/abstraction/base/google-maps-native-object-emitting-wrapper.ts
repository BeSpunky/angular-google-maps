import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { GoogleMapsNativeObjectWrapper } from './google-maps-native-object-wrapper';
import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsEmittingNativeObject } from '../native/i-google-maps-emitting-native-object';

export abstract class GoogleMapsNativeObjectEmittingWrapper<TNative extends IGoogleMapsEmittingNativeObject>
                extends GoogleMapsNativeObjectWrapper<TNative> implements IGoogleMapsNativeObjectEmittingWrapper                                                   
{
    constructor(api: GoogleMapsApiService)
    {
        super(api);
    }

    public listenTo(eventName: string, handler: () => void): Promise<void>
    {
        return this.native.then(nativeObject => nativeObject.addListener(eventName, handler));
    }

    public stopListeningTo(eventName: string): Promise<void>
    {
        return this.native.then(nativeObject => google.maps.event.clearListeners(nativeObject, eventName));
    }
}
