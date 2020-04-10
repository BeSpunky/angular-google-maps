import { FactoryProvider, Type, Provider } from "@angular/core";
import { TestBed } from '@angular/core/testing';

import { configureGoogleMapsTestingModule } from '../../testing/setup.spec';
import { WrapperFactory } from '../../core/abstraction/tokens/wrapper-factory.token';
import { GoogleMapComponent } from '../../google-map/component/google-map.component';
import { GoogleMapsInternalApiService } from '../../core/api/google-maps-internal-api.service';
import { MockGoogleMap } from '../../google-map/testing/mock-google-map.spec';
import { EmittingWrapper } from '../../core/abstraction/types/abstraction';

function setupOverlayWrapperFactoryProviderTest(factoryProvider: FactoryProvider, ...deps: Provider[])
{
    configureGoogleMapsTestingModule({
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
