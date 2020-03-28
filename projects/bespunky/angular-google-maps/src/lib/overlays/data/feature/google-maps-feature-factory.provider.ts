import { FactoryProvider } from '@angular/core';

import { GoogleMapsFeature } from './google-maps-feature';
import { WrapperFactory } from '../../../core/abstraction/tokens/wrapper-factory.token';
import { GoogleMapsApiService } from '../../../core/api/google-maps-api.service';
import { IGoogleMapsData } from '../i-google-maps-data';
import { GoogleMapsData } from '../google-maps-data';


export function NativeFeatureWrapperFactoryProvider(api: GoogleMapsApiService, data: IGoogleMapsData)
{
    return function NativeFeatureWrapperFactory(options?: google.maps.Data.FeatureOptions)
    {
        return new GoogleMapsFeature(api, data, options);
    };
}

export const GoogleMapsFeatureFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeFeatureWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapsData]
}