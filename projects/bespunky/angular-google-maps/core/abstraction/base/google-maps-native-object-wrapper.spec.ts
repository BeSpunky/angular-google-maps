
import { configureGoogleMapsTestingModule, MockNative        } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsApiService, GoogleMapsNativeObjectWrapper } from '@bespunky/angular-google-maps/core';

describe('GoogleMapsNativeObjectWrapper (abstract)', () =>
{
    let api              : GoogleMapsApiService;
    let runOutsideAngular: jasmine.Spy;
    let mockWrapper      : GoogleMapsNativeObjectWrapperTest;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        mockWrapper = new GoogleMapsNativeObjectWrapperTest(api);
    });

    it('should create an instance when instantiated by a derived class', () => expect(mockWrapper).toBeTruthy());

    it('should instantiate a new native object outside angular', () => expect(runOutsideAngular).toHaveBeenCalledTimes(1));

    it('should instantiate and assign a new native object to the accessible through the `native` property', () => expect(mockWrapper.native instanceof MockNative).toBeTruthy());
});

class GoogleMapsNativeObjectWrapperTest extends GoogleMapsNativeObjectWrapper<MockNative>
{
    protected createNativeObject(...nativeArgs: any[]): MockNative
    {
        return new MockNative();
    }
}