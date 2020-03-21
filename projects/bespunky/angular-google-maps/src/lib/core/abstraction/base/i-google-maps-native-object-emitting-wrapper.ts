import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';

export interface IGoogleMapsNativeObjectEmittingWrapper extends IGoogleMapsNativeObjectWrapper
{
    listenTo(eventName: string, handler: () => void): Promise<void>;
    stopListeningTo(eventName: string): Promise<void>;
}