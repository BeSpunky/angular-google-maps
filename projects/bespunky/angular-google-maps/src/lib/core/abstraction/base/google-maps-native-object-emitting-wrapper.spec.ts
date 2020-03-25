
import { GoogleMapsNativeObjectEmittingWrapper } from './google-maps-native-object-emitting-wrapper';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { configureGoogleMapsTestingModule } from '../../../testing/setup';
import { IGoogleMapsEmittingNativeObject } from '../native/i-google-maps-emitting-native-object';

describe('GoogleMapsNativeObjectEmittingWrapper (abstract)', () =>
{
    let api: GoogleMapsApiService;
    let mockWrapper: MockWrapper;

    beforeEach(() =>
    {
        ({ api } = configureGoogleMapsTestingModule());

        mockWrapper = new MockWrapper(api, mockNative);
    });

    it('should create an instance when instantiated by a derived class', () =>
    {
        expect(mockWrapper).toBeTruthy();
    });

    it('should wait for the native object then register a listener when calling `listenTo()`', async () =>
    {
        spyOn(mockNative, 'addListener').and.callThrough();

        await mockWrapper.listenTo('dummyEvent', () => true);

        expect(mockNative.addListener).toHaveBeenCalledTimes(1);
    });

    it('should wait for the native object then unregister all listeners when calling `stopListeningTo()', async () =>
    {
        spyOn(google.maps.event, 'clearListeners').and.callFake((native, eventName) => true);

        await mockWrapper.stopListeningTo('dummyEvent');

        expect(google.maps.event.clearListeners).toHaveBeenCalledTimes(1);
    });
});

const mockNative: IGoogleMapsEmittingNativeObject = {
    addListener: (eventName: string, handler: () => void) => 'listenerAdded'
};

class MockWrapper extends GoogleMapsNativeObjectEmittingWrapper<IGoogleMapsEmittingNativeObject>
{
    constructor(api: GoogleMapsApiService, private mockNativeObject: IGoogleMapsEmittingNativeObject)
    {
        super(api);
    }

    public createNativeObject(): IGoogleMapsEmittingNativeObject
    {
        return this.mockNativeObject;
    }
}