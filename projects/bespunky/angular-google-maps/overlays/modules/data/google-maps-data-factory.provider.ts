import { FactoryProvider, ElementRef } from '@angular/core';

import { GoogleMapsApiService, WrapperFactory, GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { GoogleMapsData } from './google-maps-data';

/**
 * Produces a factory that can be used to create a new data layer wrapper for the specified map.
 *
 * @export
 * @param {GoogleMapsApiService} api The instance of the api service.
 * @param {GoogleMapComponent} mapComponent The map component the data layer was declared in.
 * @returns A factory function to use for creating a new data layer wrapper for the specified map.
 */
export function NativeDataWrapperFactoryProvider(api: GoogleMapsApiService, mapComponent: GoogleMapComponent)
{
    return function NativeDataWrapperFactory(element: ElementRef, options?: google.maps.Data.DataOptions)
    {        
        return new GoogleMapsData(api, mapComponent.wrapper, options);
    };
}

/** Provides the factory used to create a data layer wrapper for the `WrapperFactory` token. */
export const GoogleMapsDataFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeDataWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, GoogleMapComponent]
}