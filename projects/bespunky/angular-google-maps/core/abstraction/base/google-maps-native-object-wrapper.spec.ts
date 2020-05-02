
import { GoogleMapsNativeObjectWrapper } from './google-maps-native-object-wrapper';
import { configureGoogleMapsTestingModule } from '../../../testing/core/setup.spec';
import { MockNative } from '../testing/src/mock-native.spec';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';

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