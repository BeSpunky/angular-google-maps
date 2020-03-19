import { tick, fakeAsync, TestBed } from '@angular/core/testing';

import { createDefaultTestModuleConfig } from '../../../testing/utils';
import { GoogleMapsDrawableOverlay } from './google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';
import { IGoogleMap } from '../../../google-map/i-google-map';
import { IGoogleMapsMarker } from '../../../overlays/marker/i-google-maps-marker';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { OverlayType } from './overlay-type.enum';

describe('GoogleMapsDrawableOverlay (abstract)', () =>
{
    let api: GoogleMapsApiService;
    let runOutsideAngularSpy: jasmine.Spy;
    let mockMap: MockGoogleMap;
    let mockNativeOverlay: NativeDrawableOverlayMock;
    let mockOverlay: DrawableOverlayMock;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(createDefaultTestModuleConfig());

        api = TestBed.get(GoogleMapsApiService);

        runOutsideAngularSpy = spyOn(api, 'runOutsideAngular').and.callFake(fn => fn());

        mockMap           = new MockGoogleMap();
        mockNativeOverlay = new NativeDrawableOverlayMock();
        mockOverlay       = new DrawableOverlayMock(mockMap, api);
    });

    it('should be created', () => expect(mockOverlay).toBeTruthy());

    function expectMap(nativeMap: any, mapWrapper: IGoogleMap, outsideAngularCalls?: number)
    {
        expect(mockNativeOverlay.nativeMap).toBe(nativeMap);
        expect((mockOverlay as any).map).toBe(mapWrapper);

        if (outsideAngularCalls)
            expect(runOutsideAngularSpy).toHaveBeenCalledTimes(outsideAngularCalls);
    }

    it('should wait for the map and add the overlay to the map passed-in at instantiation', async () =>
    {
        await mockMap.native;
        await mockOverlay.native;

        expectMap(NativeMapMock, mockMap);
    });

    it('should retrieve the map when calling `getContainingMap()`', () => expect(mockOverlay.getContainingMap()).toBe(mockMap));

    it('should set a new containing map to the overlay outside of angular when calling `setContainingMap()`', fakeAsync(() =>
    {
        const secondMap = new MockGoogleMap(); // First one is `mockMap`

        runOutsideAngularSpy.calls.reset();

        mockOverlay.setContainingMap(secondMap);

        tick();

        expectMap(NativeMapMock, secondMap, 1);
    }));

    it('should detach the map from the overlay outside of angular when calling `removeFromMap()`', fakeAsync(() =>
    {
        runOutsideAngularSpy.calls.reset();

        mockOverlay.removeFromMap();

        tick();

        expectMap(null, null, 1);
    }));
});

const NativeMapMock = {
    zoom: 4
};

class MockGoogleMap implements IGoogleMap
{
    native = Promise.resolve(NativeMapMock);

    custom: any;

    getCenter(): Promise<google.maps.LatLng>                                                { throw new Error('Method not implemented.'); }
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): void                 { throw new Error('Method not implemented.'); }
    getZoom(): Promise<number>                                                              { throw new Error('Method not implemented.'); }
    setZoom(zoomLevel: number): void                                                        { throw new Error('Method not implemented.'); }
    createMarker(options?: google.maps.ReadonlyMarkerOptions): Promise<IGoogleMapsMarker>   { throw new Error('Method not implemented.'); }
    listenTo(eventName: string, handler: () => void): void                                  { throw new Error('Method not implemented.'); }
    stopListeningTo(eventName: string): void                                                { throw new Error('Method not implemented.'); }
}

class NativeDrawableOverlayMock implements IGoogleMapsNativeDrawableOverlay
{
    public nativeMap: any;

    setMap(map: google.maps.Map): void { this.nativeMap = map; }
    addListener(eventName: string, handler: () => void): void      { throw new Error('Method not implemented.'); }
}

class DrawableOverlayMock extends GoogleMapsDrawableOverlay<google.maps.Marker>
{
    constructor(map: IGoogleMap, protected api: GoogleMapsApiService)
    {
        super(OverlayType.Marker, map, api, () => new google.maps.Marker());
    }
}