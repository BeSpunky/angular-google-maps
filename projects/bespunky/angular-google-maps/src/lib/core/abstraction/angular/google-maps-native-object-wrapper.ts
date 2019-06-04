import { IGoogleMapsNativeObjectWrapper } from '../native/i-google-maps-native-object-wrapper';

export abstract class GoogleMapsNativeObjectWrapper implements IGoogleMapsNativeObjectWrapper
{
    abstract readonly native: any;

    listenTo(eventName: string, handler: () => void): void
    {
        this.native.addListener(eventName, handler);
    }

    stopListeningTo(eventName: string): void
    {
        google.maps.event.clearListeners(this.native, eventName);
    }
}
