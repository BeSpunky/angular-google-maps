import { testOverlayNativeFactoryProvider                                   } from '@bespunky/angular-google-maps/overlays/testing';
import { NativeDirectionsService, NativeGoogleMapsDirectionsServiceProvider } from '@bespunky/angular-google-maps/directions';

testOverlayNativeFactoryProvider({
    providerName      : 'NativeGoogleMapsDirectionsServiceProvider',
    provider          : NativeGoogleMapsDirectionsServiceProvider,
    expectedNativeType: google.maps.DirectionsService,
    expectedToken     : NativeDirectionsService
});