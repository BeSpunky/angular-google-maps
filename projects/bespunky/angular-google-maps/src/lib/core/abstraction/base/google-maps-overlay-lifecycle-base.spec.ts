import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { GoogleMapsOverlayLifecycleBase } from './google-maps-overlay-lifecycle-base';
import { GoogleMapsDrawableOverlay } from './google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { configureGoogleMapsTestingModule } from '../../../testing/setup.spec';
import { MockGoogleMap } from '../../../google-map/testing/google-map.mock.spec';
import { WrapperFactory } from '../tokens/wrapper-factory.token';
import { GoogleMapsLifecycleBase } from './google-maps-lifecycle-base';

describe('GoogleMapsOverlayLifecycleBase', () =>
{
    let component: MockComponent;
    let fixture: ComponentFixture<MockComponent>

    beforeEach(async () =>
    {
        ({ component, fixture } = await configureGoogleMapsTestingModule({ componentType: MockComponent }));
    });

    it('should create an instance', () => expect(component).toBeTruthy());

    it('should remove remove the overlay from the map on destroy and continue executing the destroy chain', () =>
    {
        const removeOverlay    = spyOn(mockMap, 'removeOverlay').and.stub();
        const superNgOnDestroy = spyOn(GoogleMapsLifecycleBase.prototype, 'ngOnDestroy').and.stub();
  
        component.ngOnInit();

        fixture.destroy();

        expect(removeOverlay).toHaveBeenCalledTimes(1);
        expect(superNgOnDestroy).toHaveBeenCalledTimes(1);
        expect(removeOverlay).toHaveBeenCalledBefore(superNgOnDestroy);
    });
});

const mockMap = new MockGoogleMap();

class MockOverlay extends GoogleMapsDrawableOverlay<IGoogleMapsNativeDrawableOverlay>
{
    protected createNativeObject(): IGoogleMapsNativeDrawableOverlay
    {
        return { setMap: () => void 0 };
    }
}

function overlayFactory(api: GoogleMapsApiService)
{
    return new MockOverlay(api, mockMap, 0);
}

@Component({
    providers: [
        { provide: WrapperFactory, useFactory: (api) => () => overlayFactory(api), deps: [GoogleMapsApiService] }
    ]
})
class MockComponent extends GoogleMapsOverlayLifecycleBase
{
    public options?: any;
}