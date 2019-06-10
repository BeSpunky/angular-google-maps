import { tick, fakeAsync, TestBed } from '@angular/core/testing';

import { GoogleMapsDrawableOverlay } from './google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../../native/overlays/i-google-maps-native-drawable-overlay';
import { IGoogleMap } from '../../../../google-map/i-google-map';
import { IGoogleMapsMarker } from '../../../../google-map/overlays/marker/i-google-maps-marker';
import { GoogleMapsApiService } from '../../../api/google-maps-api.service';
import { createDefaultTestModuleConfig } from '../../../../testing/utils';

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

class DrawableOverlayMock extends GoogleMapsDrawableOverlay
{
    constructor(map: IGoogleMap, protected api: GoogleMapsApiService, private promiseNative: Promise<IGoogleMapsNativeDrawableOverlay>)
    {
        super(map, api);
    }

    get native(): Promise<IGoogleMapsNativeDrawableOverlay>
    {
        return this.promiseNative;
    }
}

describe('GoogleMapsDrawableOverlay (abstract)', () =>
{
    let api: GoogleMapsApiService;
    let runOutsideAngularSpy: jasmine.Spy;
    let nativeOverlayMock: NativeDrawableOverlayMock;
    let overlayWrapperMock: DrawableOverlayMock;
    let mapWrapperMock: MockGoogleMap;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(createDefaultTestModuleConfig());

        api = TestBed.get(GoogleMapsApiService);

        runOutsideAngularSpy = spyOn(api, 'runOutsideAngular').and.callFake(fn => fn());

        nativeOverlayMock = new NativeDrawableOverlayMock();
        mapWrapperMock = new MockGoogleMap();
        overlayWrapperMock = new DrawableOverlayMock(mapWrapperMock, api, Promise.resolve(nativeOverlayMock));
    });

    it('should be created', () => expect(overlayWrapperMock).toBeTruthy());

    function expectMap(nativeMap: any, mapWrapper: IGoogleMap, outsideAngularCalls?: number)
    {
        expect(nativeOverlayMock.nativeMap).toBe(nativeMap);
        expect((overlayWrapperMock as any).map).toBe(mapWrapper);

        if (outsideAngularCalls)
            expect(runOutsideAngularSpy).toHaveBeenCalledTimes(outsideAngularCalls);
    }

    it('should wait for the map and add the overlay to the map passed-in at instantiation', async () =>
    {
        await mapWrapperMock.native;
        await overlayWrapperMock.native;

        expectMap(NativeMapMock, mapWrapperMock);
    });

    it('should retrieve the map when calling `getContainingMap()`', () => expect(overlayWrapperMock.getContainingMap()).toBe(mapWrapperMock));

    it('should set a new containing map to the overlay outside of angular when calling `setContainingMap()`', fakeAsync(() =>
    {
        const secondMap = new MockGoogleMap(); // First one is `mapWrapperMock`

        runOutsideAngularSpy.calls.reset();

        overlayWrapperMock.setContainingMap(secondMap);

        tick();

        expectMap(NativeMapMock, secondMap, 1);
    }));

    it('should detach the map from the overlay outside of angular when calling `removeFromMap()`', fakeAsync(() =>
    {
        runOutsideAngularSpy.calls.reset();

        overlayWrapperMock.removeFromMap();

        tick();

        expectMap(null, null, 1);
    }));
});
