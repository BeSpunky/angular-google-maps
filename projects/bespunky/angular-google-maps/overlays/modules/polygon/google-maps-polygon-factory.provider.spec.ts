import { itShouldCreateWrapper                                                                       } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsPolygonFactoryProvider, GoogleMapsPolygon, NativeGoogleMapsPolygonFactoryProvider } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsPolygonFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsPolygonFactoryProvider, GoogleMapsPolygon, NativeGoogleMapsPolygonFactoryProvider);
});