import { GoogleApiUrl, GoogleMapsConfig, GoogleMapsLibrary } from '@bespunky/angular-google-maps/async';

describe('GoogleMapsConfig', () =>
{
    it('should create an instance', () =>
    {
        expect(new GoogleMapsConfig()).toBeTruthy();
    });

    it('should allow setting of all configs', () =>
    {
        const config = new GoogleMapsConfig();

        const apiUrl: GoogleApiUrl = {
            key      : 'dummy key',
            language : 'en',
            libraries: [GoogleMapsLibrary.Drawing, GoogleMapsLibrary.Geometry],
            location : 'maps.google.com/api',
            protocol : 'https',
            region   : 'dummy region'
        };

        config.apiUrl = apiUrl;

        expect(config.apiUrl).toEqual(apiUrl);
    });
});
