// import { ElementRef } from '@angular/core';

// import { configureGoogleMapsTestingModule } from '../testing/setup.spec';
// import { expectPositionEquals } from '../testing/expectations.spec';
// import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
// import { GoogleMap } from './google-map';
// import { Defaults } from '../core/config/defaults';
// import { ZoomLevel } from './types/zoom-level.enum';
// import { GoogleMapsMarker } from '../overlays/marker/google-maps-marker';
// import { DrawableOverlay } from '../core/abstraction/types/drawable-overlay.type';

// const elementStub: any = document.createElement('div');

// describe('GoogleMap', () =>
// {
//     let map: GoogleMap;
//     let api: GoogleMapsApiService;
//     let mapElement: ElementRef;
//     let runOutsideAngular: jasmine.Spy;

//     beforeEach(async () =>
//     {
//         ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

//         mapElement = new ElementRef(elementStub);
//         map = new GoogleMap(api, mapElement);
//     });

//     describe('basically', () =>
//     {
//         it('should create an instance', () => expect(map).toBeTruthy());

//         it('should wait for api and create a native map outside of angular with default center and zoom', async () =>
//         {
//             const nativeMap = await map.native;

//             expect(runOutsideAngular).toHaveBeenCalledTimes(1);
//             expect(nativeMap instanceof google.maps.Map).toBeTruthy();

//             expectPositionEquals(nativeMap.getCenter(), Defaults.Center);
//             expect(nativeMap.getZoom()).toBe(Defaults.ZoomLevel);
//         });

//         it('should allow creation of the native map with specific center and zoom', async () =>
//         {
//             const center = { lat: 10, lng: 10 };
//             const zoom = ZoomLevel.World;

//             const customMap = new GoogleMap(api, mapElement, { center, zoom });
//             const nativeMap = await customMap.native;

//             expectPositionEquals(nativeMap.getCenter(), center);
//             expect(nativeMap.getZoom()).toBe(zoom);
//         });
//     });

//     describe('overlay management', () =>
//     {
//         const dummyOverlay = jasmine.createSpyObj('overlay', ['setContainingMap', 'removeFromMap']);

//         beforeEach(() => runOutsideAngular.calls.reset());

//         it('should create an overlay outside of angular and add it to the overlay tracker when calling `createOverlay()`', async () =>
//         {
//             const overlayTrackerSpy = spyOn(map.overlays, 'add');
            
//             // Get a hold of the private `createOverlay()` method and strong type it
//             const createOverlay = (map as any).createOverlay as (createObject: () => any) => Promise<any>;

//             const overlay = await createOverlay.call(map, () => dummyOverlay);

//             expect(runOutsideAngular).toHaveBeenCalledTimes(1);
//             expect(overlayTrackerSpy).toHaveBeenCalledTimes(1);
//             expect(overlay).toBe(dummyOverlay);
//         });

//         it('should remove an overlay outside of angular and remove it to the overlay tracker when calling `removeOverlay()`', async () =>
//         {
//             // There should be an overlay stored in the tracker from the previous test
//             const overlayTrackerSpy = spyOn(map.overlays, 'remove');

//             await map.removeOverlay(dummyOverlay as DrawableOverlay);

//             expect(runOutsideAngular).toHaveBeenCalledTimes(1);
//             expect(overlayTrackerSpy).toHaveBeenCalledTimes(1);
//         });

//         it('should create a marker associated with the map when calling `createMarker()`', async () =>
//         {
//             const marker = await map.createMarker(Defaults.Center);

//             expect(marker instanceof GoogleMapsMarker).toBeTruthy();
//             expect(marker.map).toBe(map);
//         });
//     });
// });