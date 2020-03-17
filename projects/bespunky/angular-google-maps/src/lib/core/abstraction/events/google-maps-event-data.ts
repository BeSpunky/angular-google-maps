import { IGoogleMapsEventData } from './i-google-maps-event-data';
import { GoogleMapsNativeObjectWrapper } from '../base/google-maps-native-object-wrapper';

export class GoogleMapsEventData implements IGoogleMapsEventData
{
    constructor(public eventName: string,
                public emitter: GoogleMapsNativeObjectWrapper,
                public args: any,
                public nativeArgs: any) { }
}
