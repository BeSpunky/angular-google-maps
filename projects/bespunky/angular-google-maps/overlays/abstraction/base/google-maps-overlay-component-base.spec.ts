import { Observable, empty } from 'rxjs';
import { ComponentFixture  } from '@angular/core/testing';
import { Component         } from '@angular/core';

import { configureGoogleMapsTestingModule                                                                           } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap                                                                                              } from '@bespunky/angular-google-maps/core/testing';
import { MockDrawableOverlay, MockNativeDrawableOverlay                                                             } from '@bespunky/angular-google-maps/overlays/testing';
import { WrapperInstance, SuperpowersService, GoogleMapsEventData                                                    } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlayComponentBase, OverlayType, DrawableOverlay, GoogleMapsOverlaysModule, OverlaysSuperpower } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsOverlayComponentBase (abstract)', () =>
{
    let component         : GoogleMapsOverlayComponentBaseTest;
    let fixture           : ComponentFixture<GoogleMapsOverlayComponentBaseTest>
    let mockMap           : MockGoogleMap;
    let overlaysSuperpower: OverlaysSuperpower;

    beforeEach(async () =>
    {
        ({ component, fixture } = await configureGoogleMapsTestingModule({
            componentType: GoogleMapsOverlayComponentBaseTest,
            customize    : def => def.imports.push(GoogleMapsOverlaysModule)
        }));
        
        mockMap            = component.wrapper.map as MockGoogleMap;
        overlaysSuperpower = mockMap.superpowers.use(OverlaysSuperpower);

        spyOn(overlaysSuperpower, 'removeOverlay').and.stub();

        // Run ngOnInit() to allow the overlay component to add the wrapper to the overlays tracker
        component.ngOnInit();
    });

    it('should create an instance', () => expect(component).toBeTruthy());

    it('should add the overlay to the tracker on constuction', () => expect(overlaysSuperpower.tracker.markers.length).toBe(1))

    it('should remove the overlay from the map on destroy', () =>
    {
        fixture.destroy();

        expect(overlaysSuperpower.removeOverlay).toHaveBeenCalledTimes(1);
    });
});

function OverlayFactoryProvider(superpowers)
{
    const overlay = new MockDrawableOverlay(new MockGoogleMap(undefined, superpowers), new MockNativeDrawableOverlay());

    overlay.type = OverlayType.Marker;

    return overlay;
}

@Component({
    providers: [
        { provide: WrapperInstance, useFactory: OverlayFactoryProvider, deps: [SuperpowersService] },
        SuperpowersService
    ]
})
class GoogleMapsOverlayComponentBaseTest extends GoogleMapsOverlayComponentBase<DrawableOverlay> {
    click      : Observable<GoogleMapsEventData> = empty();
    doubleClick: Observable<GoogleMapsEventData> = empty();
    mouseDown  : Observable<GoogleMapsEventData> = empty();
    mouseOut   : Observable<GoogleMapsEventData> = empty();
    mouseOver  : Observable<GoogleMapsEventData> = empty();
    mouseUp    : Observable<GoogleMapsEventData> = empty();
    rightClick : Observable<GoogleMapsEventData> = empty();
}