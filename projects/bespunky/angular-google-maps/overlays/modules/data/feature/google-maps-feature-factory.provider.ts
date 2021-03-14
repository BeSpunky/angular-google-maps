
import { createNativeFactoryProvider, createWrapperFactoryProvider } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDataDirective                                   } from '../directive/google-maps-data.directive';
import { GoogleMapsFeature                                         } from './google-maps-feature';

/** Provides the factory used to create a feature native for the `NativeFactory` token. */
export const NativeGoogleMapsFeatureFactoryProvider = createNativeFactoryProvider(() => new google.maps.Data.Feature());

/** Provides the factory used to create a feature wrapper for the `WrapperInstance` token. */
export const GoogleMapsFeatureFactoryProvider = createWrapperFactoryProvider<GoogleMapsFeature>((api, native, data: GoogleMapsDataDirective) =>
{
    return new GoogleMapsFeature(data.wrapper, api, native);
}, [GoogleMapsDataDirective]);