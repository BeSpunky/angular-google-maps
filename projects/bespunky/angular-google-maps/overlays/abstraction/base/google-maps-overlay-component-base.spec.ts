import { ComponentFixture } from '@angular/core/testing';
import { Component        } from '@angular/core';

import { configureGoogleMapsTestingModule                                                                                                } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap                                                                                                                   } from '@bespunky/angular-google-maps/core/testing';
import { MockDrawableOverlay, MockNativeDrawableOverlay                                                                                  } from '@bespunky/angular-google-maps/overlays/testing';
import { WrapperFactory, SuperpowersService                                                                                              } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlayComponentBase, OverlayType, DrawableOverlay, GoogleMapsOverlaysModule, IOverlaysSuperpower, OverlaysSuperpower } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsOverlayComponentBase (abstract)', () =>
{
    let component         : GoogleMapsOverlayComponentBaseTest;
    let fixture           : ComponentFixture<GoogleMapsOverlayComponentBaseTest>
    let mockMap           : MockGoogleMap;
    let overlaysSuperpower: IOverlaysSuperpower

    beforeEach(async () =>
    {
        ({ component, fixture } = await configureGoogleMapsTestingModule({
            componentType: GoogleMapsOverlayComponentBaseTest,
            customize    : def => def.imports.push(GoogleMapsOverlaysModule)
        }));
        
        mockMap            = component.wrapper.map as MockGoogleMap;
        overlaysSuperpower = mockMap.superpowers.use(OverlaysSuperpower);

        spyOn(overlaysSuperpower, 'removeOverlay').and.stub();
    });

    it('should create an instance', () => expect(component).toBeTruthy());

    it('should remove remove the overlay from the map on destroy', () =>
    {
        fixture.destroy();

        expect(overlaysSuperpower.removeOverlay).toHaveBeenCalledTimes(1);
    });
});

function OverlayFactoryProvider(superpowers)
{
    return () =>
    {
        const overlay = new MockDrawableOverlay(new MockGoogleMap(undefined, superpowers), new MockNativeDrawableOverlay());

        overlay.type = OverlayType.Marker;

        return overlay;
    };
}

@Component({
    providers: [
        { provide: WrapperFactory, useFactory: OverlayFactoryProvider, deps: [SuperpowersService] },
        SuperpowersService
    ]
})
class GoogleMapsOverlayComponentBaseTest extends GoogleMapsOverlayComponentBase<DrawableOverlay> { }