import { TestBed } from '@angular/core/testing';

import { createDefaultTestModuleConfig, expectPositionEquals } from '../../testing/utils';
import { GoogleMapsMarker } from './google-maps-marker';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { GoogleMap } from '../../google-map/google-map';
import { ElementRef } from '@angular/core';

const elementStub = document.createElement('div');

describe('GoogleMapsMarker', () =>
{
    let api: GoogleMapsApiService;
    let marker: GoogleMapsMarker;
    let map: GoogleMap;
    let position: google.maps.LatLng;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(createDefaultTestModuleConfig());

        api = TestBed.get(GoogleMapsApiService);

        position = new google.maps.LatLng(11, 11);

        map = new GoogleMap(new ElementRef(elementStub), api);
        marker = new GoogleMapsMarker(map, api, { position });
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(marker).toBeTruthy());

        it('should create a native marker when api is ready', async () =>
        {
            await api.whenReady;

            expect((marker as any).marker instanceof google.maps.Marker).toBeTruthy();
        });

        it('should wait for api and retrieve the native marker when calling the `native` getter', async () => expect(await marker.native instanceof google.maps.Marker).toBeTruthy());
    });

    describe('upon calling getter functions', () =>
    {
        it('should wait for api and return the position of the marker', async () => expectPositionEquals(await marker.getPosition(), position));
    });

    describe('upon calling setter functions', () =>
    {
        let runOutsideAngularSpy: jasmine.Spy;

        beforeEach(() =>
        {
            runOutsideAngularSpy = spyOn(api, 'runOutsideAngular').and.callFake(async (fn: () => void) =>
            {
                await api.whenReady;

                return fn();
            });
        });

        it('should wait for api and set the position of the marker outside angular', async () =>
        {
            const pos = { lat: 12, lng: 33 };

            marker.setPosition(pos);

            expect(runOutsideAngularSpy).toHaveBeenCalledTimes(1);

            await api.whenReady;

            expectPositionEquals(await marker.getPosition(), pos);
        });
    });
});
