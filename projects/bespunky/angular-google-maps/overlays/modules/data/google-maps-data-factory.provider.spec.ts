import { itShouldCreateWrapper                                                              } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsDataFactoryProvider, GoogleMapsData, NativeGoogleMapsDataFactoryProvider } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsDataFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapsDataFactoryProvider, GoogleMapsData, NativeGoogleMapsDataFactoryProvider);
});
