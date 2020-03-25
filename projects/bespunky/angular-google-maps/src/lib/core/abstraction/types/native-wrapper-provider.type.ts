import { IGoogleMapsNativeObjectWrapper } from '../base/i-google-maps-native-object-wrapper';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../base/i-google-maps-native-object-emitting-wrapper';

export type NativeWrapperFactory<TOptions = any> = (options?: TOptions) => IGoogleMapsNativeObjectWrapper;

export type EmittingNativeWrapperFactory<TOptions = any> = (options?: TOptions) => IGoogleMapsNativeObjectEmittingWrapper;