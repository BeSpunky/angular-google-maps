import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { GoogleMapsOverlayLifecycleBase } from './google-maps-overlay-lifecycle-base';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { configureGoogleMapsTestingModule } from '../../../testing/setup.spec';
import { MockGoogleMap } from '../../../google-map/testing/google-map.mock.spec';
import { WrapperFactory } from '../tokens/wrapper-factory.token';
import { DrawableOverlay } from '../types/drawable-overlay.type';
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