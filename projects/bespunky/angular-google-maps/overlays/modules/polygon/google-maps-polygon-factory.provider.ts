import { FactoryProvider } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { IGoogleMapWithOverlays } from '../map/i-google-map-with-overlays';
import { GoogleMapsPolygon      } from './google-maps-polygon';

export function NativePolygonWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativePolygonWrapperFactory(options?: google.maps.PolygonOptions)
    {
        return new GoogleMapsPolygon(api, mapComponent.wrapper as IGoogleMapWithOverlays, options);
    };
}

export const GoogleMapsPolygonFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativePolygonWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}