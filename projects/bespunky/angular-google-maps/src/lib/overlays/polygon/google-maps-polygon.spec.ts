import { configureGoogleMapsTestingModule } from '../../testing/setup.spec';
import { GoogleMapsPolygon } from './google-maps-polygon';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { MockGoogleMap } from '../../google-map/testing/mock-google-map.spec';

describe('GoogleMapsPolygon', () =>
{
    let api: GoogleMapsApiService;
    let polygon: GoogleMapsPolygon;

    beforeEach(async () =>
    {
        ({ api } = await configureGoogleMapsTestingModule());

        polygon = new GoogleMapsPolygon(api, new MockGoogleMap());
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(polygon).toBeTruthy());
    });
});
