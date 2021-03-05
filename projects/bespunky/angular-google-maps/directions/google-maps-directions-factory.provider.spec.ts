import { itShouldCreateWrapper                                     } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsDirectionsFactoryProvider, GoogleMapsDirections } from '@bespunky/angular-google-maps/directions';

describe('GoogleMapsDirectionsFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsDirectionsFactoryProvider, GoogleMapsDirections);
});