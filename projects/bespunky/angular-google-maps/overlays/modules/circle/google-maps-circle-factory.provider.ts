
import { GoogleMapComponent, createNativeFactoryProvider, createWrapperFactoryProvider } from '@bespunky/angular-google-maps/core';
import { GoogleMapsCircle                                                              } from './google-maps-circle';

/** Provides the factory used to create a circle native for the `NativeFactory` token. */
export const NativeGoogleMapsCircleFactoryProvider = createNativeFactoryProvider(() => new google.maps.Circle());

/** Provides the factory used to create a circle wrapper for the `WrapperInstance` token. */
export const GoogleMapsCircleFactoryProvider = createWrapperFactoryProvider<GoogleMapsCircle>((api, native, map: GoogleMapComponent) =>
{
    return new GoogleMapsCircle(map.wrapper, api, native);
}, { deps: [GoogleMapComponent] });
