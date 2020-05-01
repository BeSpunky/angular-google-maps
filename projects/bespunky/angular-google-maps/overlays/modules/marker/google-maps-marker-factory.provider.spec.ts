import { GoogleMapsMarkerFactoryProvider } from './google-maps-marker-factory.provider';
import { GoogleMapsMarker } from './google-maps-marker';
import { itShouldCreateWrapper } from '../testing/wrapper-factory-provider-test-setup.spec';

describe('GoogleMapsMarkerFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsMarkerFactoryProvider, GoogleMapsMarker);
});