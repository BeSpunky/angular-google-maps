import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsPolygon } from './google-maps-polygon';

export function NativePolygonWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativePolygonWrapperFactory(element: ElementRef, options?: google.maps.PolygonOptions)
    {
        return new GoogleMapsPolygon(api, mapComponent.wrapper, options);
    };
}

export const GoogleMapsPolygonFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativePolygonWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}