import { testOverlayNativeFactoryProvider, testOverlayWrapperFactoryProvider                      } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsInfoWindowFactoryProvider, GoogleMapsInfoWindow, NativeGoogleMapsInfoWindowFactoryProvider } from '@bespunky/angular-google-maps/overlays';

testOverlayNativeFactoryProvider({
    providerName      : 'NativeGoogleMapsInfoWindowFactoryProvider',
    provider          : NativeGoogleMapsInfoWindowFactoryProvider,
    expectedNativeType: google.maps.InfoWindow
});

testOverlayWrapperFactoryProvider({
    providerName       : 'GoogleMapsInfoWindowFactoryProvider',
    provider           : GoogleMapsInfoWindowFactoryProvider,
    expectedWrapperType: GoogleMapsInfoWindow
});