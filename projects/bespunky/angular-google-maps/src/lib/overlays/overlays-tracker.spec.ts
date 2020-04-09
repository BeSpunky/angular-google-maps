import { OverlaysTracker } from "./overlays-tracker";
import { DrawableOverlay } from '../core/abstraction/types/drawable-overlay.type';
import { MockMarker } from './marker/testing/mock-marker.spec';
import { MockGoogleMap } from '../google-map/testing/mock-google-map.spec';

describe('OverlayTracker', () =>
{
    let overlays = new OverlaysTracker();

    it('should create an instance', () => expect(overlays).toBeDefined());

    it('should add an overlay when calling the `add()` method', () =>
    {
        expect(overlays.markers.length).toBe(0);
        
        const marker = new MockMarker(new MockGoogleMap());
        
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

        expect(() => overlays.add(dummyOverlay as DrawableOverlay)).toThrowError(/supported/);
    });
});
