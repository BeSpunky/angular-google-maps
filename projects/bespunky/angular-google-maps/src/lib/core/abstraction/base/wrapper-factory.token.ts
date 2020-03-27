import { InjectionToken } from '@angular/core';
import { NativeWrapperFactory, EmittingNativeWrapperFactory } from '../types/native-wrapper-provider.type';

export const WrapperFactory = new InjectionToken<NativeWrapperFactory | EmittingNativeWrapperFactory>('GoogleMaps.WrapperFactory');
