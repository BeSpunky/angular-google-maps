import { IGoogleMapsNativeObject } from './i-google-maps-native-object';

export interface IGoogleMapsEmittingNativeObject extends IGoogleMapsNativeObject
{
    addListener(eventName: string, handler: () => void): void;
}
