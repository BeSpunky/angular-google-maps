
import { GoogleMapComponent, createNativeFactoryProvider, createWrapperFactoryProvider } from '@bespunky/angular-google-maps/core';
import { GoogleMapsPolyline                                                              } from './google-maps-polyline';

/** Provides the factory used to create a polyline native for the `NativeFactory` token. */
export const NativeGoogleMapsPolylineFactoryProvider = createNativeFactoryProvider(() => new google.maps.Polyline());

/** Provides the factory used to create a polyline wrapper for the `WrapperInstance` token. */
export const GoogleMapsPolylineFactoryProvider = createWrapperFactoryProvider<GoogleMapsPolyline>((api, native, map: GoogleMapComponent) =>
{
    return new GoogleMapsPolyline(map.wrapper, api, native);
}, [GoogleMapComponent]);