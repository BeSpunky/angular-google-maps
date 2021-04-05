import {
    produceCoordSpecs, produceSinglePathSpecs, produceMultiPathSpecs, producePathSpecs, produceIBoundsSpecs,
    expectCoord, expectPath, expectBounds,
    northEast, southWest, iBounds, flatCoord, flatPath, allDummyCoords, allDummySinglePaths, allDummyMultiPaths, allDummyBounds, literalPath, latLngPath, mvcPath, linearRingPath, mvcMultiLinearRingPath, mvcMultiPath, produceBoundsLikeSpecs, produceDataGeometrySpecs
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

        expect(geometry.isLiteralCoord(literal)).toBeTruthy();
        expectCoord(() => literal, coord);
    }));

    describe('toFlatCoord', () => produceCoordSpecs('transform coord to a flat coord', (coord) =>
    {
        const flat = geometry.toFlatCoord(coord);

        expect(geometry.isFlatCoord(flat)).toBeTruthy();
        expectCoord(() => flat, coord);
    }));
    
    describe('toLiteralMultiPath', () => producePathSpecs('convert a single-path to multi-path', (path) => expectPath(() => geometry.toLiteralMultiPath(path), path)));

    describe('castMultiPath', () =>
    {
        produceSinglePathSpecs('convert a single-path to multi-path', (path) => expect(geometry.isMultiPath(geometry.castMultiPath(path))).toBeTruthy());
        produceMultiPathSpecs('return the multi-path as is',          (path) => expect(geometry.castMultiPath(path)).toBe(path));
    });

    function testTypeGuardFalseAgainstStandardValues(guard: (value: any) => boolean, config?: { skipArrays?: boolean })
    {
        expect(guard(null)).toBeFalsy();
        expect(guard(undefined)).toBeFalsy();
        expect(guard({})).toBeFalsy();
        expect(guard(10)).toBeFalsy();
        expect(guard('hello')).toBeFalsy();

        if (!config?.skipArrays)
        {
            expect(guard([])).toBeFalsy();
            expect(guard([[]])).toBeFalsy();
        }
    }

    describe('isFlatCoordPath', () =>
    {
        it('should return `false` for standard values', () => testTypeGuardFalseAgainstStandardValues((value) => geometry.isFlatCoordPath(value)));
        
        produceSinglePathSpecs('determine whether the path is flat coord path', (path) =>
        {
            const expectIsFlatCoordPath = expect(geometry.isFlatCoordPath(path));

            path === flatPath ? expectIsFlatCoordPath.toBeTruthy() : expectIsFlatCoordPath.toBeFalsy();
        });
        produceMultiPathSpecs ('determine whether the path is flat coord path', (path) => expect(geometry.isFlatCoordPath(path)).toBeFalsy());
    });

    describe('isNativeCoordPath', () =>
    {
        it('should return `false` for standard values', () => testTypeGuardFalseAgainstStandardValues((value) => geometry.isNativeCoordPath(value)));

        produceSinglePathSpecs('determine whether the path is a native coord path', (path) =>
        {
            const expectIsNativeCoordPath = expect(geometry.isNativeCoordPath(path));

            path === literalPath || path === latLngPath ? expectIsNativeCoordPath.toBeTruthy() : expectIsNativeCoordPath.toBeFalsy();
        });
        produceMultiPathSpecs ('determine whether the path is a native coord path', (path) => expect(geometry.isNativeCoordPath(path)).toBeFalsy());
    });

    describe('isNativePath', () =>
    {
        it('should return `false` for standard values', () => testTypeGuardFalseAgainstStandardValues((value) => geometry.isNativePath(value)));

        produceSinglePathSpecs('determine whether the path is a native path', (path) =>
        {
            const expectIsNativePath = expect(geometry.isNativePath(path));

            path === mvcPath || path === linearRingPath ? expectIsNativePath.toBeTruthy() : expectIsNativePath.toBeFalsy();
        });
        produceMultiPathSpecs('determine whether the path is a native path', (path) =>
        {
            const expectIsNativePath = expect(geometry.isNativePath(path));

            path === mvcMultiPath || path === mvcMultiLinearRingPath ? expectIsNativePath.toBeTruthy() : expectIsNativePath.toBeFalsy();
        });
    });
        
    describe('isSinglePath', () =>
    {
        produceSinglePathSpecs('determine whether the path is a single path', (path) => expect(geometry.isSinglePath(path)).toBeTruthy());
        produceMultiPathSpecs ('determine whether the path is a single path', (path) => expect(geometry.isSinglePath(path)).toBeFalsy());
    });

    describe('isMultiPath', () =>
    {
        produceSinglePathSpecs('determine whether the path is a multi-path', (path) => expect(geometry.isMultiPath(path)).toBeFalsy());
        produceMultiPathSpecs ('determine whether the path is a multi-path', (path) => expect(geometry.isMultiPath(path)).toBeTruthy());
    });

    describe('isCoordPath', () =>
    {
        it('should return `false` for standard values', () => testTypeGuardFalseAgainstStandardValues((value) => geometry.isCoordPath(value), { skipArrays: true }));
        it('should return `true` for empty arrays', () => expect(geometry.isCoordPath([])).toBeTruthy());

        producePathSpecs('determine whether the path is a multi-path', (path) => expect(geometry.isCoordPath(path)).toBeTruthy());
    });
    
    describe('isLiteralCoord', () =>
    {
        it('should determine whether an object is a native literal coord', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => geometry.isLiteralCoord(value));
            
            expect(geometry.isLiteralCoord({ north: 1, south: 1, east: 1 })).toBeFalsy();
            expect(geometry.isLiteralCoord({ lat: 1 })).toBeFalsy();
            expect(geometry.isLiteralCoord({ lng: 1 })).toBeFalsy();

            expect(geometry.isLiteralCoord({ lat: 1, lng: 1 })).toBeTruthy();
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

    describe('isCoord', () =>
    {
        it('should return `false` for standard values', () => testTypeGuardFalseAgainstStandardValues((value) => geometry.isCoord(value)));
        
        produceCoordSpecs('determine whether the value is a coord', (value) => expect(geometry.isCoord(value)).toBeTruthy());
        producePathSpecs('determine whether the value is a coord' , (path ) => expect(geometry.isCoord(path)).toBeFalsy());
    });
    
    describe('isNativeBounds', () =>
    {
        it('should determine whether an object is a native bounds object', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => geometry.isNativeBounds(value));

            expect(geometry.isNativeBounds({ north: 1, south: 1, east: 1 })).toBeFalsy();

            expect(geometry.isNativeBounds({ north: 1, south: 1, east: 1, west: 1 })).toBeTruthy();
            expect(geometry.isNativeBounds(new google.maps.LatLngBounds())).toBeTruthy();
        });
    });

    describe('isBoundsLiteral', () =>
    {
        it('should determine whether an object is a native bounds literal object', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => geometry.isBoundsLiteral(value));

            expect(geometry.isBoundsLiteral({ north: 1, south: 1, east: 1 })).toBeFalsy();

            expect(geometry.isBoundsLiteral({ north: 1, south: 1, east: 1, west: 1 })).toBeTruthy();
        });
    });

    describe('isIBounds', () =>
    {
        it('should determine whether an object implements the IBounds interface', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => geometry.isIBounds(value));

            expect(geometry.isIBounds({ north: 1, south: 1, east: 1 })).toBeFalsy();
            expect(geometry.isIBounds({ north: 1, south: 1, east: 1, west: 1 })).toBeFalsy();
            expect(geometry.isIBounds(new google.maps.LatLngBounds())).toBeFalsy();

            expect(geometry.isIBounds(iBounds)).toBeTruthy();
        });
    });

    describe('isBoundsLike', () =>
    {
        it('should return `false` for standard values', () => testTypeGuardFalseAgainstStandardValues((value) => geometry.isBoundsLike(value), { skipArrays: true }));
        it('should return `true` for empty arrays', () => expect(geometry.isBoundsLike([])).toBeTruthy());

        produceBoundsLikeSpecs('determine whether the value is bounds like', (value) => expect(geometry.isBoundsLike(value)).toBeTruthy());
    });

    describe('isDataLayerGeometry', () =>
    {
        it('should determine whether an object is a native data layer geometry object', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => geometry.isDataLayerGeometry(value));
            
            expect(geometry.isDataLayerGeometry(new google.maps.Circle())).toBeFalsy();

            expect(geometry.isDataLayerGeometry(new google.maps.Data.Geometry())).toBeTruthy();
        });
    });

    describe('createDataPoint',   () => produceCoordSpecs('create a native geometry for a point',     (coord) => expectCoord(() => geometry.createDataPoint(coord).get(), coord)));
    describe('createDataPolygon', () => producePathSpecs ('create a native geometry for a polygon',   (path)  => expectPath (() => geometry.createDataPolygon(path).getArray(), path)));
    describe('createDataPolyline', () => produceSinglePathSpecs ('create a native geometry for a polyline', (path)  => expectPath (() => geometry.createDataPolyline(path).getArray(), path)));

    describe('defineCoordBounds', () => produceCoordSpecs('define the bounds', (coord) => expectBounds(() => geometry.defineCoordBounds(coord), coord, coord)));
 
    describe('definePathBounds',  () => producePathSpecs('define the bounds',  (path)  => expectBounds(() => geometry.definePathBounds(path), northEast, southWest)));
    
    describe('defineGeometryBounds', () =>
    {
        it('should define the bounds for a data layer point',   () => expectBounds(() => geometry.defineGeometryBounds(geometry.createDataPoint(flatCoord)), flatCoord, flatCoord));
        it('should define the bounds for a data layer polygon', () => expectBounds(() => geometry.defineGeometryBounds(geometry.createDataPolygon(flatPath)), northEast, southWest));
    });
    
    describe('defineBounds', () =>
    {
        produceCoordSpecs       ('define the bounds', (coord)     => expectBounds(() => geometry.defineBounds(coord), coord, coord));
        producePathSpecs        ('define the bounds', (path)      => expectBounds(() => geometry.defineBounds(path), northEast, southWest));
        produceIBoundsSpecs     ('define the bounds', (boundable) => expectBounds(() => geometry.defineBounds(boundable), boundable.getBounds().getNorthEast(), boundable.getBounds().getSouthWest()));
        
        produceDataGeometrySpecs('define the bounds', (feature) =>
        {
            feature instanceof google.maps.Data.Point ?
                expectBounds(() => geometry.defineBounds(feature), southWest, southWest) :
                expectBounds(() => geometry.defineBounds(feature), northEast, southWest);
        });

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
