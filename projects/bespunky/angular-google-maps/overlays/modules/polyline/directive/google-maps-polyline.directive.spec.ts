import { ComponentFixture } from '@angular/core/testing';
import { Component        } from '@angular/core';

import { configureGoogleMapsTestingModule                                        } from '@bespunky/angular-google-maps/testing';
import { createLifecycleTestingHostComponentTemplate, LifecycleComponentTestHost } from '@bespunky/angular-google-maps/core/testing';
import { Coord                                                                   } from '@bespunky/angular-google-maps/core';
import { GoogleMapsPolylineDirective, GoogleMapsOverlaysModule                   } from '@bespunky/angular-google-maps/overlays';

/**
 * -- NOTE --
 * Events hooking and property delegation are not tested in components deriving from `GoogleMapsComponentBase`.
 * The appropriate tests are already done by `GoogleMapsComponentBase` and `GoogleMapsInternalApiService`/
 * 
 * @see `google-maps-internal-api.service.spec.ts` For testing of the hooking and delegation mechanisms.
 * @see `google-maps-component-base.spec.ts` For testing of the integration between the component and the internal API service.
 */
describe('GoogleMapsPolylineDirective', () =>
{
    let hostFixture  : ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let directive    : GoogleMapsPolylineDirective;

    beforeEach(async () =>
    {
        ({ fixture: hostFixture, component: hostComponent } = await configureGoogleMapsTestingModule({
            componentType: TestHostComponent,
            customize    : def => def.imports.push(GoogleMapsOverlaysModule)
        }));
        
        hostFixture.detectChanges();

        directive = hostComponent.testedComponent as GoogleMapsPolylineDirective;
    });

    it('should create an instance', () => expect(directive).toBeTruthy());
});

@Component({
    template: createLifecycleTestingHostComponentTemplate('<bs-google-maps-polyline [path]="path" #testedComponent></bs-google-maps-polyline>')
})
class TestHostComponent extends LifecycleComponentTestHost
{
    public path: Coord[] = [{ lat: 20, lng: 20 }];
}