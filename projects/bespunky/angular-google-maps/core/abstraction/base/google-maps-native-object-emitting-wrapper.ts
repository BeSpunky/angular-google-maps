import { GoogleMapsApiService                   } from '../../api/google-maps-api.service';
import { IGoogleMapsNativeObject                } from '../native/i-google-maps-native-object';
import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';
import { GoogleMapsNativeObjectWrapper          } from './google-maps-native-object-wrapper';

/**
 * Provides the base functionality for wrapper objects which emit events.
 * Wrappers like GoogleMap, GoogleMapsPolygon, etc. should extend this class.
 * 
 * @abstract
 * @extends {GoogleMapsNativeObjectWrapper<TNative>}
 * @implements {IGoogleMapsNativeObjectEmittingWrapper<TNative>}
 * @template TNative The type of native object the wrapper will work with.
 */
export abstract class GoogleMapsNativeObjectEmittingWrapper<TNative extends IGoogleMapsNativeObject>
              extends GoogleMapsNativeObjectWrapper<TNative>
           implements IGoogleMapsNativeObjectEmittingWrapper<TNative>
{
    /**
     * Creates an instance of GoogleMapsNativeObjectEmittingWrapper.
     * 
     * @param {GoogleMapsApiService} api The instance of the maps api service.
     * @param {...any[]} nativeArgs (Optional) Any arguments to pass into the native object's constructor.
     */
    constructor(api: GoogleMapsApiService, ...nativeArgs: any[])
    {
        super(api, ...nativeArgs);
    }

    /**
     * Registers a handler to a specific event of the native object and takes care of executing the handler inside angular's zone.
     *
     * @param {string} eventName The name of the native event to register the handler for.
     * @param {(...args: any[]) => void} handleEvent The function to execute when the event is triggered by the native object.
     * @returns {() => void} An function for unregistering the handler from the event.
     */
    public listenTo(eventName: string, handleEvent: (...args: any[]) => void): () => void
    {
        // The event is fired natively outside of angular, but the handler will work in the context of angular components.
        // This will bring execution to angular's zone.
        const handleEventInAngular = (...args: any[]) => this.api.runInsideAngular(() => handleEvent(args));

        // Register the handler and return the remove function
        const listener = google.maps.event.addListener(this.native, eventName, handleEventInAngular);

        // Flatten the object and bind the function to it, so it could execute correctly independently of the `this` value when it's called
        return listener.remove.bind(listener);
    }

    /**
     * Unregisters **all** handlers previously registered to handle a specific event.
     *
     * @param {string} eventName The name of the native event for which to unregister all handlers.
     */
    public stopListeningTo(eventName: string): void
    {
        return google.maps.event.clearListeners(this.native, eventName);
    }

    /**
     * Unregisters all handlers of any previously registered native event.
     */
    public clearListeners(): void
    {
        return google.maps.event.clearInstanceListeners(this.native);
    }
}
