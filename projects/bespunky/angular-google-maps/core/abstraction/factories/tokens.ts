import { InjectionToken } from '@angular/core';

import { Native, Wrapper } from '../types/abstraction';

/**
 * An injection token used by `GoogleMapsComponentBase` and its extending classes to specify the factory that will be used to
 * create a new native object of the type corresponding to the extending class.
 * 
 * Components and directives extending `GoogleMapsComponentBase` should define a `FactoryProvider` for this token.
 */
export const NativeInstance = new InjectionToken<Native>('GoogleMaps.NativeInstance');
/**
 * An injection token used by `GoogleMapsComponentBase` and its extending classes to specify the factory that will be used to
 * create a new wrapper object of the type corresponding to the extending class.
 * 
 * Components and directives extending `GoogleMapsComponentBase` should define a `FactoryProvider` for this token.
 */
export const WrapperInstance = new InjectionToken<Wrapper>('GoogleMaps.WrapperInstance');
