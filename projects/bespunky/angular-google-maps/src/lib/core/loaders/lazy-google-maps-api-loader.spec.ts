import { LazyGoogleMapsApiLoader } from './lazy-google-maps-api-loader';

describe('LazyGoogleMapsApiLoader', () =>
{
    it('should create an instance', () =>
    {
        expect(new LazyGoogleMapsApiLoader(null, null)).toBeTruthy();
    });
});
