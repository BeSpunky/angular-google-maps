import { ElementRef } from '@angular/core';

import { MockGoogleMap                                                                                                        } from '@bespunky/angular-google-maps/core/testing';
import { MockGoogleMapsData, testOverlayNativeFactoryProvider, testOverlayWrapperFactoryProvider                              } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsComponentApiService                                                                                        } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDataDirective, GoogleMapsFeatureFactoryProvider, GoogleMapsFeature, NativeGoogleMapsFeatureFactoryProvider } from '@bespunky/angular-google-maps/overlays';

testOverlayNativeFactoryProvider({
    providerName      : 'NativeGoogleMapsFeatureFactoryProvider',
    provider          : NativeGoogleMapsFeatureFactoryProvider,
    expectedNativeType: google.maps.Data.Feature
});

const DataDirectiveProvider = {
    provide   : GoogleMapsDataDirective,
    useFactory: (api, map, element) => new GoogleMapsDataDirective(api, new MockGoogleMapsData(map), element),
    deps      : [GoogleMapsComponentApiService, MockGoogleMap, ElementRef]
};

testOverlayWrapperFactoryProvider({
    providerName       : 'GoogleMapsFeatureFactoryProvider',
    provider           : GoogleMapsFeatureFactoryProvider,
    expectedWrapperType: GoogleMapsFeature,
    providers          : [DataDirectiveProvider]
});