import { ElementRef } from '@angular/core';

import { configureGoogleMapsTestingModule } from '../testing/setup';
import { expectPositionEquals } from '../testing/expectations';
import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { GoogleMap } from './google-map';
import { Defaults } from '../core/config/defaults';
import { ZoomLevel } from './types/zoom-level.enum';
import { GoogleMapsMarker } from '../overlays/marker/google-maps-marker';
import { IGoogleMapsDrawableOverlay } from '../core/abstraction/base/i-google-maps-drawable-overlay';

const elementStub: any = document.createElement('div');

describe('GoogleMap', () =>
{
    let map: GoogleMap;
    let api: GoogleMapsApiService;
    let mapElement: ElementRef;
    let runOutsideAngular: jasmine.Spy;

    beforeEach(() =>
    {
        ({ api, spies: { runOutsideAngular } } = configureGoogleMapsTestingModule());

        mapElement = new ElementRef(elementStub);
        map = new GoogleMap(mapElement, api);
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(map).toBeTruthy());

        it('should wait for api and create a native map outside of angular with default center and zoom', async () =>
        {
            const nativeMap = await map.native;

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(nativeMap instanceof google.maps.Map).toBeTruthy();

            expectPositionEquals(nativeMap.getCenter(), Defaults.Center);
            expect(nativeMap.getZoom()).toBe(Defaults.ZoomLevel);
        });

        it('should allow creation of the native map with specific center and zoom', async () =>
        {
            const customCenter = { lat: 10, lng: 10 };
            const customZoom = ZoomLevel.World;

            const customMap = new GoogleMap(mapElement, api, customCenter, customZoom);
            const nativeMap = await customMap.native;

            expectPositionEquals(nativeMap.getCenter(), customCenter);
            expect(nativeMap.getZoom()).toBe(customZoom);
        });
    });

    describe('upon calling get functions', () =>
    {
        it('should wait for api and retrieve the map\'s center', async () => expect(await map.getCenter() instanceof google.maps.LatLng).toBeTruthy());
        it('should wait for api and retrieve the map\'s zoom', async () => expect(await map.getZoom()).toBeGreaterThanOrEqual(0));
    });

    describe('upon calling set functions', () =>
    {
        beforeEach(() => runOutsideAngular.calls.reset());

        it('should wait for api and set the map\'s center outside of angular', async () =>
        {
            const center = { lat: 10, lng: 10 };

            map.setCenter(center);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);

            expectPositionEquals(await map.getCenter(), center);
        });

        it('should wait for api and set the map\'s zoom outside of angular', async () =>
        {
            const zoom = ZoomLevel.LandmassOrContinent;

            map.setZoom(zoom);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(await map.getZoom()).toBe(zoom);
        });
    });

    describe('overlay management', () =>
    {
        const dummyOverlay = jasmine.createSpyObj('overlay', ['setContainingMap', 'removeFromMap']);

        beforeEach(() => runOutsideAngular.calls.reset());

        it('should create an overlay outside of angular and add it to the overlay tracker when calling `createOverlay()`', async () =>
        {
            const overlayTrackerSpy = spyOn(map.overlays, 'add');
            
            // Get a hold of the private `createOverlay()` method and strong type it
            const createOverlay = (map as any).createOverlay as (createObject: () => any) => Promise<any>;

            const overlay = await createOverlay.call(map, () => dummyOverlay);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(overlayTrackerSpy).toHaveBeenCalledTimes(1);
            expect(overlay).toBe(dummyOverlay);
        });

        it('should remove an overlay outside of angular and remove it to the overlay tracker when calling `removeOverlay()`', async () =>
        {
            // There should be an overlay stored in the tracker from the previous test
            const overlayTrackerSpy = spyOn(map.overlays, 'remove');

            await map.removeOverlay(dummyOverlay as IGoogleMapsDrawableOverlay);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(overlayTrackerSpy).toHaveBeenCalledTimes(1);
        });

        it('should create a marker associated with the map when calling `createMarker()`', async () =>
        {
            const options: google.maps.ReadonlyMarkerOptions = {
                position: Defaults.Center
            };

            const marker = await map.createMarker(options);

            expect(marker instanceof GoogleMapsMarker).toBeTruthy();
            expect(marker.map).toBe(map);
        });
    });
});