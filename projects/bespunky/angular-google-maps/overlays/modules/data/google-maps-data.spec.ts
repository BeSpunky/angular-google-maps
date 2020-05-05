import { configureGoogleMapsTestingModule                 } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMapsFeature, MockGoogleMapWithOverlays } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsApiService                             } from '@bespunky/angular-google-maps/core';
import { GoogleMapsData, IGoogleMapsFeature               } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsData', () =>
{
    let api              : GoogleMapsApiService;
    let runOutsideAngular: jasmine.Spy;
    let map              : MockGoogleMapWithOverlays;
    let data             : GoogleMapsData;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        map  = new MockGoogleMapWithOverlays();
        data = new GoogleMapsData(api, map);

        runOutsideAngular.calls.reset();
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(data).toBeTruthy());
    });

    describe('calling `addFeature()`', () =>
    {
        function testAdd(featureData: () => any)
        {
            spyOn(data.native, 'add');

            const feature = data.addFeature(featureData());

            expect(runOutsideAngular.calls.count()).toBeGreaterThan(0);
            expect(data.native.add).toHaveBeenCalledTimes(1);
            expect(data.native.add).toHaveBeenCalledWith(feature.native);
        }

        it('should wrap and add a native feature to the data outside angular', () => testAdd(() => ({ geometry: new google.maps.Data.Point({ lat: 20, lng: 20 }) })));

        it('should add a wrapper feature to the data outside angular',         () => testAdd(() => new MockGoogleMapsFeature(data)));

        it('should notify tracker of new features', () =>
        {
            expect(data.features.isEmpty).toBeTruthy();

            data.addFeature(new MockGoogleMapsFeature(data));

            expect(data.features.hasFeatures).toBeTruthy();
        });
    });

    describe('calling `removeFeature()`', () =>
    {
        function testRemove(removeBy: (feature: IGoogleMapsFeature) => any)
        {
            spyOn(data.native, 'remove');

            const feature = data.addFeature({ id: 'tested', geometry: new google.maps.Data.Point({ lat: 20, lng: 20 }) });
            
            runOutsideAngular.calls.reset();

            const removed = data.removeFeature(removeBy(feature));

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(data.native.remove).toHaveBeenCalledTimes(1);
            expect(data.native.remove).toHaveBeenCalledWith(feature.native);
            expect(removed).toBe(feature);
        }

        it('should find and remove a native feature outside angular and return the removed feature',  () => testRemove(feature => feature.native));
        
        it('should find and remove a wrapper feature outside angular and return the removed feature', () => testRemove(feature => feature));

        it('should find and remove a feature by id outside angular and return the removed feature',   () => testRemove(feature => feature.native.getId()));

        it('should return null if the feature is not found', () => expect(data.removeFeature(new MockGoogleMapsFeature(data))).toBeNull());

        it('should notify tracker of removed feature', () =>
        {
            const feature = new MockGoogleMapsFeature(data);

            data.features.add(feature);
            data.removeFeature(feature);

            expect(data.features.isEmpty).toBeTruthy();
        });
    });

    describe('GeoJson handling', () =>
    {
        it('should load GeoJson data from a url when calling `loadGeoJson()` outside angular', async () =>
        {
            const url = 'https://dummyurl.json';
            const options: google.maps.Data.GeoJsonOptions = { idPropertyName: 'id' };
            const native = data.native;
    
            const loadSpy = spyOn(native, 'loadGeoJson').and.callFake((url, options, callback) => callback());
    
            runOutsideAngular.calls.reset();
    
            await data.loadGeoJson(url, options);
    
            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(loadSpy).toHaveBeenCalledTimes(1);
            expect(loadSpy.calls.argsFor(0)[0]).toBe(url);
            expect(loadSpy.calls.argsFor(0)[1]).toBe(options);
        });

        it('should convert and return the data in its GeoJson representation when calling `toGeoJson()`', async () =>
        {
            const geoJson = await data.toGeoJson();
            
            expect(typeof geoJson).toBe('object');
            expect(geoJson.type).toBe('FeatureCollection');
            expect(geoJson?.features instanceof Array).toBeTruthy();
        });
    });

    describe('Overlay management', () =>
    {
        it('should create, add and return a marker feature outside angular when calling `createMarker()`', async () =>
        {
            // Adding geometry options to make sure it is overriden by the position argument
            const feature = data.createMarker({ lat: 20, lng: 21 }, { id: 'bombom', geometry: new google.maps.Data.Point({ lat: 10, lng: 10 }) });

            const geoJson = await feature.toGeoJson();
            
            expect(runOutsideAngular.calls.count()).toBeGreaterThan(0);
            expect(geoJson.id).toBe('bombom');
            expect(geoJson.geometry.type).toBe('Point');
            expect(geoJson.geometry.coordinates).toEqual([21, 20]);
        });

        it('should create, add and return a polygon feature outside angular when calling `createPolygon()`', async () =>
        {
            // Adding geometry options to make sure it is overriden by the path argument
            const feature = data.createPolygon([
                { lat: 20, lng: 21 },
                { lat: 21, lng: 22 },
                { lat: 22, lng: 23 }
            ], { id: 'bombom', geometry: new google.maps.Data.Point({ lat: 10, lng: 10 }) });

            const geoJson = await feature.toGeoJson();
            
            expect(runOutsideAngular.calls.count()).toBeGreaterThan(0);
            expect(geoJson.id).toBe('bombom');
            expect(geoJson.geometry.type).toBe('Polygon');
            expect(geoJson.geometry.coordinates).toEqual([[[21, 20],[22,21],[23,22],[21,20]]]);
        });
    });
});
