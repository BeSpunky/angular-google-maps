import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';

export abstract class GoogleMapsNativeObjectWrapper implements IGoogleMapsNativeObjectWrapper
{
    abstract readonly native: Promise<IGoogleMapsNativeObject>;

    public custom: any;

    listenTo(eventName: string, handler: () => void): void
    {
        this.native.then(nativeObject => nativeObject.addListener(eventName, handler));
    }

    stopListeningTo(eventName: string): void
    {
        this.native.then(nativeObject => google.maps.event.clearListeners(nativeObject, eventName));
    }
}
