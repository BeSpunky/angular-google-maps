import { testOverlayNativeFactoryProvider, testOverlayWrapperFactoryProvider                      } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsMarkerFactoryProvider, GoogleMapsMarker, NativeGoogleMapsMarkerFactoryProvider } from '@bespunky/angular-google-maps/overlays';

testOverlayNativeFactoryProvider({
    providerName      : 'NativeGoogleMapsMarkerFactoryProvider',
    provider          : NativeGoogleMapsMarkerFactoryProvider,
    expectedNativeType: google.maps.Marker
});

testOverlayWrapperFactoryProvider({
    providerName       : 'GoogleMapsMarkerFactoryProvider',
    provider           : GoogleMapsMarkerFactoryProvider,
    expectedWrapperType: GoogleMapsMarker
});