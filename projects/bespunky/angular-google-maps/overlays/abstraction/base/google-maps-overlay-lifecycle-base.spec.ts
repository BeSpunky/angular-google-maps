import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { GoogleMapsOverlayLifecycleBase } from './google-maps-overlay-lifecycle-base';
import { GoogleMapsApiService } from '../../../src/lib/core/api/google-maps-api.service';
import { configureGoogleMapsTestingModule } from '../../../testing/setup.spec';
import { MockGoogleMap } from '../../../src/lib/google-map/testing/mock-google-map.spec';
import { WrapperFactory } from '../../../src/lib/core/abstraction/tokens/wrapper-factory.token';
import { DrawableOverlay } from '../../../src/lib/core/abstraction/types/abstraction';
import { MockDrawableOverlay } from '../testing/mock-drawable-overlay.spec';
import { MockNativeDrawableOverlay } from '../testing/mock-native-drawable-overlay.spec';

describe('GoogleMapsOverlayLifecycleBase', () =>
{
    let component: GoogleMapsOverlayLifecycleBaseTest;
    let fixture  : ComponentFixture<GoogleMapsOverlayLifecycleBaseTest>
    let mockMap  : MockGoogleMap;

    beforeEach(async () =>
    {
        ({ component, fixture } = await configureGoogleMapsTestingModule({ componentType: GoogleMapsOverlayLifecycleBaseTest }));
        
        mockMap = component.wrapper.map as MockGoogleMap;

        spyOn(mockMap, 'removeOverlay').and.stub();
    });

    it('should create an instance', () => expect(component).toBeTruthy());

    it('should remove remove the overlay from the map on destroy', () =>
    {
        fixture.destroy();

        expect(mockMap.removeOverlay).toHaveBeenCalledTimes(1);
    });
});

function OverlayFactoryProvider()
{
    return () => new MockDrawableOverlay(new MockGoogleMap(), new MockNativeDrawableOverlay());
}

@Component({
    providers: [
        { provide: WrapperFactory, useFactory: OverlayFactoryProvider, deps: [GoogleMapsApiService] }
    ]
})
class GoogleMapsOverlayLifecycleBaseTest extends GoogleMapsOverlayLifecycleBase<DrawableOverlay> { }