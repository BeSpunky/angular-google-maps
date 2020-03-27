import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { GoogleMapComponent } from './google-map.component';
import { configureGoogleMapsTestingModule } from '../../testing/setup';
import { LifecycleTestsHostComponentBase, createLifecycleTestingHostComponentTemplate } from '../../testing/lifecycle-components';

/**
 * -- NOTE --
 * Events hooking and property delegation are not tested in components deriving from `GoogleMapsLifecycleBase`.
 * The appropriate tests are already done by `GoogleMapsLifecycleBase` and `GoogleMapsInternalApiService`/
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
class TestHostComponent extends LifecycleTestsHostComponentBase
{
    public center: google.maps.LatLng;
}