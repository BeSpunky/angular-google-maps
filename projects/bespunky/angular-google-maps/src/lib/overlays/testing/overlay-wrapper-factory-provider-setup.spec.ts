import { FactoryProvider, Type } from "@angular/core";
import { TestBed } from '@angular/core/testing';

import { configureGoogleMapsTestingModule } from '../../testing/setup.spec';
import { WrapperFactory } from '../../core/abstraction/tokens/wrapper-factory.token';
import { GoogleMapComponent } from '../../google-map/component/google-map.component';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { MockGoogleMap } from '../../google-map/testing/google-map.mock.spec';
import { DrawableOverlay } from '../../core/abstraction/types/drawable-overlay.type';

function setupOverlayWrapperFactoryProviderTest(factoryProvider: FactoryProvider)
{
    const mapElement = document.createElement('div');
    
    configureGoogleMapsTestingModule({
        customize: (def) =>
        {
            def.providers.push(factoryProvider);
            def.providers.push({
                provide: GoogleMapComponent,
                useFactory: (api) => new GoogleMapComponent(api, () => new MockGoogleMap(new google.maps.Map(mapElement))),
                deps: [GoogleMapsApiService]
            });
        }
    });

    return TestBed.inject(WrapperFactory);
}

export function itShouldCreateOverlayWrapper(factoryProvider: FactoryProvider, wrapperType: Type<DrawableOverlay>)
{
    it(`should allow the creation of a new ${wrapperType.name} object when injected`, () =>
    {
        const createData = setupOverlayWrapperFactoryProviderTest(factoryProvider);

        expect(createData instanceof Function).toBeTruthy();
        expect(createData() instanceof wrapperType).toBeTruthy();
    });
}
