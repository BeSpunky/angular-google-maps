import { TestBed                                     } from '@angular/core/testing';
import { FactoryProvider, Type, Provider, ElementRef } from '@angular/core';

import { configureGoogleMapsTestingModule                                                   } from '@bespunky/angular-google-maps/async/testing';
import { GoogleMapComponent, GoogleMapsComponentApiService, WrapperFactory, EmittingWrapper } from '@bespunky/angular-google-maps/core';
import { MockGoogleMap                                                                      } from '../mocks/modules/mock-google-map';

/**
 * Configures a testing module for overlay wrapper factories.
 * Used with `itShouldCreateWrapper()`.
 * 
 * @param {FactoryProvider} factoryProvider The wrapper factory provider to add to the testing module.
 * @param {...Provider[]} deps (Optional) Any dependencies needed by the provider.
 * @returns The extracted wrapper factory function created by the provider and the reference to the map element.
 */
function setupOverlayWrapperFactoryProviderTest(factoryProvider: FactoryProvider, ...deps: Provider[])
{
    configureGoogleMapsTestingModule({
        customize: (def) =>
        {
            def.providers.push({
                provide : MockGoogleMap,
                useValue: new MockGoogleMap()
            });
            def.providers.push({
                provide   : GoogleMapComponent,
                useFactory: (api, map, element) => new GoogleMapComponent(api, () => map, element),
                deps      : [GoogleMapsComponentApiService, MockGoogleMap, ElementRef]
            });
            def.providers.push({
                provide : ElementRef,
                useValue: new ElementRef(document.createElement('div'))
            });
            def.providers.push(...deps, factoryProvider);
        }
    });

    return {
        createWrapper: TestBed.inject(WrapperFactory),
        element      : TestBed.inject(ElementRef)
    };
}

/**
 * Produces a spec that tests the specified wrapper factory provider.
 * The provider is expected to provide a function returning a wrapper object of the specified type.
 *
 * @export
 * @param {FactoryProvider} factoryProvider The wrapper factory provider to test.
 * @param {Type<EmittingWrapper>} wrapperType The type of wrapper expected out of the factory.
 * @param {...Provider[]} deps (Optional) Any dependencies needed by the provider.
 */
export function itShouldCreateWrapper(factoryProvider: FactoryProvider, wrapperType: Type<EmittingWrapper>, ...deps: Provider[])
{
    it(`should allow the creation of a new ${wrapperType.name} object when injected`, () =>
    {
        const { createWrapper, element } = setupOverlayWrapperFactoryProviderTest(factoryProvider, ...deps);

        expect(createWrapper instanceof Function).toBeTruthy();
        expect(createWrapper(element) instanceof wrapperType).toBeTruthy();
    });
}
