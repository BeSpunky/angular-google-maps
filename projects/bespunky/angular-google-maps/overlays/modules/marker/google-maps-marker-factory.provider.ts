import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsMarker } from './google-maps-marker';

/**
 * Produces a factory that can be used to create a new marker wrapper for the specified map.
 *
 * @export
 * @param {GoogleMapsApiService} api The instance of the api service.
 * @param {GoogleMapComponent} mapComponent The map component the marker was declared in.
 * @returns A factory function to use for creating a new marker wrapper for the specified map.
 */
export function NativeMarkerWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativeMarkerWrapperFactory(element: ElementRef, options?: google.maps.MarkerOptions)
    {
        return new GoogleMapsMarker(api, mapComponent.wrapper, options);
    };
}

/** Provides the factory used to create a marker wrapper for the `WrapperFactory` token. */
export const GoogleMapsMarkerFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeMarkerWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}