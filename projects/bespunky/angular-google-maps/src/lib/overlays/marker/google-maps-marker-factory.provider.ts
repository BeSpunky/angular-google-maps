import { BehaviorSubject } from 'rxjs';
import { FactoryProvider } from '@angular/core';

import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { WrapperFactory } from '../../core/abstraction/tokens/wrapper-factory.token';
import { CurrentMap } from '../../core/abstraction/tokens/current-map.token';
import { ensureMapInstantiated } from '../../utils/utils';
import { IGoogleMap } from '../../google-map/i-google-map';
import { GoogleMapsMarker } from './google-maps-marker';

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