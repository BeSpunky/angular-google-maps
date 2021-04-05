import { camelCase                                          } from '@bespunky/angular-google-maps/_internal';
import { configureGoogleMapsTestingModule                   } from '@bespunky/angular-google-maps/testing';
import { MockGoogleMap                                      } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsApiService, FlatCoord, NativeCoord, Path } from '@bespunky/angular-google-maps/core';
import { GoogleMapsPolyline                                 } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapsPolyline', () =>
{
    let api              : GoogleMapsApiService;
    let polyline         : GoogleMapsPolyline;
    let runOutsideAngular: jest.SpyInstance;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        polyline = new GoogleMapsPolyline(new MockGoogleMap(), api, new google.maps.Polyline());

        runOutsideAngular.mockReset();
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(polyline).toBeTruthy());
    });

    describe('path handling', () =>
    {
        // Also tests the getPath() method
        function testPath(makePath: () => Path)
        {
            jest.spyOn(polyline.native, 'setPath');

            const path    = makePath();
            const literal = api.geometry.toLiteralMultiPath(path)[0];

            polyline.setPath(path);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(polyline.native.setPath).toHaveBeenCalledTimes(1);
            expect(polyline.native.setPath).toHaveBeenCalledWith(literal);
            expect(polyline.getPath()).toEqual(literal);
        }

        const literalPath: NativeCoord[] = [{ lat: 10, lng: 20 }, { lat: 20, lng: 30 }, { lat: 30, lng: 40 }];
        const flatPath   : FlatCoord  [] = [[10, 20], [20, 30], [30, 40]];

        it('should set the polyline coords outside angular when given coords for a single polyline literal',    () => testPath(() => literalPath));
        it('should set the polyline coords outside angular when given coords for a single polyline flat array', () => testPath(() => flatPath));
        it('should set the polyline coords outside angular when given coords for a single polyline MVCArray',   () => testPath(() => new google.maps.MVCArray(literalPath)));
    });

    describe('option delegation', () =>
    {
        function testOption(option: string, value: any)
        {
            expect(polyline.native.get(option)).not.toBe(value);
            
            // Set the option
            polyline[`set${camelCase(option, true)}`](value);
            
            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(polyline.native.get(option)).toBe(value);
        }

        it('should set clickable',       () => testOption('clickable', true));
        it('should set stroke color',    () => testOption('strokeColor', '#000'));
        it('should set stroke opacity',  () => testOption('strokeOpacity', 0.5));
        it('should set stroke weight',   () => testOption('strokeWeight', 2));
        it('should set z-index',         () => testOption('zIndex', 999));
        it('should set geodesic',        () => testOption('geodesic', true));
    });
});
