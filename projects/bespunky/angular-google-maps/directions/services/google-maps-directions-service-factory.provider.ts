import { InjectionToken } from '@angular/core';
import { createNativeFactoryProvider } from '@bespunky/angular-google-maps/core';

/** An injection token used to provide the native `google.maps.DirectionsService`. Should be provided once, at root level. */
export const NativeDirectionsService = new InjectionToken<google.maps.DirectionsService>('GoogleMaps.NativeDirectionsService');

/** Provides the factory used to create a native `google.maps.DirectionsService` object the `NativeDirectionsService` token. Should be provided once, at root level. */
export const NativeGoogleMapsDirectionsServiceProvider = createNativeFactoryProvider(() => new google.maps.DirectionsService(), { token: NativeDirectionsService });
