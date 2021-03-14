import { itShouldCreateWrapper                                                                    } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsMarkerFactoryProvider, GoogleMapsMarker, NativeGoogleMapsMarkerFactoryProvider } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsMarkerFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsMarkerFactoryProvider, GoogleMapsMarker, NativeGoogleMapsMarkerFactoryProvider);
});