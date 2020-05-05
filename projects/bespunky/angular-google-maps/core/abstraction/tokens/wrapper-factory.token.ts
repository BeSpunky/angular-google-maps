import { InjectionToken } from '@angular/core';

import { IGoogleMapsNativeObjectWrapper                     } from '../base/i-google-maps-native-object-wrapper';
import { IGoogleMapsNativeObjectEmittingWrapper             } from '../base/i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsNativeObject                            } from '../native/i-google-maps-native-object';
import { NativeWrapperFactory, EmittingNativeWrapperFactory } from '../types/abstraction';

/**
 * An injection token used by `GoogleMapsLifecycleBase` and its extending classes to specify the factory that will be used to
 * create a new wrapper object of the type corresponding to the extending class.
 * 
 * Components and directives extending `GoogleMapsLifecycleBase` should define a `FactoryProvider` for this token.
 */
export const WrapperFactory = new InjectionToken<NativeWrapperFactory<IGoogleMapsNativeObjectWrapper<IGoogleMapsNativeObject>> | EmittingNativeWrapperFactory<IGoogleMapsNativeObjectEmittingWrapper<IGoogleMapsNativeObject>>>('GoogleMaps.WrapperFactory');
