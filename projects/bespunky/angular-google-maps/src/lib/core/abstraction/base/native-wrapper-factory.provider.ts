import { InjectionToken } from '@angular/core';
import { NativeWrapperFactory, EmittingNativeWrapperFactory } from '../types/native-wrapper-provider.type';

export const NativeWrapperFactoryProvider = new InjectionToken<NativeWrapperFactory | EmittingNativeWrapperFactory>('GoogleMaps.NativeWrapperFactory');
