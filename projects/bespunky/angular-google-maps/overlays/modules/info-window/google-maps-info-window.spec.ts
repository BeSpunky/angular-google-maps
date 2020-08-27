import { configureGoogleMapsTestingModule } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap                    } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsApiService, Coord      } from '@bespunky/angular-google-maps/core';
import { GoogleMapsInfoWindow                 } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsInfoWindow', () =>
{
    let api              : GoogleMapsApiService;
    let infoWindow           : GoogleMapsInfoWindow;
    let runOutsideAngular: jasmine.Spy;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        infoWindow = new GoogleMapsInfoWindow(api, new MockGoogleMap());

        runOutsideAngular.calls.reset();
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(infoWindow).toBeTruthy());

        // Also tests the getPosition method
        function testPosition(makeCoord: () => Coord)
        {
            spyOn(infoWindow.native, 'setPosition').and.callThrough();

            const coord   = makeCoord();
            const literal = api.geometry.toLiteralCoord(coord);
                
            infoWindow.setPosition(coord);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(infoWindow.native.setPosition).toHaveBeenCalledTimes(1);
            expect(infoWindow.native.setPosition).toHaveBeenCalledWith(literal);
            expect(infoWindow.getPosition()).toEqual(literal);
        }

        it('should set the position of the infoWindow outside angular using a LatLng object',        () => testPosition(() => new google.maps.LatLng(10, 20)));
        it('should set the position of the infoWindow outside angular using a LatLngLiteral object', () => testPosition(() => ({ lat: 10, lng: 20 })));
        it('should set the position of the infoWindow outside angular using a FlatCoord array',      () => testPosition(() => [10, 20]));
    });
});
