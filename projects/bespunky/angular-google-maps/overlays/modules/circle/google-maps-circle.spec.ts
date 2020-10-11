import { camelCase                                               } from '@bespunky/angular-google-maps/_internal';
import { configureGoogleMapsTestingModule                        } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap                                           } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsApiService, CoordPath, FlatCoord, NativeCoord } from '@bespunky/angular-google-maps/core';
import { GoogleMapsCircle                                        } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsCircle', () =>
{
    let api              : GoogleMapsApiService;
    let circle          : GoogleMapsCircle;
    let runOutsideAngular: jasmine.Spy;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        circle = new GoogleMapsCircle(api, new MockGoogleMap());

        runOutsideAngular.calls.reset();
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(circle).toBeTruthy());
    });

    describe('path handling', () =>
    {
        // Also tests the getPath() method
        function testPath(makePath: () => CoordPath)
        {
            spyOn(circle.native, 'setPaths').and.callThrough();

            const path    = makePath();
            const literal = api.geometry.toLiteralMultiPath(path);

            circle.setPath(path);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(circle.native.setPaths).toHaveBeenCalledTimes(1);
            expect(circle.native.setPaths).toHaveBeenCalledWith(literal);
            expect(circle.getPath()).toEqual(literal);
        }

        const literalPath: NativeCoord[] = [{ lat: 10, lng: 20 }, { lat: 20, lng: 30 }, { lat: 30, lng: 40 }];
        const flatPath   : FlatCoord  [] = [[10, 20], [20, 30], [30, 40]];

        it('should set the circle coords outside angular when given coords for a single circle literal',    () => testPath(() => literalPath));
        it('should set the circle coords outside angular when given coords for a single circle flat array', () => testPath(() => flatPath));
        it('should set the circle coords outside angular when given coords for a single circle MVCArray',   () => testPath(() => new google.maps.MVCArray(literalPath)));
        
        it('should set the circle coords outside angular when given coords for a multi circle literal',     () => testPath(() => [literalPath, literalPath]));
        it('should set the circle coords outside angular when given coords for a multi circle flat array',  () => testPath(() => [flatPath, flatPath]));
        it('should set the circle coords outside angular when given coords for a multi circle MVCArray',    () => testPath(() => new google.maps.MVCArray([new google.maps.MVCArray(literalPath), new google.maps.MVCArray(literalPath)])));
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
        it('should set geodesic',        () => testOption('geodesic', true));
    });
});
