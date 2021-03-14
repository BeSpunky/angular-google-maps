import { itShouldCreateWrapper                                                                    } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsCircleFactoryProvider, GoogleMapsCircle, NativeGoogleMapsCircleFactoryProvider } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsCircleFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsCircleFactoryProvider, GoogleMapsCircle, NativeGoogleMapsCircleFactoryProvider);
});