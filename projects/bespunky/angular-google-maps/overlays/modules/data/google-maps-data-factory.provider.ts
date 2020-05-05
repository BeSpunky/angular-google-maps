import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsData } from './google-maps-data';

export function NativeDataWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativeDataWrapperFactory(element: ElementRef, options?: google.maps.Data.DataOptions)
    {        
        return new GoogleMapsData(api, mapComponent.wrapper, options);
    };
}

export const GoogleMapsDataFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeDataWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}