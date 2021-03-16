import { testOverlayNativeFactoryProvider, testOverlayWrapperFactoryProvider                      } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsPolygonFactoryProvider, GoogleMapsPolygon, NativeGoogleMapsPolygonFactoryProvider } from '@bespunky/angular-google-maps/overlays';

testOverlayNativeFactoryProvider({
    providerName      : 'NativeGoogleMapsPolygonFactoryProvider',
    provider          : NativeGoogleMapsPolygonFactoryProvider,
    expectedNativeType: google.maps.Polygon
});

testOverlayWrapperFactoryProvider({
    providerName       : 'GoogleMapsPolygonFactoryProvider',
    provider           : GoogleMapsPolygonFactoryProvider,
    expectedWrapperType: GoogleMapsPolygon
});