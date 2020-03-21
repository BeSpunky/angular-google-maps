import { ElementRef } from '@angular/core';

import { configureGoogleMapsTestingModule } from '../../testing/setup';
import { expectPositionEquals } from '../../testing/expectations';
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

    beforeEach(() =>
    {
        ({ api, spies: { runOutsideAngular } } = configureGoogleMapsTestingModule());

        position = new google.maps.LatLng(11, 11);

        map = new GoogleMap(new ElementRef(elementStub), api);
        marker = new GoogleMapsMarker(map, api, { position });
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(marker).toBeTruthy());
    });

    describe('upon calling getter functions', () =>
    {
        it('should wait for api and return the position of the marker', async () => expectPositionEquals(await marker.getPosition(), position));
    });

    describe('upon calling setter functions', () =>
    {
        beforeEach(() => runOutsideAngular.calls.reset());

        it('should wait for api and set the position of the marker outside angular', async () =>
        {
            const pos = { lat: 12, lng: 33 };

            marker.setPosition(pos);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);

            await api.whenReady;

            expectPositionEquals(await marker.getPosition(), pos);
        });
    });
});
