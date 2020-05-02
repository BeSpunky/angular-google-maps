import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { GoogleMapsApiService, WrapperFactory } from '@bespunky/angular-google-maps/core';
import { DrawableOverlay } from '@bespunky/angular-google-maps/ovelays';
import { GoogleMapsOverlayLifecycleBase } from './google-maps-overlay-lifecycle-base';
import { configureGoogleMapsTestingModule } from '../../../testing/core/setup.spec';
import { MockGoogleMap } from '../../../core/modules/google-map/testing/mock-google-map.spec';
import { MockDrawableOverlay } from '../../../testing/overlays/mocks/mock-drawable-overlay.spec';
import { MockNativeDrawableOverlay } from '../../../testing/overlays/mocks/mock-native-drawable-overlay.spec';

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