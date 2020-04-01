import { IGoogleMapsEventData } from './i-google-maps-event-data';
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../base/i-google-maps-native-object-emitting-wrapper';

export class GoogleMapsEventData implements IGoogleMapsEventData
{
    constructor(
        /** The name of the triggered event. */
        public eventName: string,
        /**
         * The wrapper which actually emitted the event. If the component was hooked to its own inner wrapper's events, this will be the inner wrapper.
         * If a component was hooked to events of another wrapper, this will be the other wrapper. In case you need access only to the component's inner wrapper,
         * use `associatedEmitter` instead.
         */
        public emitter: IGoogleMapsNativeObjectEmittingWrapper<IGoogleMapsNativeObject>,
        /** The native object which actually emitted the event. */
        public nativeEmitter: IGoogleMapsNativeObject,
        /** A transformed version of the native arguments provided in the native event. Cleaner, easier to use. */
        public args: any,
        /** The native arguments provided in the native event. */
        public nativeArgs: any,
        /** The wrapper this event is related to. This is always the inner wrapper of the hooked component. */
        public associatedEmitter: IGoogleMapsNativeObjectEmittingWrapper<IGoogleMapsNativeObject>
    ) { }
}
