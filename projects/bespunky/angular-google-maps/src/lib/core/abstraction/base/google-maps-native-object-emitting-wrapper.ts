import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { GoogleMapsNativeObjectWrapper } from './google-maps-native-object-wrapper';
import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';

export abstract class GoogleMapsNativeObjectEmittingWrapper<TNative extends IGoogleMapsNativeObject>
              extends GoogleMapsNativeObjectWrapper<TNative>
           implements IGoogleMapsNativeObjectEmittingWrapper<TNative>
{
    constructor(api: GoogleMapsApiService)
    {
        super(api);
    }

    public listenTo(eventName: string, handleEvent: (...args: any[]) => void): () => void
    {
        // The event is fired natively outside of angular, but the handler will work in the context of angular components.
        // This will bring execution to angular's zone.
        const handleEventInAngular = (...args: any[]) => this.api.runInsideAngular(() => handleEvent(args));

        // Register the handler and return the remove function
        return google.maps.event.addListener(this.native, eventName, handleEventInAngular).remove;
    }

    public stopListeningTo(eventName: string): void
    {
        return google.maps.event.clearListeners(this.native, eventName);
    }

    public clearListeners(): void
    {
        return google.maps.event.clearInstanceListeners(this.native);
    }
}
