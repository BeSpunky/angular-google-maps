import { ComponentFixture } from '@angular/core/testing';
import { Component        } from '@angular/core';

import { configureGoogleMapsTestingModule                                        } from '@bespunky/angular-google-maps/testing';
import { createLifecycleTestingHostComponentTemplate, LifecycleComponentTestHost } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsDirectionsDirective, GoogleMapsDirectionsModule               } from '@bespunky/angular-google-maps/directions';

/**
 * -- NOTE --
 * Events hooking and property delegation are not tested in components deriving from `GoogleMapsComponentBase`.
 * The appropriate tests are already done by `GoogleMapsComponentBase` and `GoogleMapsInternalApiService`/
 * 
 * @see `google-maps-internal-api.service.spec.ts` For testing of the hooking and delegation mechanisms.
 * @see `google-maps-component-base.spec.ts` For testing of the integration between the component and the internal API service.
 */
describe('GoogleMapsDirectionsDirective', () =>
{
    let hostFixture  : ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let directive    : GoogleMapsDirectionsDirective;

    beforeEach(async () =>
    {
        ({ fixture: hostFixture, component: hostComponent } = await configureGoogleMapsTestingModule({
            componentType: TestHostComponent,
            customize    : def => def.imports.push(GoogleMapsDirectionsModule)
        }));
        
        hostFixture.detectChanges();

        directive = hostComponent.testedComponent as GoogleMapsDirectionsDirective;
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(directive).toBeTruthy());    
    });

    describe('route requests', () =>
    {
        it('should set the directions when both `from` and `to` have been set');
        it('should set the directions when `through` have been set');

        it('should do nothing if either `from` or `to` are not set');
        it('should fail if either `through` is set with less than 2 items');

        it('should update directions with the new options when setting `config`');
    })
});

@Component({
    template: createLifecycleTestingHostComponentTemplate('<bs-google-maps-directions [through]="[[0, 0], [1, 1]]" #testedComponent></bs-google-maps-directions>')
})
class TestHostComponent extends LifecycleComponentTestHost
{
}