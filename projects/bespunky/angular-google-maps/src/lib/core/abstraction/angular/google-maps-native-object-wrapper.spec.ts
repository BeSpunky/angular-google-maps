import { fakeAsync, tick } from '@angular/core/testing';

import { GoogleMapsNativeObjectWrapper } from './google-maps-native-object-wrapper';
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';

const mockNative: IGoogleMapsNativeObject = {
    addListener: (eventName: string, handler: () => void) => 'listenerAdded'
};

class MockWrapper extends GoogleMapsNativeObjectWrapper
{
    get native(): Promise<IGoogleMapsNativeObject>
    {
        return new Promise(resolve => resolve(mockNative));
    }
}

describe('GoogleMapsNativeObjectWrapper', () =>
{
    let mockWrapper: MockWrapper;

    beforeEach(() => mockWrapper = new MockWrapper());

    it('should create an instance when instantiated by a derived class', () =>
    {
        expect(mockWrapper).toBeTruthy();
    });

    it('should return a promise of a native object when calling the `native` getter', fakeAsync((done: DoneFn) =>
    {
        const nativePromise = mockWrapper.native;

        expect(nativePromise instanceof Promise).toBeTruthy();

        tick();

        nativePromise.then(native => expect(native.addListener instanceof Function).toBeTruthy());
    }));

    it('should wait for the native object then register a listener when calling `listenTo()`', fakeAsync(() =>
    {
        spyOn(mockNative, 'addListener').and.callThrough();

        mockWrapper.listenTo('dummyEvent', () => true);

        tick();

        expect(mockNative.addListener).toHaveBeenCalledTimes(1);
    }));

    it('should wait for the native object then unregister all listeners when calling `stopListeningTo()', fakeAsync(() =>
    {
        spyOn(google.maps.event, 'clearListeners').and.callFake((native, eventName) => true);

        mockWrapper.stopListeningTo('dummyEvent');

        tick();

        expect(google.maps.event.clearListeners).toHaveBeenCalledTimes(1);
    }));
});
