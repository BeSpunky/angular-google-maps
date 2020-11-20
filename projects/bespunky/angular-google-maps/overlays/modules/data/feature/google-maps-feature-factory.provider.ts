import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDataDirective              } from '../directive/google-maps-data.directive';
import { GoogleMapsFeature                    } from './google-maps-feature';

/**
 * Produces a factory that can be used to create a new geometry feature wrapper for the specified map.
 *
 * @export
 * @param {GoogleMapsApiService} api The instance of the api service.
 * @param {GoogleMapsDataDirective} dataDirective The data directive the geometry feature was declared in.
 * @returns A factory function to use for creating a new geometry feature wrapper for the specified map.
 */
export function NativeFeatureWrapperFactoryProvider(api: GoogleMapsApiService, dataDirective: GoogleMapsDataDirective)
{
    return function NativeFeatureWrapperFactory(element: ElementRef, options?: google.maps.Data.FeatureOptions)
    {
        return new GoogleMapsFeature(api, dataDirective.wrapper, options);
    };
}

/** Provides the factory used to create a geometry feature wrapper for the `WrapperFactory` token. */
export const GoogleMapsFeatureFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeFeatureWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapsDataDirective]
}