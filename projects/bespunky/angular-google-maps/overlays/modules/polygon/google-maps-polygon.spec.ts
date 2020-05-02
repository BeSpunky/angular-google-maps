import { upperFirst } from 'lodash';

import { configureGoogleMapsTestingModule                        } from '@bespunky/angular-google-maps/core/testing';
import { MockGoogleMapWithOverlays                               } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsApiService, CoordPath, FlatCoord, NativeCoord } from '@bespunky/angular-google-maps/core';
import { GoogleMapsPolygon } from './google-maps-polygon';

describe('GoogleMapsPolygon', () =>
{
    let api              : GoogleMapsApiService;
    let polygon          : GoogleMapsPolygon;
    let runOutsideAngular: jasmine.Spy;

    beforeEach(async () =>
    {
        ({ api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule());

        polygon = new GoogleMapsPolygon(api, new MockGoogleMapWithOverlays());

        runOutsideAngular.calls.reset();
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(polygon).toBeTruthy());
    });

    describe('path handling', () =>
    {
        // Also tests the getPath() method
        function testPath(makePath: () => CoordPath)
        {
            spyOn(polygon.native, 'setPaths').and.callThrough();

            const path    = makePath();
            const literal = api.geometry.toLiteralMultiPath(path);

            polygon.setPath(path);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(polygon.native.setPaths).toHaveBeenCalledTimes(1);
            expect(polygon.native.setPaths).toHaveBeenCalledWith(literal);
            expect(polygon.getPath()).toEqual(literal);
        }

        const literalPath: NativeCoord[] = [{ lat: 10, lng: 20 }, { lat: 20, lng: 30 }, { lat: 30, lng: 40 }];
        const flatPath   : FlatCoord  [] = [[10, 20], [20, 30], [30, 40]];

        it('should set the polygon coords outside angular when given coords for a single polygon literal',    () => testPath(() => literalPath));
        it('should set the polygon coords outside angular when given coords for a single polygon flat array', () => testPath(() => flatPath));
        it('should set the polygon coords outside angular when given coords for a single polygon MVCArray',   () => testPath(() => new google.maps.MVCArray(literalPath)));
        
        it('should set the polygon coords outside angular when given coords for a multi polygon literal',     () => testPath(() => [literalPath, literalPath]));
        it('should set the polygon coords outside angular when given coords for a multi polygon flat array',  () => testPath(() => [flatPath, flatPath]));
        it('should set the polygon coords outside angular when given coords for a multi polygon MVCArray',    () => testPath(() => new google.maps.MVCArray([new google.maps.MVCArray(literalPath), new google.maps.MVCArray(literalPath)])));
    });

    describe('option delegation', () =>
    {
        function testOption(setterName: string, value: any)
        {
            spyOn(polygon.native, 'setOptions');

            // Set the option
            polygon[`set${upperFirst(setterName)}`](value);

            expect(runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(polygon.native.setOptions).toHaveBeenCalledTimes(1);
            expect(polygon.native.setOptions).toHaveBeenCalledWith({ [setterName]: value });
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
