import { camelCase                             } from '@bespunky/angular-google-maps/_internal';
import { configureGoogleMapsTestingModule      } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap, produceBoundsLikeSpecs } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsApiService, BoundsLike      } from '@bespunky/angular-google-maps/core';
import { GoogleMapsCircle                      } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsCircle', () =>
{
    let api              : GoogleMapsApiService;
    let circle          : GoogleMapsCircle;
    let runOutsideAngular: jasmine.Spy;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        circle = new GoogleMapsCircle(new MockGoogleMap(), api, new google.maps.Circle());

        runOutsideAngular.calls.reset();
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(circle).toBeTruthy());
    });

    describe('path handling', () =>
    {
        // Also tests the getCenter() method
        function testCenter(makeElement: () => BoundsLike)
        {
            spyOn(circle.native, 'setCenter').and.callThrough();

            const element = makeElement();
            const center  = api.geometry.centerOf(element);

            circle.setCenter(element);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(circle.native.setCenter).toHaveBeenCalledTimes(1);
            expect(circle.native.setCenter).toHaveBeenCalledWith(center);
            expect(circle.getCenter()).toEqual(center);
        }

        produceBoundsLikeSpecs(`set the circle's center outside angular`, center => testCenter(() => center));
    });

    describe('option delegation', () =>
    {
        function testOption(option: string, value: any)
        {
            expect(circle.native.get(option)).not.toBe(value);
            
            // Set the option
            circle[`set${camelCase(option, true)}`](value);
            
            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(circle.native.get(option)).toBe(value);
        }

        it('should set clickable',       () => testOption('clickable', true));
        it('should set fill color',      () => testOption('fillColor', '#fff'));
        it('should set fill opacity',    () => testOption('fillOpacity', 0.1));
        it('should set stroke color',    () => testOption('strokeColor', '#000'));
        it('should set stroke opacity',  () => testOption('strokeOpacity', 0.5));
        it('should set stroke position', () => testOption('strokePosition', google.maps.StrokePosition.CENTER));
        it('should set stroke weight',   () => testOption('strokeWeight', 2));
        it('should set z-index',         () => testOption('zIndex', 999));
    });
});
