import { testOverlayNativeFactoryProvider, testOverlayWrapperFactoryProvider                      } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsCircleFactoryProvider, GoogleMapsCircle, NativeGoogleMapsCircleFactoryProvider } from '@bespunky/angular-google-maps/overlays';

testOverlayNativeFactoryProvider({
    providerName      : 'NativeGoogleMapsCircleFactoryProvider',
    provider          : NativeGoogleMapsCircleFactoryProvider,
    expectedNativeType: google.maps.Circle
});

testOverlayWrapperFactoryProvider({
    providerName       : 'GoogleMapsCircleFactoryProvider',
    provider           : GoogleMapsCircleFactoryProvider,
    expectedWrapperType: GoogleMapsCircle
});