
import { GoogleMapComponent, createNativeFactoryProvider, createWrapperFactoryProvider } from '@bespunky/angular-google-maps/core';
import { GoogleMapsData                                                                } from './google-maps-data';

/** Provides the factory used to create a data native for the `NativeFactory` token. */
export const NativeGoogleMapsDataFactoryProvider = createNativeFactoryProvider(() => new google.maps.Data());

/** Provides the factory used to create a data wrapper for the `WrapperInstance` token. */
export const GoogleMapsDataFactoryProvider = createWrapperFactoryProvider<GoogleMapsData>((api, native, map: GoogleMapComponent) =>
{
    return new GoogleMapsData(map.wrapper, api, native);
}, [GoogleMapComponent]);