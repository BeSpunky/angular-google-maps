import { FactoryProvider } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { IGoogleMapWithOverlays } from '../map/i-google-map-with-overlays';
import { GoogleMapsData         } from './google-maps-data';

export function NativeDataWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativeDataWrapperFactory(options?: google.maps.Data.DataOptions)
    {        
        return new GoogleMapsData(api, mapComponent.wrapper as IGoogleMapWithOverlays, options);
    };
}

export const GoogleMapsDataFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeDataWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}