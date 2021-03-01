import { itShouldCreateWrapper                             } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsDirectionsFactoryProvider, GoogleMapsDirections } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsDirectionsFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsDirectionsFactoryProvider, GoogleMapsDirections);
});