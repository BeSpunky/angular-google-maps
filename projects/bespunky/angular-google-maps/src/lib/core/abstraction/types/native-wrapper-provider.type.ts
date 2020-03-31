import { IGoogleMapsNativeObjectWrapper } from '../base/i-google-maps-native-object-wrapper';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../base/i-google-maps-native-object-emitting-wrapper';

/** Represents functions which can be used to instantiate a native Google Maps object wrapper. */
export type NativeWrapperFactory<TWrapper extends IGoogleMapsNativeObjectWrapper, TOptions = any> = (options?: TOptions) => TWrapper;

/** Represents functions which can be used to instantiate a native Google Maps object wrapper which emits events. */
export type EmittingNativeWrapperFactory<TWrapper extends IGoogleMapsNativeObjectEmittingWrapper, TOptions = any> = (options?: TOptions) => TWrapper;