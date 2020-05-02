import { ElementRef } from '@angular/core';

import { itShouldCreateWrapper                                                        } from '@bespunky/angular-google-maps/core/testing';
import { MockGoogleMapWithOverlays, MockGoogleMapsData                                } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsComponentApiService                                                } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDataDirective, GoogleMapsFeatureFactoryProvider, GoogleMapsFeature } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsFeatureFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsFeatureFactoryProvider, GoogleMapsFeature, {
        provide   : GoogleMapsDataDirective,
        useFactory: (api, map, element) => new GoogleMapsDataDirective(api, () => new MockGoogleMapsData(map), element),
        deps      : [GoogleMapsComponentApiService, MockGoogleMapWithOverlays, ElementRef]
    });
});
