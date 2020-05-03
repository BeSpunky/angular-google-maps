import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDataDirective              } from '../directive/google-maps-data.directive';
import { GoogleMapsFeature                    } from './google-maps-feature';


export function NativeFeatureWrapperFactoryProvider(api: GoogleMapsApiService, dataDirective: GoogleMapsDataDirective)
{
    return function NativeFeatureWrapperFactory(element: ElementRef, options?: google.maps.Data.FeatureOptions)
    {
        return new GoogleMapsFeature(api, dataDirective.wrapper, options);
    };
}

export const GoogleMapsFeatureFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeFeatureWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapsDataDirective]
}