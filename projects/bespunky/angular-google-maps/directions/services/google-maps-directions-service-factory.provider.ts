import { createNativeFactoryProvider } from '@bespunky/angular-google-maps/core';

export const NativeGoogleMapsDirectionsServiceFactoryProvider = createNativeFactoryProvider(() => new google.maps.DirectionsService());