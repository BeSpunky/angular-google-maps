import { itShouldCreateWrapper                             } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsCircleFactoryProvider, GoogleMapsCircle } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsCircleFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsCircleFactoryProvider, GoogleMapsCircle);
});