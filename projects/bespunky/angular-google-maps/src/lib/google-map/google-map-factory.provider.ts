import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { ElementRef, FactoryProvider } from '@angular/core';
import { GoogleMap } from './google-map';
import { NativeWrapperFactoryProvider } from '../core/abstraction/base/native-wrapper-factory.provider';

export function NativeMapWrapperFactoryProvider(api: GoogleMapsApiService, element: ElementRef)
{
    return function NativeMapWrapperFactory(options?: google.maps.MapOptions)
    {
        return new GoogleMap(api, element, options);
    };
}

export const GoogleMapFactoryProvider: FactoryProvider = {
    provide   : NativeWrapperFactoryProvider,
    useFactory: NativeMapWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, ElementRef]
}