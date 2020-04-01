
import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { configureGoogleMapsTestingModule } from '../../../testing/setup.spec';
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';
import { MockEmittingWrapper } from '../testing/google-maps-emitting-wrapper.mock.spec';

describe('GoogleMapsNativeObjectEmittingWrapper (abstract)', () =>
{
    let api: GoogleMapsApiService;
    let mockWrapper: MockEmittingWrapper;
    const mockNative: IGoogleMapsNativeObject = {};

    beforeEach(async () =>
    {
        ({ api } = await configureGoogleMapsTestingModule());

        mockWrapper = new MockEmittingWrapper(api, mockNative);
    });

    it('should create an instance when instantiated by a derived class', () =>
    {
        expect(mockWrapper).toBeTruthy();
    });

    it('should wait for the native object then register a listener when calling `listenTo()`', async () =>
    {
        spyOn(google.maps.event, 'addListener').and.callThrough();

        await mockWrapper.listenTo('dummyEvent', () => true);

        expect(google.maps.event.addListener).toHaveBeenCalledTimes(1);
    });

    it('should wait for the native object then unregister all listeners when calling `stopListeningTo()', async () =>
    {
        // spyOn(google.maps.event, 'clearListeners').and.callFake((native, eventName) => true);

        // await mockWrapper.clearListenersFor('dummyEvent');

        // expect(google.maps.event.clearListeners).toHaveBeenCalledTimes(1);
    });
});


