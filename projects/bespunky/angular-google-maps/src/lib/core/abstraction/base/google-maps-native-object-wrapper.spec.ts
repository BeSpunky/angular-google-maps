
import { GoogleMapsNativeObjectWrapper } from './google-maps-native-object-wrapper';
import { configureGoogleMapsTestingModule } from '../../../testing/setup.spec';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';

describe('GoogleMapsNativeObjectWrapper (abstract)', () =>
{
    let api: GoogleMapsApiService;
    let runOutsideAngular: jasmine.Spy;
    let createObjectSpy: jasmine.Spy;
    let mockNative: object;
    let mockWrapper: MockWrapper;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        mockNative = {};

        createObjectSpy = spyOn(MockWrapper.prototype, 'createNativeObject').and.callThrough();

        mockWrapper = new MockWrapper(api, mockNative);
    });

    it('should create an instance when instantiated by a derived class', () =>
    {
        expect(mockWrapper).toBeTruthy();
    });

    it('should return a promise of a native object when calling the `native` getter', () =>
    {
        expect(mockWrapper.native instanceof Promise).toBeTruthy();
    });

    it('should instantiate the inner native object outside of angular', async () =>
    {
        const native = await mockWrapper.native;
        
        expect(runOutsideAngular).toHaveBeenCalledTimes(1);
        expect(createObjectSpy).toHaveBeenCalledTimes(1);
        expect(native).toBe(mockNative);
    });
});

class MockWrapper extends GoogleMapsNativeObjectWrapper<object>
{
    constructor(api: GoogleMapsApiService, private mockNativeObject: object)
    {
        super(api);
    }

    public createNativeObject(): object
    {
        return this.mockNativeObject;
    }
}