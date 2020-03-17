import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { createDefaultTestModuleConfig } from '../../../testing/utils';
import { GoogleMapsMarkerDirective } from './google-maps-marker.directive';
import { GoogleMapComponent } from '../../../google-map/component/google-map.component';
import { GoogleMapsApiService } from '../../../core/api/google-maps-api.service';
import { GoogleMapsInternalApiService } from '../../../core/api/google-maps-internal-api.service';
import { GoogleMap } from '../../../google-map/google-map';
import { GoogleMapsEventData } from '../../../core/abstraction/events/google-maps-event-data';
import { GoogleMapsMarker } from '../google-maps-marker';
import { MarkerEvent } from '../types/marker-event.enum';

@Component({
    template: `<bs-google-map [map]="map" [center]="center" (click)="onClick($event)">
                   <bs-google-maps-marker [position]="center" (click)="onClick($event)"></bs-google-maps-marker>
               </bs-google-map>`
})
class TestHostComponent
{
    @ViewChild(GoogleMapComponent)
    public mapComponent: GoogleMapComponent;
    @ViewChild(GoogleMapsMarkerDirective)
    public markerDirective: GoogleMapsMarkerDirective;

    public map: GoogleMap;
    public center = new google.maps.LatLng(10, 10);

    public onClick(eventData: GoogleMapsEventData)
    {
        return true;
    }
}

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

    it('should delegate changes to the native marker', async () =>
    {
        // Get the marker object and spy on its setter method
        const marker = directive.nativeWrapper as GoogleMapsMarker;
        spyOn(marker, 'setPosition').and.callThrough();

        // Detect changes to allow Angular to pass the object from template to component to directive
        hostFixture.detectChanges();

        await hostFixture.whenStable();

        // The host component passes the center object by template. In turn, this should trigger the `setPosition()` method on the native marker object.
        expect(directive.position).toBe(hostComponent.center);
        expect(marker.setPosition).toHaveBeenCalledTimes(1);
        expect(marker.setPosition).toHaveBeenCalledWith(hostComponent.center);
    });

    it('should emit events when native objects raise events', async () =>
    {
        // The click event is the one being tested as it is the only one bound in the TestHostComponent's template.
        // To test more events, add handlers to the tempalte.
        
        const map = await directive.nativeWrapper.native;

        spyOn(directive.click, 'emit');

        new google.maps.event.trigger(map, MarkerEvent.Click);

        expect(directive.click.emit).toHaveBeenCalled();
    });
});
