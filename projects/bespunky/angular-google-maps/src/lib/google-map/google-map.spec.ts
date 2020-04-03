import { ElementRef } from '@angular/core';

import { configureGoogleMapsTestingModule } from '../testing/setup.spec';
import { expectPositionEquals } from '../testing/expectations.spec';
import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { GoogleMap } from './google-map';
import { Defaults } from '../core/config/defaults';
import { GoogleMapsMarker } from '../overlays/marker/google-maps-marker';
import { GoogleMapsData } from '../overlays/data/google-maps-data';

const elementStub: any = document.createElement('div');

describe('GoogleMap', () =>
{
    let map              : GoogleMap;
    let api              : GoogleMapsApiService;
    let mapElement       : ElementRef;
    let runOutsideAngular: jasmine.Spy;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        mapElement = new ElementRef(elementStub);
        map        = new GoogleMap(api, mapElement);
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(map).toBeTruthy());

        it('should instantiate a new native map with the default zoom and center', () =>
        {
            expectPositionEquals(map.getCenter(), Defaults.Center);
            expect(map.getZoom()).toBe(Defaults.ZoomLevel);
        });

        it('should allow instantiating the native map with custom options', () =>
        {
            const customMap = new GoogleMap(api, mapElement, {
                center: new google.maps.LatLng({ lat: 2, lng: 2 }),
                zoom: 999
            });

            expect(customMap).toBeDefined();
            expectPositionEquals(customMap.getCenter(), { lat: 2, lng: 2 });
            expect(customMap.getZoom()).toBe(999);
        });
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