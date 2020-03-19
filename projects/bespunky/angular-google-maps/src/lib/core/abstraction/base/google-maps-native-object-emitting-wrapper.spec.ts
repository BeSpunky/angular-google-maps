import { fakeAsync, tick, TestBed } from '@angular/core/testing';

import { GoogleMapsNativeObjectEmittingWrapper } from './google-maps-native-object-emitting-wrapper';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { createDefaultTestModuleConfig } from '../../../testing/utils';
import { IGoogleMapsEmittingNativeObject } from '../native/i-google-maps-emitting-native-object';

describe('GoogleMapsNativeObjectEmittingWrapper', () =>
{
    let api: GoogleMapsApiService;
    let mockWrapper: MockWrapper;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(createDefaultTestModuleConfig());

        api = TestBed.inject(GoogleMapsApiService);

        return mockWrapper = new MockWrapper(api, () => new google.maps.Marker());
    });

    it('should create an instance when instantiated by a derived class', () =>
    {
        expect(mockWrapper).toBeTruthy();
    });

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

const mockNative: IGoogleMapsEmittingNativeObject = {
    addListener: (eventName: string, handler: () => void) => 'listenerAdded'
};

class MockWrapper extends GoogleMapsNativeObjectEmittingWrapper<google.maps.Marker>
{

}