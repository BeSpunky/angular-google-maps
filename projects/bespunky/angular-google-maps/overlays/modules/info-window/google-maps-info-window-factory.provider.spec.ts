import { itShouldCreateWrapper                                                                                } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsInfoWindowFactoryProvider, GoogleMapsInfoWindow, NativeGoogleMapsInfoWindowFactoryProvider } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsInfoWindowFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsInfoWindowFactoryProvider, GoogleMapsInfoWindow, NativeGoogleMapsInfoWindowFactoryProvider);
});