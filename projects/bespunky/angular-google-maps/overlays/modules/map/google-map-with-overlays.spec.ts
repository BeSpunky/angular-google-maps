import { ElementRef } from '@angular/core';

import { configureGoogleMapsTestingModule, expectPositionEquals                     } from '@bespunky/angular-google-maps/testing';
import { GoogleMapsApiService, Defaults, FlatCoord                                  } from '@bespunky/angular-google-maps/core';
import { GoogleMapWithOverlays, GoogleMapsMarker, GoogleMapsPolygon, GoogleMapsData } from '@bespunky/angular-google-maps/overlays';

const elementStub: any = document.createElement('div');

describe('GoogleMapWithOverlays', () =>
{
    let map              : GoogleMapWithOverlays;
    let api              : GoogleMapsApiService;
    let mapElement       : ElementRef;
    let runOutsideAngular: jasmine.Spy;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        mapElement = new ElementRef(elementStub);
        map        = new GoogleMapWithOverlays(api, mapElement);
    });
    
    describe('overlay management', () =>
    {
        it('should create a marker outside angular when calling `createMarker()`', () => 
        {            
            const marker = map.createMarker(Defaults.Center);
            
            // Overlay creation ends up in more than one calls to runOutsideAngular().
            // In order to avoid changing the test when changing implementations, call count is avoided and this is used instead.
            expect(runOutsideAngular.calls.all().some(call => call.returnValue instanceof GoogleMapsMarker)).toBeTruthy();

            expect(marker instanceof GoogleMapsMarker).toBeTruthy();
            expectPositionEquals(marker.getPosition(), Defaults.Center);
        });

        it('should create a polygon outside angular when calling `createPolygon()`', () => 
        {            
            const flatPath = [[10, 20], [20, 30], [30, 40]] as FlatCoord[];
            const polygon = map.createPolygon(flatPath);
            
            // Overlay creation ends up in more than one calls to runOutsideAngular().
            // In order to avoid changing the test when changing implementations, call count is avoided and this is used instead.
            expect(runOutsideAngular.calls.all().some(call => call.returnValue instanceof GoogleMapsPolygon)).toBeTruthy();

            expect(polygon instanceof GoogleMapsPolygon).toBeTruthy();
            expect(polygon.getPath()).toEqual(api.geometry.toLiteralMultiPath(flatPath));
        });
        
        it('should create a data layer outside angular when calling `createDataLayer()`', () => 
        {
            const data = map.createDataLayer({ style: { title: 'awesome' } });

            // Overlay creation ends up in more than one calls to runOutsideAngular().
            // In order to avoid changing the test when changing implementations, call count is avoided and this is used instead.
            expect(runOutsideAngular.calls.all().some(call => call.returnValue instanceof GoogleMapsData)).toBeTruthy();

            expect(data instanceof GoogleMapsData).toBeTruthy();
            expect((data.getStyle() as any).title).toBe('awesome');
        });

        it('should remove an overlay outside angular when calling `removeOverlay()`', () =>
        {
            const marker = map.createMarker({ lat: 20, lng: 20 });

            expect(map.overlays.markers.includes(marker)).toBeTruthy();

            runOutsideAngular.calls.reset();

            map.removeOverlay(marker);

            expect(runOutsideAngular.calls.count()).toBeGreaterThan(0);
            expect(map.overlays.markers.includes(marker)).toBeFalsy();
        });
    });
});
