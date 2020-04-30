import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';
import { IGoogleMapsNativeDrawableOverlay } from '../../../../../overlays/abstraction/native/i-google-maps-native-drawable-overlay';
import { IGoogleMapsNativeObjectWrapper } from '../base/i-google-maps-native-object-wrapper';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../base/i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsDrawableOverlay } from '../../../../../overlays/abstraction/base/i-google-maps-drawable-overlay';

export type Wrapper         = IGoogleMapsNativeObjectWrapper<IGoogleMapsNativeObject>
export type EmittingWrapper = IGoogleMapsNativeObjectEmittingWrapper<IGoogleMapsNativeObject>;

/** Represents functions which can be used to instantiate a native Google Maps object wrapper. */
export type NativeWrapperFactory<TWrapper extends IGoogleMapsNativeObjectWrapper<IGoogleMapsNativeObject>, TOptions = any> = (options?: TOptions) => TWrapper;
/** Represents functions which can be used to instantiate a native Google Maps object wrapper which emits events. */
export type EmittingNativeWrapperFactory<TWrapper extends IGoogleMapsNativeObjectEmittingWrapper<IGoogleMapsNativeObject>, TOptions = any> = (options?: TOptions) => TWrapper;
