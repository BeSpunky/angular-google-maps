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

        it('should return the bounds of the current directions');

        it('should return the panel used for textual directions wrapped as an `ElementRef`');

        it('should set the panel used for textual directions outside angular when given an `ElementRef`');
        it('should set the panel used for textual directions outside angular when given an `HTMLElement`');
    });
});
