import { FactoryProvider } from '@angular/core';

import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { WrapperFactory } from '../../core/abstraction/tokens/wrapper-factory.token';
import { GoogleMapsMarker } from './google-maps-marker';
import { GoogleMapComponent } from '../../google-map/component/google-map.component';

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