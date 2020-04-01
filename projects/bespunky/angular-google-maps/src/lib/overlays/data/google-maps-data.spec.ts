// import { ElementRef } from '@angular/core';

// import { configureGoogleMapsTestingModule } from '../../testing/setup.spec';
// import { GoogleMapsData } from './google-maps-data';
// import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
// import { GoogleMap } from '../../google-map/google-map';

// const elementStub = document.createElement('div');

// describe('GoogleMapsData', () =>
// {
//     let api: GoogleMapsApiService;
//     let runOutsideAngular: jasmine.Spy;
//     let data: GoogleMapsData;
//     let map: GoogleMap;

//     beforeEach(async () =>
//     {
//         ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

//         map = new GoogleMap(api, new ElementRef(elementStub));
//         data = new GoogleMapsData(api, map);
//     });

//     it('should create an instance', () => expect(data).toBeTruthy());
    
//     it('should find and remove a feature outside angular when passing an id to `removeFeature()`', async () =>
//     {
//         const feature = new google.maps.Data.Feature({ geometry: new google.maps.Data.Point({ lng: 1, lat: 1 }), id: 'tested' });

//         data.addFeature(feature);

//         const native = await data.native;

//         spyOn(native, 'remove').and.stub();

//         runOutsideAngular.calls.reset();

//         await data.removeFeature('tested');

//         expect(runOutsideAngular).toHaveBeenCalledTimes(1);
//         expect(native.remove).toHaveBeenCalledTimes(1);
//         expect(native.remove).toHaveBeenCalledWith(feature);
//     });

//     it('should remove a feature outside angular when passing a feature object to `removeFeature()`', async () =>
//     {
//         const feature = new google.maps.Data.Feature({ geometry: new google.maps.Data.Point({ lng: 1, lat: 1 }), id: 'tested' });

//         data.addFeature(feature);

//         const native = await data.native;

//         spyOn(native, 'remove').and.stub();

//         runOutsideAngular.calls.reset();

//         await data.removeFeature(feature);

//         expect(runOutsideAngular).toHaveBeenCalledTimes(1);
//         expect(native.remove).toHaveBeenCalledTimes(1);
//         expect(native.remove).toHaveBeenCalledWith(feature);
//     });

//     it('should load a GeoJson outside of angular when calling `loadGeoJson()`', async () =>
//     {
//         const url = 'https://dummyurl.json';
//         const options: google.maps.Data.GeoJsonOptions = { idPropertyName: 'id' };
//         const native = await data.native;

//         const loadSpy = spyOn(native, 'loadGeoJson').and.callFake((url, options, callback) => callback());

//         runOutsideAngular.calls.reset();

//         await data.loadGeoJson(url, options);

//         expect(runOutsideAngular).toHaveBeenCalledTimes(1);
//         expect(loadSpy).toHaveBeenCalledTimes(1);
//         expect(loadSpy.calls.argsFor(0)[0]).toBe(url);
//         expect(loadSpy.calls.argsFor(0)[1]).toBe(options);
//     });

//     it('should return a GeoJson object representing the data when calling `toGeoJson()`', async () =>
//     {
//         const geoJson = await data.toGeoJson();
        
//         expect(typeof geoJson).toBe('object');
//         expect(geoJson.type).toBe('FeatureCollection');
//         expect(geoJson?.features instanceof Array).toBeTruthy();
//     });
// });
