import { itShouldCreateWrapper                               } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsPolygonFactoryProvider, GoogleMapsPolygon } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsPolygonFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsPolygonFactoryProvider, GoogleMapsPolygon);
});