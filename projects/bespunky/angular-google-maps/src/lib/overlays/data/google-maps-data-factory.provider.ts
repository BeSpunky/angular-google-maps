import { BehaviorSubject } from 'rxjs';
import { FactoryProvider } from '@angular/core';

import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { ensureMapInstantiated } from '../../utils/utils';
import { WrapperFactory } from '../../core/abstraction/tokens/wrapper-factory.token';
import { CurrentMap } from '../../core/abstraction/tokens/current-map.token';
import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsData } from './google-maps-data';

export function NativeDataWrapperFactoryProvider(api: GoogleMapsApiService, currentMap: BehaviorSubject<IGoogleMap>)
{
    return function NativeDataWrapperFactory(options?: google.maps.Data.DataOptions)
    {
        ensureMapInstantiated(currentMap);
        
        return new GoogleMapsData(api, currentMap.value, options);
    };
}

export const GoogleMapsDataFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeDataWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, CurrentMap]
}