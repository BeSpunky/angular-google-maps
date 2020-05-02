import { itShouldCreateWrapper } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsDataFactoryProvider } from './google-maps-data-factory.provider';
import { GoogleMapsData                } from './google-maps-data';

describe('GoogleMapsDataFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsDataFactoryProvider, GoogleMapsData);
});
