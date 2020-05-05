import { TestBed                                     } from '@angular/core/testing';
import { FactoryProvider, Type, Provider, ElementRef } from '@angular/core';

import { configureGoogleMapsTestingModule                                                                       } from '@bespunky/angular-google-maps/async/testing';
import { GoogleMapComponent, GoogleMapsComponentApiService, WrapperFactory, EmittingWrapper, SuperpowersService } from '@bespunky/angular-google-maps/core';
import { MockGoogleMap                                                                                          } from '../mocks/modules/mock-google-map.spec';

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
                provide: SuperpowersService,
                useValue: new SuperpowersService([])
            });
            def.providers.push({
                provide   : GoogleMapComponent,
                useFactory: (api, map, element, superpowers) => new GoogleMapComponent(api, () => map, element, superpowers),
                deps      : [GoogleMapsComponentApiService, MockGoogleMap, ElementRef, SuperpowersService]
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

export function itShouldCreateWrapper(factoryProvider: FactoryProvider, wrapperType: Type<EmittingWrapper>, ...deps: Provider[])
{
    it(`should allow the creation of a new ${wrapperType.name} object when injected`, () =>
    {
        const { createWrapper, element } = setupOverlayWrapperFactoryProviderTest(factoryProvider, ...deps);

        expect(createWrapper instanceof Function).toBeTruthy();
        expect(createWrapper(element) instanceof wrapperType).toBeTruthy();
    });
}
