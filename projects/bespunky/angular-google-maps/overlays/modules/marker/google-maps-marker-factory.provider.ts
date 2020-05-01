import { FactoryProvider } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsMarker } from './google-maps-marker';

export function NativeMarkerWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativeMarkerWrapperFactory(options?: google.maps.MarkerOptions)
    {
        return new GoogleMapsMarker(api, mapComponent.wrapper, options);
    };
}

export const GoogleMapsMarkerFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeMarkerWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}