import { testOverlayNativeFactoryProvider, testOverlayWrapperFactoryProvider                      } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsDataFactoryProvider, GoogleMapsData, NativeGoogleMapsDataFactoryProvider } from '@bespunky/angular-google-maps/overlays';

testOverlayNativeFactoryProvider({
    providerName      : 'NativeGoogleMapsDataFactoryProvider',
    provider          : NativeGoogleMapsDataFactoryProvider,
    expectedNativeType: google.maps.Data
});

testOverlayWrapperFactoryProvider({
    providerName       : 'GoogleMapsDataFactoryProvider',
    provider           : GoogleMapsDataFactoryProvider,
    expectedWrapperType: GoogleMapsData
});