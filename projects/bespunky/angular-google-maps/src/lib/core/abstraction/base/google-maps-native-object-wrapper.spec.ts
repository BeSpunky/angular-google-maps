
// import { configureGoogleMapsTestingModule } from '../../../testing/setup.spec';
// import { GoogleMapsApiService } from '../../api/google-maps-api.service';
// import { MockWrapper } from '../testing/google-maps-native-wrapper.mock.spec';

// describe('GoogleMapsNativeObjectWrapper (abstract)', () =>
// {
//     let api: GoogleMapsApiService;
//     let mockNative: object;
//     let mockWrapper: MockWrapper;

//     beforeEach(async () =>
//     {
//         ({ api } = await configureGoogleMapsTestingModule());

//         mockNative = {};

//         mockWrapper = new MockWrapper(api, mockNative);
//     });

//     it('should create an instance when instantiated by a derived class', () => expect(mockWrapper).toBeTruthy());

//     it('should instantiate the native wrapper and return it via the `native` property', async () =>
//     {
//         expect(mockWrapper.native instanceof Promise).toBeTruthy();
//         expect(await mockWrapper.native).toBe(mockNative);
//     });
// });
