import { GoogleMapsConfig, GoogleMapsLibrary, HttpProtocol } from './google-maps-config';

describe('GoogleMapsConfig', () =>
{
    it('should create an instance', () =>
    {
        expect(new GoogleMapsConfig()).toBeTruthy();
    });

    it('should allow setting of all configs', () =>
    {
        const config = new GoogleMapsConfig();

        const apiUrl = {
            key: 'dummy key',
            language: 'en',
            libraries: [GoogleMapsLibrary.Drawing, GoogleMapsLibrary.Geometry],
            location: 'maps.google.com/api',
            protocol: HttpProtocol.Https,
            region: 'dummy region'
        };

        config.recycleMapObject = true;
        config.apiUrl = apiUrl;

        expect(config.recycleMapObject).toBeTruthy();
        expect(config.apiUrl).toEqual(apiUrl);
    });
});
