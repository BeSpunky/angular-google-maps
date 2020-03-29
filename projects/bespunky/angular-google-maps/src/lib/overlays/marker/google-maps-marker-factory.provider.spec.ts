import { GoogleMapsMarkerFactoryProvider } from './google-maps-marker-factory.provider';
import { GoogleMapsMarker } from './google-maps-marker';
import { itShouldCreateOverlayWrapper } from '../testing/overlay-wrapper-factory-provider-setup';

describe('GoogleMapsMarkerFactoryProvider', () =>
{
    itShouldCreateOverlayWrapper(GoogleMapsMarkerFactoryProvider, GoogleMapsMarker);
});