import { testOverlayNativeFactoryProvider, testOverlayWrapperFactoryProvider                      } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsPolylineFactoryProvider, GoogleMapsPolyline, NativeGoogleMapsPolylineFactoryProvider } from '@bespunky/angular-google-maps/overlays';

testOverlayNativeFactoryProvider({
    providerName      : 'NativeGoogleMapsPolylineFactoryProvider',
    provider          : NativeGoogleMapsPolylineFactoryProvider,
    expectedNativeType: google.maps.Polyline
});

testOverlayWrapperFactoryProvider({
    providerName       : 'GoogleMapsPolylineFactoryProvider',
    provider           : GoogleMapsPolylineFactoryProvider,
    expectedWrapperType: GoogleMapsPolyline
});