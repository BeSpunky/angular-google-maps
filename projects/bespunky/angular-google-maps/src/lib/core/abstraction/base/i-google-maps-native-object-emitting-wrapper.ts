import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';

export interface IGoogleMapsNativeObjectEmittingWrapper extends IGoogleMapsNativeObjectWrapper
{
    listenTo       (eventName: string, handler: () => void): Promise<any>;
    stopListeningTo(eventName: string)                     : Promise<any>;
}