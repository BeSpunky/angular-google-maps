import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsInfoWindow } from './google-maps-info-window';

export function NativeInfoWindowWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativeInfoWindowWrapperFactory(element: ElementRef, options?: google.maps.InfoWindowOptions)
    {
        return new GoogleMapsInfoWindow(api, mapComponent.wrapper, options);
    };
}

export const GoogleMapsInfoWindowFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeInfoWindowWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}