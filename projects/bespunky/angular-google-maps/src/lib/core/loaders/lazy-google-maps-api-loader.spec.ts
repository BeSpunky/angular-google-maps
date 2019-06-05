import { of } from 'rxjs';
import { LazyScriptLoaderService } from '@bespunky/angular-zen';
import { LazyGoogleMapsApiLoader } from './lazy-google-maps-api-loader';
import { GoogleMapsConfig, GoogleMapsLibrary, DefaultApiLocation, HttpProtocol, GoogleApiUrl } from '../config/google-maps-config';

describe('LazyGoogleMapsApiLoader', () =>
{
    let config: GoogleMapsConfig;
    let scriptLoaderSpy: jasmine.SpyObj<LazyScriptLoaderService>;
    let lazyApiLoader: LazyGoogleMapsApiLoader;
    let buildApiUrlSpy: jasmine.Spy;

    function initLazyApiLoader()
    {
        lazyApiLoader = new LazyGoogleMapsApiLoader(config, scriptLoaderSpy);

        buildApiUrlSpy = spyOn<any>(lazyApiLoader, 'buildApiUrl');
        buildApiUrlSpy.and.callThrough();
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

        scriptLoaderSpy = jasmine.createSpyObj('lazyApiLoader', ['loadScript']);

        scriptLoaderSpy.loadScript.and.returnValue(of(true));

        initLazyApiLoader();
    });

    it('should create an instance', () =>
    {
        expect(lazyApiLoader).toBeTruthy();
    });

    it('should return a promise when calling `load()`', () =>
    {
        expect(lazyApiLoader.load() instanceof Promise).toBeTruthy();
    });

    it('should use default values to build api url when calling `buildApiUrl()` and nullables don\'t have a value', () =>
    {
        lazyApiLoader.load();

        expect(buildApiUrlSpy.calls.mostRecent().returnValue).toBe(`https://${DefaultApiLocation}?key=dummykey&libraries=drawing,geometry&language=en&region=region`);
    });

    it('should allow overriding url parts', () =>
    {
        (config.apiUrl as GoogleApiUrl).protocol = HttpProtocol.Http;
        (config.apiUrl as GoogleApiUrl).location = 'dummy.maps.com/api';

        initLazyApiLoader();

        lazyApiLoader.load();

        expect(buildApiUrlSpy.calls.mostRecent().returnValue).toBe(`http://dummy.maps.com/api?key=dummykey&libraries=drawing,geometry&language=en&region=region`);
    });

    it('should allow overriding the url with a complete one', () =>
    {
        config.apiUrl = 'dummy.maps.com/api?dummyargs';

        initLazyApiLoader();

        lazyApiLoader.load();

        expect(buildApiUrlSpy.calls.mostRecent().returnValue).toBe(config.apiUrl);
    });
});
