import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsPolygon } from './google-maps-polygon';

/**
 * Produces a factory that can be used to create a new polygon wrapper for the specified map.
 *
 * @export
 * @param {GoogleMapsApiService} api The instance of the api service.
 * @param {GoogleMapComponent} mapComponent The map component the polygon was declared in.
 * @returns A factory function to use for creating a new polygon wrapper for the specified map.
 */
export function NativePolygonWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativePolygonWrapperFactory(element: ElementRef, options?: google.maps.PolygonOptions)
    {
        return new GoogleMapsPolygon(api, mapComponent.wrapper, options);
    };
}

/** Provides the factory used to create a polygon wrapper for the `WrapperFactory` token. */
export const GoogleMapsPolygonFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativePolygonWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}