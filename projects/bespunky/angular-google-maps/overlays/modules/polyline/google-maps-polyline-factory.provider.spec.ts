import { itShouldCreateWrapper                                                                          } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsPolylineFactoryProvider, GoogleMapsPolyline, NativeGoogleMapsPolylineFactoryProvider } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsPolylineFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsPolylineFactoryProvider, GoogleMapsPolyline, NativeGoogleMapsPolylineFactoryProvider);
});