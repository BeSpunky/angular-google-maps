import { ElementRef } from '@angular/core';

import { configureGoogleMapsTestingModule } from '../../testing/setup.spec';
import { GoogleMapsMarker } from './google-maps-marker';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { GoogleMap } from '../../google-map/google-map';

const elementStub = document.createElement('div');

describe('GoogleMapsMarker', () =>
{
    let api: GoogleMapsApiService;
    let runOutsideAngular: jasmine.Spy;
    let marker: GoogleMapsMarker;
    let map: GoogleMap;
    let position: google.maps.LatLng;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        position = new google.maps.LatLng(11, 11);

        map = new GoogleMap(api, new ElementRef(elementStub));
        marker = new GoogleMapsMarker(api, map, { position });
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(marker).toBeTruthy());
    });
});
