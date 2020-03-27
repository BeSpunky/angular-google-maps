import { BehaviorSubject } from 'rxjs';
import { FactoryProvider } from '@angular/core';

import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { WrapperFactory } from '../../core/abstraction/base/wrapper-factory.token';
import { ensureMapInstantiated } from '../../utils/utils';
import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsMarker } from './google-maps-marker';
import { CurrentMap } from '../../google-map/component/current-map.provider';

export function NativeMarkerWrapperFactoryProvider(api: GoogleMapsApiService, currentMap: BehaviorSubject<IGoogleMap>)
{
    return function NativeMarkerWrapperFactory(options?: google.maps.MarkerOptions)
    {
        ensureMapInstantiated(currentMap);

        return new GoogleMapsMarker(api, currentMap.value, options);
    };
}

export const GoogleMapsMarkerFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeMarkerWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, CurrentMap]
}