import { BehaviorSubject } from 'rxjs';
import { FactoryProvider } from '@angular/core';

import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { ensureMapInstantiated } from '../../utils/utils';
import { NativeWrapperFactoryProvider } from '../../core/abstraction/base/native-wrapper-factory.provider';
import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsData } from './google-maps-data';
import { CurrentMap } from '../../google-map/component/current-map.provider';

export function NativeDataWrapperFactoryProvider(api: GoogleMapsApiService, currentMap: BehaviorSubject<IGoogleMap>)
{
    return function NativeDataWrapperFactory(options?: google.maps.Data.DataOptions)
    {
        ensureMapInstantiated(currentMap);

        return new GoogleMapsData(api, currentMap.value, options);
    };
}

export const GoogleMapsDataFactoryProvider: FactoryProvider = {
    provide   : NativeWrapperFactoryProvider,
    useFactory: NativeDataWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, CurrentMap]
}