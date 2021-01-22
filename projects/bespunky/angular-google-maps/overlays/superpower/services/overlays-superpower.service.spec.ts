import { TestBed    } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import { configureGoogleMapsTestingModule, expectPositionEquals                                                              } from '@bespunky/angular-google-maps/testing';
import { GoogleMapsApiService, GoogleMap, Defaults, FlatCoord, SuperpowersService                                            } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlaysModule, GoogleMapsMarker, GoogleMapsPolygon, GoogleMapsCircle, GoogleMapsData, OverlaysSuperpower, GoogleMapsPolyline } from '@bespunky/angular-google-maps/overlays';

const elementStub: any = document.createElement('div');

describe('OverlaysSuperpower', () =>
{
    let superpowers      : SuperpowersService;
    let power            : OverlaysSuperpower;
    let map              : GoogleMap;
    let api              : GoogleMapsApiService;
    let mapElement       : ElementRef;
    let runOutsideAngular: jasmine.Spy;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule({
            customize: def => {
                def.providers = [SuperpowersService];
                def.imports.push(GoogleMapsOverlaysModule);
            }
        }));

        superpowers = TestBed.inject(SuperpowersService);
        mapElement  = new ElementRef(elementStub);
        map         = new GoogleMap(superpowers, api, mapElement);
        power       = map.superpowers.use(OverlaysSuperpower);
    });

    it('should be created', () => expect(power).toBeTruthy());

    it('should create a marker outside angular when calling `createMarker()`', () => 
    {            
        const marker = power.createMarker(Defaults.Center);
        
        // Overlay creation ends up in more than one calls to runOutsideAngular().
        // In order to avoid changing the test when changing implementations, call count is avoided and this is used instead.
        expect(runOutsideAngular.calls.all().some(call => call.returnValue instanceof GoogleMapsMarker)).toBeTruthy();

        expect(marker).toBeInstanceOf(GoogleMapsMarker);
        expectPositionEquals(marker.getPosition(), Defaults.Center);
    });

    it('should create a polygon outside angular when calling `createPolygon()`', () => 
    {            
        const flatPath = [[10, 20], [20, 30], [30, 40]] as FlatCoord[];
        const polygon = power.createPolygon(flatPath);
        
        // Overlay creation ends up in more than one calls to runOutsideAngular().
        // In order to avoid changing the test when changing implementations, call count is avoided and this is used instead.
        expect(runOutsideAngular.calls.all().some(call => call.returnValue instanceof GoogleMapsPolygon)).toBeTruthy();

        expect(polygon).toBeInstanceOf(GoogleMapsPolygon);
        expect(polygon.getPath()).toEqual(api.geometry.toLiteralMultiPath(flatPath));
    });
    
    it('should create a polyline outside angular when calling `createPolyline()`', () => 
    {            
        const flatPath = [[10, 20], [20, 30], [30, 40]] as FlatCoord[];
        const polyline = power.createPolyline(flatPath);
        
        // Overlay creation ends up in more than one calls to runOutsideAngular().
        // In order to avoid changing the test when changing implementations, call count is avoided and this is used instead.
        expect(runOutsideAngular.calls.all().some(call => call.returnValue instanceof GoogleMapsPolyline)).toBeTruthy();

        expect(polyline).toBeInstanceOf(GoogleMapsPolyline);
        expect(polyline.getPath()).toEqual(api.geometry.toLiteralMultiPath(flatPath)[0]);
    });
    
    it('should create a circle outside angular when calling `createCircle()`', () => 
    {            
        const center = [10, 20] as FlatCoord;
        const radius = 100000;
        const circle = power.createCircle(center, radius);
        
        // Overlay creation ends up in more than one calls to runOutsideAngular().
        // In order to avoid changing the test when changing implementations, call count is avoided and this is used instead.
        expect(runOutsideAngular.calls.all().some(call => call.returnValue instanceof GoogleMapsCircle)).toBeTruthy();

        expect(circle).toBeInstanceOf(GoogleMapsCircle);
        expect(circle.getCenter()).toEqual(api.geometry.toLiteralCoord(center));
        expect(circle.getRadius()).toEqual(radius);
    });
    
    it('should create a data layer outside angular when calling `createDataLayer()`', () => 
    {
        const data = power.createDataLayer({ style: { title: 'awesome' } });

        // Overlay creation ends up in more than one calls to runOutsideAngular().
        // In order to avoid changing the test when changing implementations, call count is avoided and this is used instead.
        expect(runOutsideAngular.calls.all().some(call => call.returnValue instanceof GoogleMapsData)).toBeTruthy();

        expect(data).toBeInstanceOf(GoogleMapsData);
        expect((data.getStyle() as any).title).toBe('awesome');
    });

    it('should remove an overlay outside angular when calling `removeOverlay()`', () =>
    {
        const marker = power.createMarker({ lat: 20, lng: 20 });

        expect(power.tracker.markers.includes(marker)).toBeTruthy();

        runOutsideAngular.calls.reset();

        power.removeOverlay(marker);

        expect(runOutsideAngular.calls.count()).toBeGreaterThan(0);
        expect(power.tracker.markers.includes(marker)).toBeFalsy();
    });
});
