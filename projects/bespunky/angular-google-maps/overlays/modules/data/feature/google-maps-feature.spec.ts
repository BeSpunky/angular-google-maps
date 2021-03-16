import { configureGoogleMapsTestingModule } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap                    } from '@bespunky/angular-google-maps/core/testing';
import { MockGoogleMapsData               } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsApiService             } from '@bespunky/angular-google-maps/core';
import { GoogleMapsFeature                } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsFeature', () =>
{
    let api              : GoogleMapsApiService;
    let runOutsideAngular: jasmine.Spy;
    let feature          : GoogleMapsFeature;
    let map              : MockGoogleMap;
    let data             : MockGoogleMapsData;
    
    /** Feature properties for testing the getProperties and setProperties methods. */
    const properties = { a: 1, b: 2 };
    
    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        const nativeFeature = new google.maps.Data.Feature(
            {
                geometry: new google.maps.Data.Point({ lat: 2, lng: 2 }),
                properties
            }
        );

        map     = new MockGoogleMap();
        data    = new MockGoogleMapsData(map);
        feature = new GoogleMapsFeature(data, api, nativeFeature);

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
            expect(geoJson.geometry.type).toBe('Point');
            expect(geoJson.geometry.coordinates).toEqual([2, 2]);
        });
    });

    describe('properties', () =>
    {
        it('should be retrieved from the native feature when calling `getProperties()`', () => expect(feature.getProperties()).toEqual(properties));

        it('should set all properties to the native feature when calling `setProperties()`', () =>
        {
            const newProperties = { a: 6, c: 3, d: 4 };

            feature.setProperties(newProperties);

            expect(feature.getProperties()).toEqual(Object.assign(properties, newProperties));
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

        it('should create and set a polyline geometry outside angular when calling `setPolyline()`', async () =>
        {
            feature.setPolyline([[0, 0], [0, 1], [1, 0], [1, 1]]);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);

            const geometry = (await feature.toGeoJson()).geometry;

            expect(geometry.type).toBe('LineString');
            expect(geometry.coordinates).toEqual([[0, 0], [1, 0], [0, 1], [1, 1]]);
        });
    });
});
