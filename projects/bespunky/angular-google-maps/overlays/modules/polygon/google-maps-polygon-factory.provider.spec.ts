import { GoogleMapsPolygonFactoryProvider } from './google-maps-polygon-factory.provider';
import { GoogleMapsPolygon } from './google-maps-polygon';
import { itShouldCreateWrapper } from '../testing/wrapper-factory-provider-test-setup.spec';

describe('GoogleMapsPolygonFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsPolygonFactoryProvider, GoogleMapsPolygon);
});