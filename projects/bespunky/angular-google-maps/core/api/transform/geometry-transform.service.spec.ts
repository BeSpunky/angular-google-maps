import {
    produceCoordSpecs, produceSinglePathSpecs, produceMultiPathSpecs, producePathSpecs, produceIBoundsSpecs,
    expectCoord, expectPath, expectBounds,
    northEast, southWest, mockBounds, flatCoord, flatPath, allDummyCoords, allDummySinglePaths, allDummyMultiPaths, allDummyBounds
} from '@bespunky/angular-google-maps/core/testing';

import { GeometryTransformService } from '@bespunky/angular-google-maps/core';

describe('GeometryTransformService', () =>
{
    const geometry = new GeometryTransformService();

    describe('Basically', () =>
    {
        it('should be created', () => expect(geometry).toBeTruthy());
    });    

    describe('toLiteralCoord', () => produceCoordSpecs('transform coord to a native literal coord', (coord) =>
    {
        const literal = geometry.toLiteralCoord(coord);

        expect(geometry.isLiteralCoord(literal)).toBeTrue();
        expectCoord(() => literal, coord);
    }));

    describe('toFlatCoord', () => produceCoordSpecs('transform coord to a flat coord', (coord) =>
    {
        const flat = geometry.toFlatCoord(coord);

        expect(geometry.isFlatCoord(coord)).toBeTrue();
        expectCoord(() => flat, coord);
    }));
    
    describe('toLiteralMultiPath', () => producePathSpecs('convert a single-path to multi-path', (path) => expectPath(() => geometry.toLiteralMultiPath(path), path)));

    describe('castMultiPath', () =>
    {
        produceSinglePathSpecs('convert a single-path to multi-path', (path) => expect(geometry.isMultiPath(geometry.castMultiPath(path))).toBeTruthy());
        produceMultiPathSpecs('return the multi-path as is',         (path) => expect(geometry.castMultiPath(path)).toBe(path));
    });

    function testTypeGuardFalseAgainstStandardValues(guard: (value: any) => boolean)
    {
        expect(guard(null)).toBeFalsy();
        expect(guard(undefined)).toBeFalsy();
        expect(guard({})).toBeFalsy();
        expect(guard([])).toBeFalsy();
        expect(guard([[]])).toBeFalsy();
        expect(guard(10)).toBeFalsy();
        expect(guard('hello')).toBeFalsy();
    }

    describe('isMultiPath', () =>
    {
        produceSinglePathSpecs('determine weather the path is a multi-path', (path) => expect(geometry.isMultiPath(path)).toBeFalse());
        produceMultiPathSpecs ('determine weather the path is a multi-path', (path) => expect(geometry.isMultiPath(path)).toBeTrue());
    });
    
    describe('isLiteralCoord', () =>
    {
        it('should determine whether an object is a native literal coord', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => geometry.isLiteralCoord(value));
            
            expect(geometry.isLiteralCoord({ north: 1, south: 1, east: 1 })).toBeFalse();
            expect(geometry.isLiteralCoord({ lat: 1 })).toBeFalse();
            expect(geometry.isLiteralCoord({ lng: 1 })).toBeFalse();

            expect(geometry.isLiteralCoord({ lat: 1, lng: 1 })).toBeTrue();
        });
    });

    describe('isFlatCoord', () =>
    {
        it('should determine whether an object is a flat coord', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => geometry.isFlatCoord(value));
            
            expect(geometry.isFlatCoord([-91, 0])).toBeFalsy();
            expect(geometry.isFlatCoord([0, -181])).toBeFalsy();
            expect(geometry.isFlatCoord([91, 0])).toBeFalsy();
            expect(geometry.isFlatCoord([0, 181])).toBeFalsy();
            
            expect(geometry.isFlatCoord([-90, 0])).toBeTruthy();
            expect(geometry.isFlatCoord([0, -180])).toBeTruthy();
            expect(geometry.isFlatCoord([90, 0])).toBeTruthy();
            expect(geometry.isFlatCoord([0, 180])).toBeTruthy();
        });
    });

    describe('isBounds', () =>
    {
        it('should determine whether an object is a native bounds object', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => geometry.isBounds(value));

            expect(geometry.isBounds({ north: 1, south: 1, east: 1 })).toBeFalse();

            expect(geometry.isBounds({ north: 1, south: 1, east: 1, west: 1 })).toBeTrue();
            expect(geometry.isBounds(new google.maps.LatLngBounds())).toBeTrue();
        });
    });

    describe('isBoundsLiteral', () =>
    {
        it('should determine whether an object is a native bounds literal object', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => geometry.isBoundsLiteral(value));

            expect(geometry.isBoundsLiteral({ north: 1, south: 1, east: 1 })).toBeFalse();

            expect(geometry.isBoundsLiteral({ north: 1, south: 1, east: 1, west: 1 })).toBeTrue();
        });
    });

    describe('isIBounds', () =>
    {
        it('should determine whether an object implements the IBounds interface', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => geometry.isIBounds(value));

            expect(geometry.isIBounds({ north: 1, south: 1, east: 1 })).toBeFalse();
            expect(geometry.isIBounds({ north: 1, south: 1, east: 1, west: 1 })).toBeFalse();
            expect(geometry.isIBounds(new google.maps.LatLngBounds())).toBeFalse();

            expect(geometry.isIBounds(mockBounds)).toBeTrue();
        });
    });

    describe('isDataLayerGeometry', () =>
    {
        it('should determine whether an object is a native data layer geometry object', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => geometry.isDataLayerGeometry(value));
            
            expect(geometry.isDataLayerGeometry(new google.maps.Circle())).toBeFalse();

            expect(geometry.isDataLayerGeometry(new google.maps.Data.Geometry())).toBeTrue();
        });
    });

    describe('createDataPoint',   () => produceCoordSpecs('create a native geometry for a point',   (coord) => expectCoord(() => geometry.createDataPoint(coord).get(), coord)));
    describe('createDataPolygon', () => producePathSpecs ('create a native geometry for a polygon', (path)  => expectPath (() => geometry.createDataPolygon(path).getArray(), path)));

    describe('defineCoordBounds', () => produceCoordSpecs('define the bounds', (coord) => expectBounds(() => geometry.defineCoordBounds(coord), coord, coord)));
    describe('definePathBounds',  () => producePathSpecs ('define the bounds', (path)  => expectBounds(() => geometry.definePathBounds(path), northEast, southWest)));
    
    describe('defineGeometryBounds', () =>
    {
        it('should define the bounds for a data layer point',   () => expectBounds(() => geometry.defineGeometryBounds(geometry.createDataPoint(flatCoord)), flatCoord, flatCoord));
        it('should define the bounds for a data layer polygon', () => expectBounds(() => geometry.defineGeometryBounds(geometry.createDataPolygon(flatPath)), northEast, southWest));
    });
    
    describe('defineBounds', () =>
    {
        produceCoordSpecs  ('define the bounds', (coord)     => expectBounds(() => geometry.defineBounds(coord), coord, coord));
        producePathSpecs   ('define the bounds', (path)      => expectBounds(() => geometry.defineBounds(path), northEast, southWest));
        produceIBoundsSpecs('define the bounds', (boundable) => expectBounds(() => geometry.defineBounds(boundable), boundable.getBounds().getNorthEast(), boundable.getBounds().getSouthWest()));
        
        it('should define the containing bounds of all specified elements combined', () =>
        {
            expectBounds(() => geometry.defineBounds(
                ...allDummyCoords,
                ...allDummySinglePaths,
                ...allDummyMultiPaths,
                ...allDummyBounds
            ), northEast, southWest);
        });
    });
});
