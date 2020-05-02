import { ComponentFixture } from '@angular/core/testing';
import { Component        } from '@angular/core';

import { configureGoogleMapsTestingModule                                          } from '@bespunky/angular-google-maps/core/testing';
import { MockDrawableOverlay, MockGoogleMapWithOverlays, MockNativeDrawableOverlay } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsApiService, WrapperFactory                                      } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlayLifecycleBase, DrawableOverlay                           } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsOverlayLifecycleBase', () =>
{
    let component: GoogleMapsOverlayLifecycleBaseTest;
    let fixture  : ComponentFixture<GoogleMapsOverlayLifecycleBaseTest>
    let mockMap  : MockGoogleMapWithOverlays;

    beforeEach(async () =>
    {
        ({ component, fixture } = await configureGoogleMapsTestingModule({ componentType: GoogleMapsOverlayLifecycleBaseTest }));
        
        mockMap = component.wrapper.map as MockGoogleMapWithOverlays;

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
    return () => new MockDrawableOverlay(new MockGoogleMapWithOverlays(), new MockNativeDrawableOverlay());
}

@Component({
    providers: [
        { provide: WrapperFactory, useFactory: OverlayFactoryProvider, deps: [GoogleMapsApiService] }
    ]
})
class GoogleMapsOverlayLifecycleBaseTest extends GoogleMapsOverlayLifecycleBase<DrawableOverlay> { }