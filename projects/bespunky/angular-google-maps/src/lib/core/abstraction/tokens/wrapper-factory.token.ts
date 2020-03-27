import { InjectionToken } from '@angular/core';
import { NativeWrapperFactory, EmittingNativeWrapperFactory } from '../types/native-wrapper-provider.type';

/**
 * An injection token used by `GoogleMapsLifecycleBase` and its extending classes to specify the factory that will be used to
 * create a new wrapper object of the type corresponding to the extending class.
 * 
 * Components and directives extending `GoogleMapsLifecycleBase` should define a `FactoryProvider` for this token.
 */
export const WrapperFactory = new InjectionToken<NativeWrapperFactory | EmittingNativeWrapperFactory>('GoogleMaps.WrapperFactory');
