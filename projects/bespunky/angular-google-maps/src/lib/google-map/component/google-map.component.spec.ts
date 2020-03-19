import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GoogleMapComponent } from './google-map.component';
import { createDefaultTestModuleConfig } from '../../testing/utils';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { GoogleMapsInternalApiService } from '../../core/api/google-maps-internal-api.service';
import { GoogleMap } from '../google-map';

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
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let component: GoogleMapComponent;
    let api: GoogleMapsApiService;
    let internalApi: GoogleMapsInternalApiService;

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

        component = hostFixture.componentInstance.mapComponent;
        api = TestBed.get(GoogleMapsApiService);
        internalApi = TestBed.get(GoogleMapsInternalApiService);
    });

    it('should create an instance', () => expect(component).toBeTruthy());

    it('should init the native wrapper using the map object if passed-in', () =>
    {
        const element = hostFixture.debugElement.query(By.css('div.google-map'));

        hostComponent.map = new GoogleMap(element, api);

        hostFixture.detectChanges();

        expect(component.map).toBe(hostComponent.map);
        expect((component as any).initNativeWrapper()).toBe(component.map);
    });

    it('should init the native wrapper using a map object if non was passed-in', () =>
    {
        hostComponent.map = undefined;

        hostFixture.detectChanges();

        expect(component.map).toBeUndefined();
        expect((component as any).initNativeWrapper() instanceof GoogleMap).toBeTruthy();
    });
});

@Component({
    template: '<bs-google-map [map]="map" [center]="center"></bs-google-map>'
})
class TestHostComponent
{
    @ViewChild(GoogleMapComponent)
    public mapComponent: GoogleMapComponent;

    public map: GoogleMap;
    public center: google.maps.LatLng;
}