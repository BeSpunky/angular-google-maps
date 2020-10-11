import { configureGoogleMapsTestingModule      } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap, produceBoundsLikeSpecs } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsApiService, BoundsLike      } from '@bespunky/angular-google-maps/core';
import { GoogleMapsMarker                      } from '@bespunky/angular-google-maps/overlays';

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
        function testPosition(makeCoord: () => BoundsLike)
        {
            spyOn(marker.native, 'setPosition').and.callThrough();

            const coord   = makeCoord();
            const literal = api.geometry.centerOf(coord);
                
            marker.setPosition(coord);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(marker.native.setPosition).toHaveBeenCalledTimes(1);
            expect(marker.native.setPosition).toHaveBeenCalledWith(literal);
            expect(marker.getPosition()).toEqual(literal);
        }

        produceBoundsLikeSpecs('set the position of the marker outside angular', coord => testPosition(() => coord));
    });
});
