import { ElementRef } from '@angular/core';

import { MockGoogleMap                                                                } from '@bespunky/angular-google-maps/core/testing';
import { MockGoogleMapsData, produceOverlayWrapperFactoryProviderSpecs                } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsComponentApiService                                                } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDataDirective, GoogleMapsFeatureFactoryProvider, GoogleMapsFeature } from '@bespunky/angular-google-maps/overlays';

const DataDirectiveProvider = {
    provide   : GoogleMapsDataDirective,
    useFactory: (api, map, element) => new GoogleMapsDataDirective(api, new MockGoogleMapsData(map), element),
    deps      : [GoogleMapsComponentApiService, MockGoogleMap, ElementRef]
};

produceOverlayWrapperFactoryProviderSpecs('GoogleMapsFeatureFactoryProvider', GoogleMapsFeatureFactoryProvider, GoogleMapsFeature, DataDirectiveProvider);