import { FactoryProvider, Type, Provider } from "@angular/core";
import { TestBed } from '@angular/core/testing';

import { GoogleMapComponent, GoogleMapsInternalApiService, WrapperFactory, EmittingWrapper } from '@bespunky/angular-google-maps/core';
import { configureGoogleMapsAsyncTestingModule, MockGoogleMap                              } from '@bespunky/angular-google-maps/testing';

function setupOverlayWrapperFactoryProviderTest(factoryProvider: FactoryProvider, ...deps: Provider[])
{
    configureGoogleMapsAsyncTestingModule({
        customize: (def) =>
        {
            def.providers.push({
                provide: MockGoogleMap,
                useValue: new MockGoogleMap()
            });
            def.providers.push({
                provide: GoogleMapComponent,
                useFactory: (api, map) => new GoogleMapComponent(api, () => map),
                deps: [GoogleMapsInternalApiService, MockGoogleMap]
            });
            def.providers.push(...deps, factoryProvider);
        }
    });

    return TestBed.inject(WrapperFactory);
}

export function itShouldCreateWrapper(factoryProvider: FactoryProvider, wrapperType: Type<EmittingWrapper>, ...deps: Provider[])
{
    it(`should allow the creation of a new ${wrapperType.name} object when injected`, () =>
    {
        const createData = setupOverlayWrapperFactoryProviderTest(factoryProvider, ...deps);

        expect(createData instanceof Function).toBeTruthy();
        expect(createData() instanceof wrapperType).toBeTruthy();
    });
}
