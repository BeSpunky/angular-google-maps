import { IGoogleMapsNativeObjectEmittingWrapper } from '../base/i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';

export interface IGoogleMapsEventData
{
    /** The name of the triggered event. */
    eventName: string,
    /** The wrapper which actually emitted the event. See `delegatedEmitter` documentation for more details. */
    emitter: IGoogleMapsNativeObjectEmittingWrapper,
    /** The native object which actually emitted the event. */
    nativeEmitter: IGoogleMapsNativeObject,
    /** A transformed version of the native arguments provided in the native event. Cleaner, easier to use. */
    args: any,
    /** The native arguments provided in the native event. */
    nativeArgs: any,
    /**
     * The wrapper this event is related to. If events a component's events were hooked to a wrapper different to the one it holds internally,
     * this will be the inner wrapper. Otherwise (events were hooked to the internal wrapper of the component), this will be the same as the `emitter` member.
     * Example use case: GoogleMapsFeatureDirective hooks events to a GoogleMapsData wrapper from its containing GoogleMapsDataDirective.
     */
    delegatedEmitter: IGoogleMapsNativeObjectEmittingWrapper
}
