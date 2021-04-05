
import { configureGoogleMapsTestingModule } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap                    } from '@bespunky/angular-google-maps/core/testing';
import { MockNativeDrawableOverlay        } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsApiService             } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay        } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsDrawableOverlay (abstract)', () =>
{
    let api              : GoogleMapsApiService;
    let runOutsideAngular: jest.SpyInstance;
    let mockMap          : MockGoogleMap;
    let mockNativeOverlay: MockNativeDrawableOverlay;
    let mockOverlay      : GoogleMapsDrawableOverlayTest;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        mockMap           = new MockGoogleMap({ id: 1, zoom: 1 });
        mockNativeOverlay = new MockNativeDrawableOverlay();
        mockOverlay       = new GoogleMapsDrawableOverlayTest(0, mockMap, api, mockNativeOverlay);
    });

    it('should be created', () => expect(mockOverlay).toBeTruthy());

    it('should add the overlay to the map on instantiation', () => expect(mockOverlay.map).toBe(mockMap));

    it('should add the overlay to the map outside angular when calling `attach()`', () =>
    {
        runOutsideAngular.mockReset();

        const secondNativeMap = { id: 2, zoom: 2 };
        const secondMap = new MockGoogleMap(secondNativeMap); // First one was `mockMap`

        mockOverlay.attach(secondMap);

        expect(runOutsideAngular).toHaveBeenCalledTimes(1);
        // The map wrapper should have been updated
        expect(mockOverlay.map).toBe(secondMap);
        // The inner native map should have been updated
        expect(mockNativeOverlay.nativeMap).toBe(secondNativeMap);
    });

    it('should remove the overlay from the map outside angular when calling `detach()`', () =>
    {
        runOutsideAngular.mockReset();

        expect(mockNativeOverlay.nativeMap).toBeDefined();

        mockOverlay.detach();

        expect(runOutsideAngular).toHaveBeenCalledTimes(1);
        // The map wrapper should have been updated
        expect(mockOverlay.map).toBeNull();
        // The native object should have no map assigned to it
        expect(mockNativeOverlay.nativeMap).toBeNull();
    });
});

class GoogleMapsDrawableOverlayTest extends GoogleMapsDrawableOverlay<MockNativeDrawableOverlay>
{
    protected createNativeObject(mockNative: MockNativeDrawableOverlay): MockNativeDrawableOverlay
    {
        return mockNative;
    }
    getBounds(): google.maps.LatLngBounds
    {
        throw new Error("Method not implemented.");
    }
}