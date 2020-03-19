import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { createDefaultTestModuleConfig } from '../../../testing/utils';
import { GoogleMapsMarkerDirective } from './google-maps-marker.directive';
import { GoogleMapComponent } from '../../../google-map/component/google-map.component';
import { GoogleMapsApiService } from '../../../core/api/google-maps-api.service';
import { GoogleMapsInternalApiService } from '../../../core/api/google-maps-internal-api.service';
import { GoogleMap } from '../../../google-map/google-map';
import { GoogleMapsMarker } from '../google-maps-marker';

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
    let api          : GoogleMapsApiService;
    let internalApi  : GoogleMapsInternalApiService;

    beforeEach(async(() =>
    {
        const moduleConfig = createDefaultTestModuleConfig();
        moduleConfig.declarations = [TestHostComponent];

        TestBed.configureTestingModule(moduleConfig)
               .compileComponents();
    }));

    beforeEach(() =>
    {
        hostFixture = TestBed.createComponent(TestHostComponent);
        hostComponent = hostFixture.componentInstance;

        hostFixture.detectChanges();

        api = TestBed.get(GoogleMapsApiService);
        internalApi = TestBed.get(GoogleMapsInternalApiService);
       
        directive = hostComponent.markerDirective;
    });

    it('should create an instance', () => expect(directive).toBeTruthy());

    it('should init the native wrapper using the map object if passed-in', () =>
    {
        directive.marker = new GoogleMapsMarker(hostComponent.map, api);

        hostFixture.detectChanges();

        expect((directive as any).initNativeWrapper()).toBe(directive.marker);
    });

    it('should init the native wrapper using a map object if non was passed-in', () =>
    {
        directive.marker = undefined;

        hostFixture.detectChanges();

        expect(directive.marker).toBeUndefined();
        expect((directive as any).initNativeWrapper() instanceof GoogleMapsMarker).toBeTruthy();
    });
});

@Component({
    template: `<bs-google-map [map]="map" [center]="center">
                   <bs-google-maps-marker [position]="center"></bs-google-maps-marker>
               </bs-google-map>`
})
class TestHostComponent
{
    @ViewChild(GoogleMapComponent)
    public mapComponent: GoogleMapComponent;
    @ViewChild(GoogleMapsMarkerDirective)
    public markerDirective: GoogleMapsMarkerDirective;

    public map: GoogleMap;
}