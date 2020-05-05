import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { IGoogleMapWithOverlays } from '../map/i-google-map-with-overlays';
import { GoogleMapsMarker       } from './google-maps-marker';

export function NativeMarkerWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativeMarkerWrapperFactory(element: ElementRef, options?: google.maps.MarkerOptions)
    {
        return new GoogleMapsMarker(api, mapComponent.wrapper as IGoogleMapWithOverlays, options);
    };
}

export const GoogleMapsMarkerFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeMarkerWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}