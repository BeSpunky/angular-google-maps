import { GoogleMapsDataFactoryProvider } from './google-maps-data-factory.provider';
import { GoogleMapsData } from './google-maps-data';
import { itShouldCreateOverlayWrapper } from '../testing/overlay-wrapper-factory-provider-setup';

describe('GoogleMapsDataFactoryProvider', () =>
{
    itShouldCreateOverlayWrapper(GoogleMapsDataFactoryProvider, GoogleMapsData);
});
