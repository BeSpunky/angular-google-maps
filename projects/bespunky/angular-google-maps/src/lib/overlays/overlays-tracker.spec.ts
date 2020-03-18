import { OverlaysTracker } from "./overlays-tracker";
import { GoogleMapsMarker } from './marker/google-maps-marker';
import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { IGoogleMap } from '../google-map/i-google-map';
import { createDefaultTestModuleConfig } from '../testing/utils';
import { TestBed } from '@angular/core/testing';
import { IGoogleMapsDrawableOverlay } from '../core/abstraction/base/i-google-maps-drawable-overlay';

describe('OverlayTracker', () =>
{
    let overlays = new OverlaysTracker();
    let api: GoogleMapsApiService;

    beforeEach(() =>
    {
        const moduleConfig = createDefaultTestModuleConfig();
        
        TestBed.configureTestingModule(moduleConfig);

        api = TestBed.inject(GoogleMapsApiService);
    });

    it('should create an instance', () => expect(overlays).toBeDefined());

    it('should add an overlay when calling the `add()` method', () =>
    {
        expect(overlays.markers.length).toBe(0);
        
        const marker = new GoogleMapsMarker(new StubGoogleMap(), api);
        
        overlays.add(marker);

        expect(overlays.markers.length).toBe(1);
        expect(overlays.markers[0]).toBe(marker);
    });

    it('should remove an overlay when calling the `remove()` method', () =>
    {
        // As OverlayTracker is instantiated once globaly, there should be a marker from the previous test
        expect(overlays.markers.length).toBe(1);
  
        overlays.remove(overlays.markers[0]);

        expect(overlays.markers.length).toBe(0);
    });

    it('should throw an error if the overlay type is not supported', () =>
    {
        // Define a type that doesn't exist
        const dummyOverlay = { type:  -1000 };

        expect(() => overlays.add(dummyOverlay as IGoogleMapsDrawableOverlay)).toThrowError(/supported/);
    });
});

class StubGoogleMap implements IGoogleMap
{
    getCenter(): Promise<google.maps.LatLng>
    {
        throw new Error("Method not implemented.");
    }
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): void
    {
        throw new Error("Method not implemented.");
    }
    getZoom(): Promise<number>
    {
        throw new Error("Method not implemented.");
    }
    setZoom(zoomLevel: number): void
    {
        throw new Error("Method not implemented.");
    }
    createMarker(options?: google.maps.ReadonlyMarkerOptions): Promise<import("./marker/i-google-maps-marker").IGoogleMapsMarker>
    {
        throw new Error("Method not implemented.");
    }
    native: any;
    custom: any;
    listenTo(eventName: string, handler: () => void): void
    {
        throw new Error("Method not implemented.");
    }
    stopListeningTo(eventName: string): void
    {
        throw new Error("Method not implemented.");
    }
}
