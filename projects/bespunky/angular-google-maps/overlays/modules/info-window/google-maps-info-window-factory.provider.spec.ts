import { itShouldCreateWrapper                                     } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsInfoWindowFactoryProvider, GoogleMapsInfoWindow } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsInfoWindowFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsInfoWindowFactoryProvider, GoogleMapsInfoWindow);
});