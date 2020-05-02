import { itShouldCreateWrapper                             } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsMarkerFactoryProvider, GoogleMapsMarker } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsMarkerFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsMarkerFactoryProvider, GoogleMapsMarker);
});