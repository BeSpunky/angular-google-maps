import { configureGoogleMapsTestingModule } from '../../testing/setup.spec';
import { GoogleMapsMarker } from './google-maps-marker';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { MockGoogleMap } from '../../google-map/testing/mock-google-map.spec';

describe('GoogleMapsMarker', () =>
{
    let api: GoogleMapsApiService;
    let marker: GoogleMapsMarker;

    beforeEach(async () =>
    {
        ({ api } = await configureGoogleMapsTestingModule());

        marker = new GoogleMapsMarker(api, new MockGoogleMap());
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(marker).toBeTruthy());
    });
});
