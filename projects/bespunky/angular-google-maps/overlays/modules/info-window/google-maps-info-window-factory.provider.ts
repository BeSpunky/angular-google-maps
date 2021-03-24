
import { GoogleMapComponent, createNativeFactoryProvider, createWrapperFactoryProvider } from '@bespunky/angular-google-maps/core';
import { GoogleMapsInfoWindow                                                          } from './google-maps-info-window';

/** Provides the factory used to create an info window native for the `NativeFactory` token. */
export const NativeGoogleMapsInfoWindowFactoryProvider = createNativeFactoryProvider(() => new google.maps.InfoWindow());

/** Provides the factory used to create an info window wrapper for the `WrapperInstance` token. */
export const GoogleMapsInfoWindowFactoryProvider = createWrapperFactoryProvider<GoogleMapsInfoWindow>((api, native, map: GoogleMapComponent) =>
{
    return new GoogleMapsInfoWindow(map.wrapper, api, native);
}, { deps: [GoogleMapComponent] });