import { itShouldCreateWrapper } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsMarkerFactoryProvider } from './google-maps-marker-factory.provider';
import { GoogleMapsMarker                } from './google-maps-marker';

describe('GoogleMapsMarkerFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsMarkerFactoryProvider, GoogleMapsMarker);
});