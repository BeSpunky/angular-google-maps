import { InjectionToken } from '@angular/core';
import { NativeWrapperFactory, EmittingNativeWrapperFactory } from '../types/native-wrapper-provider.type';
import { IGoogleMapsNativeObjectWrapper } from '../base/i-google-maps-native-object-wrapper';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../base/i-google-maps-native-object-emitting-wrapper';

/**
 * An injection token used by `GoogleMapsLifecycleBase` and its extending classes to specify the factory that will be used to
 * create a new wrapper object of the type corresponding to the extending class.
 * 
 * Components and directives extending `GoogleMapsLifecycleBase` should define a `FactoryProvider` for this token.
 */
export const WrapperFactory = new InjectionToken<NativeWrapperFactory<IGoogleMapsNativeObjectWrapper> | EmittingNativeWrapperFactory<IGoogleMapsNativeObjectEmittingWrapper>>('GoogleMaps.WrapperFactory');
