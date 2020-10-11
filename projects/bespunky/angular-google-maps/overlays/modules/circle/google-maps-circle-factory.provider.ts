import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsCircle } from './google-maps-circle';

export function NativeCircleWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativeCircleWrapperFactory(element: ElementRef, options?: google.maps.CircleOptions)
    {
        return new GoogleMapsCircle(api, mapComponent.wrapper, options);
    };
}

export const GoogleMapsCircleFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeCircleWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
};