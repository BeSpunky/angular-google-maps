import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDirections                                     } from './google-maps-directions';

/**
 * Produces a factory that can be used to create a new directions wrapper for the specified map.
 *
 * @export
 * @param {GoogleMapsApiService} api The instance of the api service.
 * @param {GoogleMapComponent} mapComponent The map component the directions was declared in.
 * @returns A factory function to use for creating a new directions wrapper for the specified map.
 */
export function NativeDirectionsWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativeDirectionsWrapperFactory(element: ElementRef, options?: google.maps.DirectionsRendererOptions)
    {
        return new GoogleMapsDirections(api, mapComponent.wrapper, options);
    };
}

/** Provides the factory used to create a directions wrapper for the `WrapperFactory` token. */
export const GoogleMapsDirectionsFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeDirectionsWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
};