
import { configureGoogleMapsTestingModule } from '../../../testing/setup.spec';
import { GoogleMapsFeature } from './google-maps-feature';
import { GoogleMapsApiService } from '../../../core/api/google-maps-api.service';
import { MockGoogleMap } from '../../../google-map/testing/mock-google-map.spec';
import { MockGoogleMapsData } from '../../../../testing/overlays/mocks/modules/mock-google-maps-data.spec';

describe('GoogleMapsFeature', () =>
{
    let api              : GoogleMapsApiService;
    let runOutsideAngular: jasmine.Spy;
    let feature          : GoogleMapsFeature;
    let map              : MockGoogleMap;
    let data             : MockGoogleMapsData;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        map     = new MockGoogleMap();
        data    = new MockGoogleMapsData(map);
        feature = new GoogleMapsFeature(api, data, { geometry: new google.maps.Data.Point({ lat: 2, lng: 2 }) });

        runOutsideAngular.calls.reset();
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(feature).toBeTruthy());

        it('should return a GeoJson object representing the feature when calling `toGeoJson()`', async () =>
        {
            const geoJson = await feature.toGeoJson();

            expect(typeof geoJson).toBe('object');
            expect(geoJson.type).toBe('Feature');
            expect(geoJson?.geometry?.type).toBe('Point');
            expect(geoJson?.geometry?.coordinates).toEqual([2, 2]);
        });
    });

    describe('quick feature geometry', () =>
    {
        it('should create and set a point geometry outside angular when calling `setMarker()`', async () =>
        {
            feature.setMarker([1, 0]);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);

            const geometry = (await feature.toGeoJson()).geometry;

            expect(geometry.type).toBe('Point');
            expect(geometry.coordinates).toEqual([0, 1]);
        });

        it('should create and set a polygon geometry outside angular when calling `setPolygon()`', async () =>
        {
            feature.setPolygon([[0, 0], [0, 1], [1, 0], [1, 1]]);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);

            const geometry = (await feature.toGeoJson()).geometry;

            expect(geometry.type).toBe('Polygon');
            expect(geometry.coordinates).toEqual([[[0, 0], [1, 0], [0, 1], [1, 1], [0, 0]]]);
        });
    });
});
