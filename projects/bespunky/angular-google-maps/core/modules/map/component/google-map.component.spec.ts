import { ComponentFixture } from '@angular/core/testing';
import { Component        } from '@angular/core';

import { configureGoogleMapsTestingModule                                        } from '@bespunky/angular-google-maps/testing';
import { LifecycleComponentTestHost, createLifecycleTestingHostComponentTemplate } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapComponent                                                      } from '@bespunky/angular-google-maps/core';

/**
 * -- NOTE --
 * Events hooking and property delegation are not tested in components deriving from `GoogleMapsComponentBase`.
 * The appropriate tests are already done by `GoogleMapsComponentBase` and `GoogleMapsInternalApiService`/
 * 
 * @see `google-maps-internal-api.service.spec.ts` For testing of the hooking and delegation mechanisms.
 * @see `google-maps-lifecycle-base.spec.ts` For testing of the integration between the component and the internal API service.
 */
describe('GoogleMapComponent', () =>
{
    let hostFixture  : ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let component    : GoogleMapComponent;

    beforeEach(async () =>
    {
        ({ fixture: hostFixture, component: hostComponent } = await configureGoogleMapsTestingModule({ componentType: TestHostComponent }));
        
        hostFixture.detectChanges();

        component = hostComponent.mapComponent;
    });

    it('should create an instance', () => expect(component).toBeTruthy());
});

@Component({
    template: createLifecycleTestingHostComponentTemplate('')
})
class TestHostComponent extends LifecycleComponentTestHost
{
    public center: google.maps.LatLng;
}