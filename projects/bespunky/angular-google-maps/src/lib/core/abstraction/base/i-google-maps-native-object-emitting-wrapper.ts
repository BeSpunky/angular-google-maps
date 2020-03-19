import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';

export interface IGoogleMapsNativeObjectEmittingWrapper extends IGoogleMapsNativeObjectWrapper
{
    listenTo(eventName: string, handler: () => void): void;
    stopListeningTo(eventName: string): void;
}