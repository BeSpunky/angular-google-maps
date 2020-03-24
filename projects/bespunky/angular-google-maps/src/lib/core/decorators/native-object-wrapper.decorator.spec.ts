import { fakeAsync, tick } from '@angular/core/testing';
import { NativeObjectWrapper } from "./native-object-wrapper.decorator";
import { IGoogleMapsNativeObjectWrapper } from '../abstraction/base/i-google-maps-native-object-wrapper';

describe('@NativeObjectWrapper()', () =>
{
    let wrapper: MockMarkerWrapper;

    beforeEach(() => wrapper = new MockMarkerWrapper());

    it('should wrap `getXXX()` functions and add them as methods to the wrapper', () =>
    {
        expect(MockMarkerWrapper.prototype.getMap instanceof Function).toBeTruthy();
        expect(MockMarkerWrapper.prototype.getPosition instanceof Function).toBeTruthy();
    });

    it('should wrap `setXXX()` functions and add them as methods to the wrapper', () =>
    {
        expect(MockMarkerWrapper.prototype.setMap instanceof Function).toBeTruthy();
        expect(MockMarkerWrapper.prototype.setPosition instanceof Function).toBeTruthy();
    });

    it('should wrap getters with async functions that wait for api ready', () =>
    {
        expect(wrapper.getMap()      instanceof Promise).toBeTruthy();
        expect(wrapper.getPosition() instanceof Promise).toBeTruthy();
    });

    it('should wrap setters with async functions that wait for api ready and execute outside angular', () =>
    {
        spyOn(wrapper.api, 'runOutsideAngular').and.callThrough();

        expect(wrapper.setMap(null) instanceof Promise).toBeTruthy();
        expect(wrapper.api.runOutsideAngular).toHaveBeenCalledTimes(1);
    
        expect(wrapper.setPosition(null) instanceof Promise).toBeTruthy();
        expect(wrapper.api.runOutsideAngular).toHaveBeenCalledTimes(2);
    });

    it('should skip wrapping of manually implemented getters and setters', () =>
    {
        expect(wrapper.getTitle()).toBe('manual get wrapping');
        expect(wrapper.setTitle()).toBe('manual set wrapping');
    });

    it('should allow including extra wrappers for execution inside and outside angular', () =>
    {
        expect(MockMarkerWrapper.prototype.changed instanceof Function).toBeTruthy();
        expect(MockMarkerWrapper.prototype.notify  instanceof Function).toBeTruthy();
    });

    it('should allow specifying new names for wrapping methods', fakeAsync(() =>
    {
        expect(MockDataWrapper.prototype.addFeature  instanceof Function).toBeTruthy();
        expect(MockDataWrapper.prototype.findFeature instanceof Function).toBeTruthy();

        const mockData = new MockDataWrapper();

        spyOn(mockData.mockNative, 'add');
        spyOn(mockData.mockNative, 'getFeatureById');

        expect(mockData.findFeature(null) instanceof Promise);
        expect(mockData.addFeature(null) instanceof Promise);

        tick();

        expect(mockData.mockNative.getFeatureById).toHaveBeenCalledTimes(1);
        expect(mockData.mockNative.add).toHaveBeenCalledTimes(1);
    }));

    it('should allow excluding specific getters and setters', () =>
    {
        expect(MockMarkerWrapper.prototype.getIcon).toBeUndefined();
        expect(MockMarkerWrapper.prototype.setIcon).toBeUndefined();
    });
});

interface MockMarkerWrapper
{
    getMap     ()                            : Promise<google.maps.Map>;
    setMap     (map: google.maps.Map)        : Promise<void>;
    getPosition()                            : Promise<google.maps.LatLng>;
    setPosition(position: google.maps.LatLng): Promise<void>;

    changed    (): Promise<any>; // Explicitly included getter
    notify     (): Promise<any>; // Explicitly included setter
    
    getIcon(): void; // Explicitly excluded getter
    setIcon(): void; // Explicitly excluded setter
}

const runOutsideAngular = (fn: Function) => Promise.resolve(fn());

@NativeObjectWrapper({
    nativeType : google.maps.Marker,
    wrapInside : ['changed'],
    wrapOutside: ['notify'],
    exclude    : ['getIcon', 'setIcon']
})
class MockMarkerWrapper implements IGoogleMapsNativeObjectWrapper
{
    public mockNative = {
        getMap     : () => void 0,
        setMap     : () => void 0,
        getPosition: () => void 0,
        setPosition: () => void 0
    };
    
    native = Promise.resolve(this.mockNative);
    custom: any;

    api = { runOutsideAngular };

    getTitle() { return 'manual get wrapping'; }
    setTitle() { return 'manual set wrapping'; }
}

interface MockDataWrapper
{
    addFeature  (feature: google.maps.Data.Feature): Promise<google.maps.Map>;
    findFeature (id: string | number)              : Promise<google.maps.Data.Feature>;
}

@NativeObjectWrapper({
    nativeType : google.maps.Data,
    wrapInside : { getFeatureById: 'findFeature' },
    wrapOutside: { add: 'addFeature' }
})
class MockDataWrapper implements IGoogleMapsNativeObjectWrapper
{
    public mockNative = {
        add           : () => void 0,
        getFeatureById: ()               => void 0
    };
    
    native = Promise.resolve(this.mockNative);
    custom: any;

    api = { runOutsideAngular };
}