import { FactoryProvider } from '@angular/core';

import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { WrapperFactory } from '../../core/abstraction/tokens/wrapper-factory.token';
import { GoogleMapsData } from './google-maps-data';
import { GoogleMapComponent } from '../../google-map/component/google-map.component';

export function NativeDataWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativeDataWrapperFactory(options?: google.maps.Data.DataOptions)
    {        
        return new GoogleMapsData(api, mapComponent.map, options);
    };
}

export const GoogleMapsDataFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeDataWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}