import { fakeAsync, tick, TestBed } from '@angular/core/testing';

import { GoogleMapsNativeObjectWrapper } from './google-maps-native-object-wrapper';
import { createDefaultTestModuleConfig } from '../../../testing/utils';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';

class MockWrapper extends GoogleMapsNativeObjectWrapper<object> { }

describe('GoogleMapsNativeObjectWrapper', () =>
{
    let api: GoogleMapsApiService;
    let create: { dummyNative: () => object };
    let runOutsideAngularSpy: jasmine.Spy;
    let createObjectSpy: jasmine.Spy;
    let mockNative: object;
    let mockWrapper: MockWrapper;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(createDefaultTestModuleConfig());

        api = TestBed.inject(GoogleMapsApiService);
        
        mockNative = {};
        create = { dummyNative: () => mockNative };

        runOutsideAngularSpy = spyOn(api, 'runOutsideAngular').and.callFake(fn => fn());
        createObjectSpy = spyOn(create, 'dummyNative');

        mockWrapper = new MockWrapper(api, create.dummyNative);
    });

    it('should create an instance when instantiated by a derived class', () =>
    {
        expect(mockWrapper).toBeTruthy();
    });

    it('should instantiate the inner native object outside of Angular', fakeAsync(() =>
    {
        expect(runOutsideAngularSpy).toHaveBeenCalledTimes(1);
        expect(createObjectSpy).toHaveBeenCalledTimes(1);

        tick();

        expect((mockWrapper.native as any).nativeObject).toBe(mockNative);
    }));

    it('should return a promise of a native object when calling the `native` getter', fakeAsync((done: DoneFn) =>
    {
        const nativePromise = mockWrapper.native;

        expect(nativePromise instanceof Promise).toBeTruthy();

        tick();

        nativePromise.then(native => expect(native).toBe(mockNative));
    }));
});
