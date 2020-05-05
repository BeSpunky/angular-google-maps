import { IGoogleMapsNativeObject        } from '../native/i-google-maps-native-object';
import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';

export interface IGoogleMapsNativeObjectEmittingWrapper<TNative extends IGoogleMapsNativeObject>
         extends IGoogleMapsNativeObjectWrapper<TNative>
{
    /**
     * Registers an event handler on the native object.
     *
     * @param {string} eventName The name of the native event to listen to.
     * @param {(...args: any[]) => void} handler The function that will handle the event.
     * @returns {() => void} A function which can be used to unregister that specific handler.
     */
    listenTo(eventName: string, handler: (...args: any[]) => void): () => void;
    /**
     * Unregisters all handlers for the specified event from the native object.
     *
     * @param {string} eventName The name of the event for which handlers should be cleared.
     */
    stopListeningTo(eventName: string): void;
    /** Unregisters all handlers for all events from the native object. */
    clearListeners(): void;
}