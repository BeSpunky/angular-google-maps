import { GoogleMapsLifecycleBase } from '../google-maps-lifecycle-base';

export interface IGoogleMapsEventData
{
    eventName: string;
    emitter: GoogleMapsLifecycleBase;
    args: any;
    nativeArgs: any;
}
