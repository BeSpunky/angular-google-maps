import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GoogleMapComponent } from './google-map.component';
import { createDefaultTestModuleConfig } from '../../testing/utils';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { GoogleMap } from '../google-map';
import { GoogleMapsEventData } from '../../core/abstraction/angular/events/google-maps-event-data';

@Component({
    template: '<bs-google-map [map]="map" [center]="center" (click)="onClick($event)"></bs-google-map>'
})
class TestHostComponent
{
    @ViewChild(GoogleMapComponent, { static: false })
    public mapComponent: GoogleMapComponent;

    public map: GoogleMap;
    public center: google.maps.LatLng;

    public onClick(eventData: GoogleMapsEventData)
    {
        return true;
    }
}

describe('GoogleMapComponent', () =>
{
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let component: GoogleMapComponent;
    let api: GoogleMapsApiService;

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

    it('should delegate changes to the native map', async () =>
    {
        // Get the map object and spy on its setter method
        const map = component.nativeWrapper as GoogleMap;
        spyOn(map, 'setCenter').and.callThrough();

        // Set a new setter to the host
        hostComponent.center = new google.maps.LatLng(10, 10);

        hostFixture.detectChanges();

        await hostFixture.whenStable();

        expect(component.center).toBe(hostComponent.center);
        expect(map.setCenter).toHaveBeenCalledTimes(2); // Once for first value (undefined), once for new value
        expect(map.setCenter).toHaveBeenCalledWith(hostComponent.center);
    });

    it('should emit events when native objects raise events', async () =>
    {

    });
});
