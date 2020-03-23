import { configureGoogleMapsTestingModule } from '../testing/setup';
import { OverlaysTracker } from "./overlays-tracker";
import { IGoogleMap } from '../google-map/i-google-map';
import { IGoogleMapsDrawableOverlay } from '../core/abstraction/base/i-google-maps-drawable-overlay';
import { IGoogleMapsMarker } from './marker/i-google-maps-marker';
import { OverlayType } from '../core/abstraction/base/overlay-type.enum';

describe('OverlayTracker', () =>
{
    let overlays = new OverlaysTracker();

    beforeEach(() => configureGoogleMapsTestingModule());

    it('should create an instance', () => expect(overlays).toBeDefined());

    it('should add an overlay when calling the `add()` method', () =>
    {
        expect(overlays.markers.length).toBe(0);
        
        const marker = new StubGoogleMapsMarker(OverlayType.Marker);
        
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

class StubGoogleMapsMarker implements IGoogleMapsMarker
{
    public native: Promise<any>;
    public custom: any;

    constructor(public type: OverlayType) { }

    getContainingMap(): IGoogleMap
    {
        throw new Error("Method not implemented.");
    }
    setContainingMap(map: IGoogleMap): void
    {
        throw new Error("Method not implemented.");
    }
    removeFromMap(): void
    {
        throw new Error("Method not implemented.");
    }
    listenTo(eventName: string, handler: () => void): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    stopListeningTo(eventName: string): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
}