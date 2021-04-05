
import { configureGoogleMapsTestingModule                    } from '@bespunky/angular-google-maps/testing';
import { MockNative                                          } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsApiService, GoogleMapsNativeObjectWrapper } from '@bespunky/angular-google-maps/core';

describe('GoogleMapsNativeObjectWrapper (abstract)', () =>
{
    let api              : GoogleMapsApiService;
    let runOutsideAngular: jest.SpyInstance;
    let mockNative       : MockNative;
    let mockWrapper      : GoogleMapsNativeObjectWrapperTest;

    describe('with a native', () =>
    {
        beforeEach(async () =>
        {
            ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());
    
            mockNative  = new MockNative();
            mockWrapper = new GoogleMapsNativeObjectWrapperTest(api, mockNative);
        });
    
        it('should create an instance when instantiated by a derived class', () => expect(mockWrapper).toBeTruthy());
    
        it('should instantiate and assign a new native object accessible through the `native` property', () => expect(mockWrapper.native).toBe(mockNative));
    
        it('should set the custom object when calling `setCustom()`', () =>
        {
            mockWrapper.setCustom(123);
    
            expect(mockWrapper.custom).toBe(123);
        });
    });

    describe('without a native', () =>
    {
        beforeEach(async () => ({ api } = await configureGoogleMapsTestingModule()));

        it('should throw an error if no native object was defined', () => expect(() => new GoogleMapsNativeObjectWrapperTest(api, null)).toThrow());
    });    
});

class GoogleMapsNativeObjectWrapperTest extends GoogleMapsNativeObjectWrapper<MockNative> { }