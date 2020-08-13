import { configureGoogleMapsTestingModule } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap                    } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsApiService, Coord      } from '@bespunky/angular-google-maps/core';
import { GoogleMapsMarker                 } from '@bespunky/angular-google-maps/overlays';

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
