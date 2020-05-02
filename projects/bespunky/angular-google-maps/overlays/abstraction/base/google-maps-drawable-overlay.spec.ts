
import { configureGoogleMapsTestingModule } from '../../../core/testing/helpers/setup.spec';
import { GoogleMapsApiService } from '../../../src/lib/core/api/google-maps-api.service';
import { MockGoogleMap } from '../../../src/lib/google-map/testing/mock-google-map.spec';
import { MockNativeDrawableOverlay } from '../../testing/mocks/mock-native-drawable-overlay.spec';
import { GoogleMapsDrawableOverlay } from './google-maps-drawable-overlay';

describe('GoogleMapsDrawableOverlay (abstract)', () =>
{
    let api              : GoogleMapsApiService;
    let runOutsideAngular: jasmine.Spy;
    let mockMap          : MockGoogleMap;
    let mockNativeOverlay: MockNativeDrawableOverlay;
    let mockOverlay      : GoogleMapsDrawableOverlayTest;

    beforeAll(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        mockMap           = new MockGoogleMap({ id: 1, zoom: 1 });
        mockNativeOverlay = new MockNativeDrawableOverlay();
        mockOverlay       = new GoogleMapsDrawableOverlayTest(api, mockMap, 0, mockNativeOverlay);
    });

    it('should be created', () => expect(mockOverlay).toBeTruthy());

    it('should add the overlay to the map on instantiation', () => expect(mockOverlay.map).toBe(mockMap));

    it('should add the overlay to the map outside angular when calling `attach()`', () =>
    {
        runOutsideAngular.calls.reset();

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
        runOutsideAngular.calls.reset();

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
}