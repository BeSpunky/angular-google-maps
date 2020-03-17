import { GoogleMapsNativeObjectWrapper } from '../base/google-maps-native-object-wrapper';

export interface IGoogleMapsEventData
{
    eventName: string;
    emitter: GoogleMapsNativeObjectWrapper;
    args: any;
    nativeArgs: any;
}
