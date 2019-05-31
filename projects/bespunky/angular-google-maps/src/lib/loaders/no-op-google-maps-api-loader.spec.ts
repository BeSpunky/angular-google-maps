import { NoOpGoogleMapsApiLoader } from './no-op-google-maps-api-loader';

describe('NoOpGoogleMapsApiLoader', () =>
{
    it('should create an instance', () =>
    {
        expect(new NoOpGoogleMapsApiLoader(null)).toBeTruthy();
    });
});
