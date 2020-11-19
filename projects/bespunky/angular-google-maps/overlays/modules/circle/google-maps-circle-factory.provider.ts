import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsCircle } from './google-maps-circle';

/**
 * Produces a factory that can be used to create a new circle wrapper for the specified map.
 *
 * @export
 * @param {GoogleMapsApiService} api The instance of the api service.
 * @param {GoogleMapComponent} mapComponent The map component the circle was declared in.
 * @returns A factory function to use for creating a new circle wrapper for the specified map.
 */
export function NativeCircleWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativeCircleWrapperFactory(element: ElementRef, options?: google.maps.CircleOptions)
    {
        return new GoogleMapsCircle(api, mapComponent.wrapper, options);
    };
}

/** Provides the factory used to create a circle wrapper for the `WrapperFactory` token. */
export const GoogleMapsCircleFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeCircleWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
};