import { IGoogleMapsEventData } from './i-google-maps-event-data';
import { GoogleMapsLifecycleBase } from '../google-maps-lifecycle-base';

export class GoogleMapsEventData implements IGoogleMapsEventData
{
    constructor(public eventName: string,
                public emitter: GoogleMapsLifecycleBase,
                public args: any,
                public nativeArgs: any) { }
}
