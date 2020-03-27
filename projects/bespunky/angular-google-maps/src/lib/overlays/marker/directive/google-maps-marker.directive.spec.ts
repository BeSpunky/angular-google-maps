import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { configureGoogleMapsTestingModule } from '../../../testing/setup';
import { LifecycleTestsHostComponentBase, createLifecycleTestingHostComponentTemplate } from '../../../testing/lifecycle-components';
import { GoogleMapsMarkerDirective } from './google-maps-marker.directive';

/**
 * -- NOTE --
 * Events hooking and property delegation are not tested in components deriving from `GoogleMapsLifecycleBase`.
 * The appropriate tests are already done by `GoogleMapsLifecycleBase` and `GoogleMapsInternalApiService`/
 * 
 * @see `google-maps-internal-api.service.spec.ts` For testing of the hooking and delegation mechanisms.
 * @see `google-maps-lifecycle-base.spec.ts` For testing of the integration between the component and the internal API service.
 */
describe('GoogleMapsMarkerDirective', () =>
{
    let hostFixture  : ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let directive    : GoogleMapsMarkerDirective;

    beforeEach(async () =>
    {
        ({ fixture: hostFixture, component: hostComponent } = await configureGoogleMapsTestingModule({ componentType: TestHostComponent }));
        
        hostFixture.detectChanges();

        directive = hostComponent.testedComponent as GoogleMapsMarkerDirective;
    });

    it('should create an instance', () => expect(directive).toBeTruthy());
});

@Component({
    template: createLifecycleTestingHostComponentTemplate('<bs-google-maps-marker [position]="center" #testedComponent></bs-google-maps-marker>')
})
class TestHostComponent extends LifecycleTestsHostComponentBase { }