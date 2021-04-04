
import { GoogleMapComponent, createWrapperFactoryProvider, createNativeFactoryProvider } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDirections                                     } from './google-maps-directions';

/** Provides the factory used to create a native directions object for the `NativeInstance` token. */
export const NativeGoogleMapsDirectionsFactoryProvider = createNativeFactoryProvider(() => new google.maps.DirectionsRenderer());

/** Provides the factory used to create a directions wrapper for the `WrapperInstance` token. */
export const GoogleMapsDirectionsFactoryProvider = createWrapperFactoryProvider(
    (api, native, map) => new GoogleMapsDirections(map, api, native as google.maps.DirectionsRenderer),
    { deps: [GoogleMapComponent] }
);
