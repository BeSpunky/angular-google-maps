import { itShouldCreateWrapper                         } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsDataFactoryProvider, GoogleMapsData } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsDataFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsDataFactoryProvider, GoogleMapsData);
});
