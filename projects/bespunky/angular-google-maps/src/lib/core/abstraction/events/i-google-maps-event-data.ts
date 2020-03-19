import { IGoogleMapsNativeObjectWrapper } from '../base/i-google-maps-native-object-wrapper';

export interface IGoogleMapsEventData
{
    eventName: string;
    emitter: IGoogleMapsNativeObjectWrapper;
    args: any;
    nativeArgs: any;
}
