import { configureGoogleMapsTestingModule } from '../../testing/setup.spec';
import { GoogleMapsMarker } from './google-maps-marker';
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { MockGoogleMap } from '../../google-map/testing/mock-google-map.spec';
import { Coord } from '../../core/abstraction/types/geometry.type';

describe('GoogleMapsMarker', () =>
{
    let api              : GoogleMapsApiService;
    let marker           : GoogleMapsMarker;
    let runOutsideAngular: jasmine.Spy;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        marker = new GoogleMapsMarker(api, new MockGoogleMap());

        runOutsideAngular.calls.reset();
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(marker).toBeTruthy());

        // Also tests the getPosition method
        function testPosition(makeCoord: () => Coord)
        {
            spyOn(marker.native, 'setPosition').and.callThrough();

            const coord   = makeCoord();
            const literal = api.geometry.toLiteralCoord(coord);
                
            marker.setPosition(coord);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(marker.native.setPosition).toHaveBeenCalledTimes(1);
            expect(marker.native.setPosition).toHaveBeenCalledWith(literal);
            expect(marker.getPosition()).toEqual(literal);
        }

        it('should set the position of the marker outside angular using a LatLng object',        () => testPosition(() => new google.maps.LatLng(10, 20)));
        it('should set the position of the marker outside angular using a LatLngLiteral object', () => testPosition(() => ({ lat: 10, lng: 20 })));
        it('should set the position of the marker outside angular using a FlatCoord array',      () => testPosition(() => [10, 20]));
    });
});
