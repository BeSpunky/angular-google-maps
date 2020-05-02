import { GoogleMapsDataFactoryProvider } from './google-maps-data-factory.provider';
import { GoogleMapsData } from './google-maps-data';
import { itShouldCreateWrapper } from '../testing/wrapper-factory-provider-test-setup.spec';

describe('GoogleMapsDataFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsDataFactoryProvider, GoogleMapsData);
});
