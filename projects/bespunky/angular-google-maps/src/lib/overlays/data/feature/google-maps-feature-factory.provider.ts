import { FactoryProvider } from '@angular/core';

import { GoogleMapsFeature } from './google-maps-feature';
import { WrapperFactory } from '../../../core/abstraction/tokens/wrapper-factory.token';
import { GoogleMapsApiService } from '../../../core/api/google-maps-api.service';
import { GoogleMapsDataDirective } from '../directive/google-maps-data.directive';


export function NativeFeatureWrapperFactoryProvider(api: GoogleMapsApiService, dataDirective: GoogleMapsDataDirective)
{
    return function NativeFeatureWrapperFactory(options?: google.maps.Data.FeatureOptions)
    {
        return new GoogleMapsFeature(api, dataDirective.wrapper, options);
    };
}

export const GoogleMapsFeatureFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeFeatureWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapsDataDirective]
}