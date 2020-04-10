import { FactoryProvider } from '@angular/core';

import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { WrapperFactory } from '../../core/abstraction/tokens/wrapper-factory.token';
import { GoogleMapsPolygon } from './google-maps-polygon';
import { GoogleMapComponent } from '../../google-map/component/google-map.component';

export function NativePolygonWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativePolygonWrapperFactory(options?: google.maps.PolygonOptions)
    {
        return new GoogleMapsPolygon(api, mapComponent.wrapper, options);
    };
}

export const GoogleMapsPolygonFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativePolygonWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}