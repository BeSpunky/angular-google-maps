
import { configureGoogleMapsTestingModule } from '../../../testing/setup';
import { GoogleMapsDrawableOverlay } from './google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';
import { IGoogleMap } from '../../../google-map/i-google-map';
import { IGoogleMapsMarker } from '../../../overlays/marker/i-google-maps-marker';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { OverlayType } from './overlay-type.enum';
import { fakeAsync, tick } from '@angular/core/testing';

describe('GoogleMapsDrawableOverlay (abstract)', () =>
{
    let api: GoogleMapsApiService;
    let runOutsideAngular: jasmine.Spy;
    let mockMap: MockGoogleMap;
    let mockNativeOverlay: NativeDrawableOverlayMock;
    let mockOverlay: DrawableOverlayMock;

    beforeAll(() =>
    {
        ({ api, spies: { runOutsideAngular } } = configureGoogleMapsTestingModule());

        spyOn(DrawableOverlayMock.prototype, 'setContainingMap').and.callThrough();

        mockMap = new MockGoogleMap({ id: 1, zoom: 1 });
        mockNativeOverlay = new NativeDrawableOverlayMock();
        mockOverlay = new DrawableOverlayMock(mockMap, api, mockNativeOverlay);
    });

    it('should be created', () => expect(mockOverlay).toBeTruthy());

    it('should wait for the map and add the overlay to the map passed-in at instantiation', () =>
    {
        // This assumes that the functionallity of `setContainingMap()` is tested in a different procedure, and only verifies that
        // it was called with the right parameters.
        expect(DrawableOverlayMock.prototype.setContainingMap).toHaveBeenCalledTimes(1);
        expect(DrawableOverlayMock.prototype.setContainingMap).toHaveBeenCalledWith(mockMap);
    });

    it('should retrieve the map when calling `getContainingMap()`', () => expect(mockOverlay.getContainingMap()).toBe(mockMap));

    it('should set a new containing map to the overlay outside of angular when calling `setContainingMap()`', async () =>
    {
        runOutsideAngular.calls.reset();

        const secondNativeMap = { id: 2, zoom: 2 };
        const secondMap = new MockGoogleMap(secondNativeMap); // First one was `mockMap`

        await mockOverlay.setContainingMap(secondMap);

        expect(runOutsideAngular).toHaveBeenCalledTimes(1);
        // The map wrapper should have been updated
        expect(mockOverlay.map).toBe(secondMap);
        // The inner native map should have been updated
        expect(mockNativeOverlay.nativeMap).toBe(secondNativeMap);
    });

    it('should detach the map from the overlay outside of angular when calling `removeFromMap()`', async () =>
    {
        runOutsideAngular.calls.reset();

        expect(mockNativeOverlay.nativeMap).toBeDefined();

        spyOn(mockNativeOverlay, 'setMap').and.callThrough();

        await mockOverlay.removeFromMap();

        expect(runOutsideAngular).toHaveBeenCalledTimes(1);
        // The map wrapper should have been updated
        expect(mockOverlay.map).toBeNull();
        // The native `setMap()` method should've been called with `null`
        expect(mockNativeOverlay.setMap).toHaveBeenCalledWith(null);
        // The native object should have no map assigned to it
        expect(mockNativeOverlay.nativeMap).toBeNull();
    });
});

class MockGoogleMap implements IGoogleMap
{
    native = Promise.resolve(this.nativeMapMock);

    custom: any;

    constructor(private nativeMapMock: object) { }

    getCenter(): Promise<google.maps.LatLng> { throw new Error('Method not implemented.'); }
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): Promise<void> { throw new Error('Method not implemented.'); }
    getZoom(): Promise<number> { throw new Error('Method not implemented.'); }
    setZoom(zoomLevel: number): Promise<void> { throw new Error('Method not implemented.'); }
    createMarker(options?: google.maps.ReadonlyMarkerOptions): Promise<IGoogleMapsMarker> { throw new Error('Method not implemented.'); }
    listenTo(eventName: string, handler: () => void): Promise<void> { throw new Error('Method not implemented.'); }
    stopListeningTo(eventName: string): Promise<void> { throw new Error('Method not implemented.'); }
}

class NativeDrawableOverlayMock implements IGoogleMapsNativeDrawableOverlay
{
    public nativeMap: any;

    setMap(map: google.maps.Map): void { this.nativeMap = map; }
    addListener(eventName: string, handler: () => void): void { throw new Error('Method not implemented.'); }
}

class DrawableOverlayMock extends GoogleMapsDrawableOverlay<NativeDrawableOverlayMock>
{
    constructor(public map: IGoogleMap, protected api: GoogleMapsApiService, private mockNativeOverlay: NativeDrawableOverlayMock)
    {
        super(OverlayType.Marker, map, api);
    }

    protected createNativeObject(): NativeDrawableOverlayMock
    {
        return this.mockNativeOverlay;
    }
}