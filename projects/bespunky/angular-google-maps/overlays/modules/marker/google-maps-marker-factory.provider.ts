
import { GoogleMapComponent, createNativeFactoryProvider, createWrapperFactoryProvider } from '@bespunky/angular-google-maps/core';
import { GoogleMapsMarker                                                              } from './google-maps-marker';

/** Provides the factory used to create a marker native for the `NativeFactory` token. */
export const NativeGoogleMapsMarkerFactoryProvider = createNativeFactoryProvider(() => new google.maps.Marker());

/** Provides the factory used to create a marker wrapper for the `WrapperInstance` token. */
export const GoogleMapsMarkerFactoryProvider = createWrapperFactoryProvider<GoogleMapsMarker>((api, native, map: GoogleMapComponent) =>
{
    return new GoogleMapsMarker(map.wrapper, api, native);
}, [GoogleMapComponent]);