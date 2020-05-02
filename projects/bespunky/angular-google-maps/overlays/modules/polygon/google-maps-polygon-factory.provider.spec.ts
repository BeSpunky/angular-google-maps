import { itShouldCreateWrapper } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsPolygonFactoryProvider } from './google-maps-polygon-factory.provider';
import { GoogleMapsPolygon                } from './google-maps-polygon';

describe('GoogleMapsPolygonFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsPolygonFactoryProvider, GoogleMapsPolygon);
});