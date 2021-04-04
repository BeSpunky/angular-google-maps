import { testOverlayNativeFactoryProvider, testOverlayWrapperFactoryProvider                                  } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsDirectionsFactoryProvider, GoogleMapsDirections, NativeGoogleMapsDirectionsFactoryProvider } from '@bespunky/angular-google-maps/directions';

testOverlayNativeFactoryProvider({
    providerName      : 'NativeGoogleMapsDirectionsFactoryProvider',
    provider          : NativeGoogleMapsDirectionsFactoryProvider,
    expectedNativeType: google.maps.DirectionsRenderer,
});

testOverlayWrapperFactoryProvider({
    providerName       : 'GoogleMapsDirectionsFactoryProvider',
    provider           : GoogleMapsDirectionsFactoryProvider,
    expectedWrapperType: GoogleMapsDirections
});