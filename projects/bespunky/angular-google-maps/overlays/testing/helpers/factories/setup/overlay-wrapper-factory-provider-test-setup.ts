import { FactoryProvider, ElementRef } from '@angular/core';

import { configWrapperProviderTestDefaults, MockGoogleMap, setupWrapperFactoryProviderTest, WrapperProviderTestConfig } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapComponent, GoogleMapsComponentApiService                                                            } from '@bespunky/angular-google-maps/core';

/**
 * Configures a testing module for overlay wrapper factories.
 * Used with `itShouldCreateWrapper()`.
 * 
 * @param {FactoryProvider} factoryProvider The wrapper factory provider to add to the testing module.
 * @param {...Provider[]} deps (Optional) Any dependencies needed by the provider.
 * @returns The extracted wrapper factory function created by the provider and the reference to the map element.
 */
export function setupOverlayWrapperFactoryProviderTest(factoryProvider: FactoryProvider, config?: WrapperProviderTestConfig)
{
    config = configWrapperProviderTestDefaults(config);

    // Add all the providers that an overlay requires
    config.providers.push(
        {
            provide : MockGoogleMap,
            useValue: new MockGoogleMap()
        },
        {
            provide   : GoogleMapComponent,
            useFactory: (api, map, element) => new GoogleMapComponent(api, map, element),
            deps      : [GoogleMapsComponentApiService, MockGoogleMap, ElementRef]
        },
        {
            provide : ElementRef,
            useValue: new ElementRef(document.createElement('div'))
        },
    );

    return setupWrapperFactoryProviderTest(factoryProvider, config)
}