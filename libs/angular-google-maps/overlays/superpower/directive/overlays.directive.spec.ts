import { ComponentFixture     } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { configureGoogleMapsTestingModule                                } from '@bespunky/angular-google-maps/testing';
import { createLifecycleTestingHostComponentTemplate                     } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapComponent                                              } from '@bespunky/angular-google-maps/core';
import { OverlaysDirective, OverlaysSuperpower, GoogleMapsOverlaysModule } from '@bespunky/angular-google-maps/overlays';

describe('OverlaysDirective', () =>
{
    let fixture  : ComponentFixture<TestHost>
    let testHost : TestHost;
    
    function useSuperpower(): OverlaysSuperpower
    {
        return testHost.mapComponent.wrapper.superpowers.use(OverlaysSuperpower);
    }

    beforeEach(async () =>
    {
        ({ component: testHost, fixture } = await configureGoogleMapsTestingModule<TestHost>({
            componentType: TestHost,
            customize    : def => def.imports.push(GoogleMapsOverlaysModule)
        }));

        fixture.detectChanges();
    });

    it('should create an instance', () => expect(testHost.overlaysDirective).toBeTruthy());

    it('should output the superpower to the given parent variable', (done: jest.DoneCallback) =>
    {
        // The change is emitted by the directive on a second change detection cycle to prevent the ExpressionChangedAfterItWasCheckedError.
        setTimeout(() =>
        {
            expect(testHost.overlays instanceof OverlaysSuperpower).toBeTruthy();
            expect(testHost.overlays).toBe(useSuperpower());

            done();
        }, 0);
    });

    it('should prevent overriding the superpower from outside', () =>
    {
        testHost.overlaysDirective.overlays = new OverlaysSuperpower(null, null);

        expect(testHost.overlaysDirective.overlays).toBe(useSuperpower());
    });
});

@Component({
    template: createLifecycleTestingHostComponentTemplate('', `[(overlays)]="overlays"`)
})
export class TestHost
{
    @ViewChild(GoogleMapComponent)
    public mapComponent: GoogleMapComponent;
    @ViewChild(OverlaysDirective)
    public overlaysDirective: OverlaysDirective;

    public overlays: OverlaysSuperpower;
}