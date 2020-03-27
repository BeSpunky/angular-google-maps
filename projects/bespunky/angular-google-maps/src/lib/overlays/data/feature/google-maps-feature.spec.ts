import { ElementRef } from '@angular/core';

import { configureGoogleMapsTestingModule } from '../../../testing/setup';
import { GoogleMapsFeature } from './google-maps-feature';
import { GoogleMapsApiService } from '../../../core/api/google-maps-api.service';
import { GoogleMap } from '../../../google-map/google-map';
import { GoogleMapsData } from '../google-maps-data';

const elementStub = document.createElement('div');

describe('GoogleMapsFeature', () =>
{
    let api: GoogleMapsApiService;
    let runOutsideAngular: jasmine.Spy;
    let feature: GoogleMapsFeature;
    let map: GoogleMap;
    let data: GoogleMapsData;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        map = new GoogleMap(api, new ElementRef(elementStub));
        data = new GoogleMapsData(api, map);
        feature = new GoogleMapsFeature(data, api, { geometry: new google.maps.Data.Point({ lat: 2, lng: 2 }) });
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
