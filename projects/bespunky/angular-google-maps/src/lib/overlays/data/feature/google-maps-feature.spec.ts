
import { configureGoogleMapsTestingModule } from '../../../testing/setup.spec';
import { GoogleMapsFeature } from './google-maps-feature';
import { GoogleMapsApiService } from '../../../core/api/google-maps-api.service';
import { MockGoogleMap } from '../../../google-map/testing/mock-google-map.spec';
import { MockGoogleMapsData } from '../testing/mock-google-maps-data.spec';

describe('GoogleMapsFeature', () =>
{
    let api: GoogleMapsApiService;
    let feature: GoogleMapsFeature;
    let map: MockGoogleMap;
    let data: MockGoogleMapsData;

    beforeEach(async () =>
    {
        ({ api } = await configureGoogleMapsTestingModule());

        map = new MockGoogleMap();
        data = new MockGoogleMapsData(map);
        feature = new GoogleMapsFeature(api, data, { geometry: new google.maps.Data.Point({ lat: 2, lng: 2 }) });
    });

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
