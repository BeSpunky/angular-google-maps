import { ElementRef } from '@angular/core';

import { itShouldCreateWrapper                                                        } from '@bespunky/angular-google-maps/core/testing';
import { MockGoogleMap                                                                } from '@bespunky/angular-google-maps/core/testing';
import { MockGoogleMapsData                                                           } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsComponentApiService                                                } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDataDirective, GoogleMapsFeatureFactoryProvider, GoogleMapsFeature } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsFeatureFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsFeatureFactoryProvider, GoogleMapsFeature,
        {
            provide   : GoogleMapsDataDirective,
            useFactory: (api, map, element) => new GoogleMapsDataDirective(api, () => new MockGoogleMapsData(map), element),
            deps      : [GoogleMapsComponentApiService, MockGoogleMap, ElementRef]
        },
        { provide: MockGoogleMap, useValue: new MockGoogleMap() }
    );
});
