import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { GoogleMapsNativeObjectWrapper } from './google-maps-native-object-wrapper';
import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsEmittingNativeObject } from '../native/i-google-maps-emitting-native-object';

export abstract class GoogleMapsNativeObjectEmittingWrapper<TNative extends IGoogleMapsEmittingNativeObject>
                extends GoogleMapsNativeObjectWrapper<TNative> implements IGoogleMapsNativeObjectEmittingWrapper                                                   
{
    constructor(api: GoogleMapsApiService, createObject: () => TNative)
    {
        super(api, createObject);
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
