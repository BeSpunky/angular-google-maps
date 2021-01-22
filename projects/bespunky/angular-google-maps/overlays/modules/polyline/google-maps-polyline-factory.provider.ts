import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsPolyline } from './google-maps-polyline';

/**
 * Produces a factory that can be used to create a new polyline wrapper for the specified map.
 *
 * @export
 * @param {GoogleMapsApiService} api The instance of the api service.
 * @param {GoogleMapComponent} mapComponent The map component the polyline was declared in.
 * @returns A factory function to use for creating a new polyline wrapper for the specified map.
 */
export function NativePolylineWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativePolylineWrapperFactory(element: ElementRef, options?: google.maps.PolylineOptions)
    {
        return new GoogleMapsPolyline(api, mapComponent.wrapper, options);
    };
}

/** Provides the factory used to create a polyline wrapper for the `WrapperFactory` token. */
export const GoogleMapsPolylineFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativePolylineWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}