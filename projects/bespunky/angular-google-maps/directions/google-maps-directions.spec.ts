import { configureGoogleMapsTestingModule      } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap, produceBoundsLikeSpecs } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsApiService, BoundsLike      } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDirections                  } from '@bespunky/angular-google-maps/directions';

describe('GoogleMapsDirections', () =>
{
    let api              : GoogleMapsApiService;
    let directions       : GoogleMapsDirections;
    let runOutsideAngular: jasmine.Spy;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        directions = new GoogleMapsDirections(api, new MockGoogleMap());

        runOutsideAngular.calls.reset();
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(directions).toBeTruthy());

        // Also tests the getPosition method
        function testPosition(makeCoord: () => BoundsLike)
        {
            spyOn(directions.native, 'setPosition').and.callThrough();

            const coord   = makeCoord();
            const literal = api.geometry.centerOf(coord);
                
            directions.setPosition(coord);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(directions.native.setPosition).toHaveBeenCalledTimes(1);
            expect(directions.native.setPosition).toHaveBeenCalledWith(literal);
            expect(directions.getPosition()).toEqual(literal);
        }

        produceBoundsLikeSpecs('set the position of the directions outside angular', coord => testPosition(() => coord));
    });
});
