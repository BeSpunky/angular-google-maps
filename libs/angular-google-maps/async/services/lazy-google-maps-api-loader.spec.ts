import { of } from 'rxjs';
import { LazyLoaderService, LazyLoadedFile } from '@bespunky/angular-zen/async';

import { LazyGoogleMapsApiLoader, GoogleMapsConfig, GoogleMapsLibrary, DefaultApiLocation, GoogleApiUrl } from '@bespunky/angular-google-maps/async';

describe('LazyGoogleMapsApiLoader', () =>
{
    let config         : GoogleMapsConfig;
    let scriptLoaderSpy: any;
    let lazyApiLoader  : LazyGoogleMapsApiLoader;
    let buildApiUrlSpy : jest.SpyInstance;

    function initLazyApiLoader()
    {
        lazyApiLoader = new LazyGoogleMapsApiLoader(config, scriptLoaderSpy);

        buildApiUrlSpy = jest.spyOn<any, any>(lazyApiLoader, 'buildApiUrl');
    }

    beforeEach(() =>
    {
        config = {
            apiUrl: {
                key: 'dummykey',
                language: 'en',
                libraries: [GoogleMapsLibrary.Drawing, GoogleMapsLibrary.Geometry],
                region: 'region'
            }
        };

        const loadedFile: LazyLoadedFile = { completed: true, type: 'script', url: 'maps-url', element: null };

        scriptLoaderSpy = { loadScript: jest.fn().mockReturnValue(of(loadedFile)) };

        initLazyApiLoader();
    });

    it('should create an instance', () => expect(lazyApiLoader).toBeTruthy());

    it('should return a promise when calling `load()`', () => expect(lazyApiLoader.load() instanceof Promise).toBeTruthy());

    it('should use default values to build api url when calling `buildApiUrl()` and nullables don\'t have a value', () =>
    {
        lazyApiLoader.load();

        expect(buildApiUrlSpy.mock.results.slice(-1)).toBe(`https://${DefaultApiLocation}?key=dummykey&libraries=drawing,geometry&language=en&region=region`);
    });

    it('should allow overriding url parts', () =>
    {
        (config.apiUrl as GoogleApiUrl).protocol = 'http';
        (config.apiUrl as GoogleApiUrl).location = 'dummy.maps.com/api';

        initLazyApiLoader();

        lazyApiLoader.load();
        
        expect(buildApiUrlSpy.mock.results.slice(-1)).toBe(`http://dummy.maps.com/api?key=dummykey&libraries=drawing,geometry&language=en&region=region`);
    });

    it('should allow overriding the url with a complete one', () =>
    {
        config.apiUrl = 'dummy.maps.com/api?dummyargs';

        initLazyApiLoader();

        lazyApiLoader.load();

        expect(buildApiUrlSpy.mock.results.slice(-1)).toBe(config.apiUrl);
    });
});
