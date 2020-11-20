import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsInfoWindow } from './google-maps-info-window';

/**
 * Produces a factory that can be used to create a new info window wrapper for the specified map.
 *
 * @export
 * @param {GoogleMapsApiService} api The instance of the api service.
 * @param {GoogleMapComponent} mapComponent The map component the info window was declared in.
 * @returns A factory function to use for creating a new info window wrapper for the specified map.
 */
export function NativeInfoWindowWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativeInfoWindowWrapperFactory(element: ElementRef, options?: google.maps.InfoWindowOptions)
    {
        return new GoogleMapsInfoWindow(api, mapComponent.wrapper, options);
    };
}

/** Provides the factory used to create an info window wrapper for the `WrapperFactory` token. */
export const GoogleMapsInfoWindowFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeInfoWindowWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}