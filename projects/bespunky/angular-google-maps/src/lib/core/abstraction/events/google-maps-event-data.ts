import { IGoogleMapsEventData } from './i-google-maps-event-data';
import { IGoogleMapsNativeObjectWrapper } from '../base/i-google-maps-native-object-wrapper';

export class GoogleMapsEventData implements IGoogleMapsEventData
{
    constructor(public eventName: string,
                public emitter: IGoogleMapsNativeObjectWrapper,
                public args: any,
                public nativeArgs: any) { }
}
