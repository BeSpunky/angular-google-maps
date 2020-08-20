import { GeometryTransformService, Coord, CoordPath, FlatCoord, Path, MultiPath } from '@bespunky/angular-google-maps/core';

describe('GeometryTransformService', () =>
{
    let geometry = new GeometryTransformService();

    // These are the different coord and path shapes supported by the service. The following are dummy paths for testing.
    const flatCoord    = [10, 11] as FlatCoord;
    const literalCoord = geometry.toLiteralCoord(flatCoord);
    const latLngCoord  = new google.maps.LatLng(literalCoord);

    const flatPath       = [[10, 11], [20, 22], [30, 33], [40, 44]] as FlatCoord[];
    const literalPath    = flatPath.map(coord => geometry.toLiteralCoord(coord));
    const latLngPath     = flatPath.map(coord => new google.maps.LatLng(coord[0], coord[1]));
    const mvcPath        = new google.maps.MVCArray(flatPath.map(coord => geometry.toLiteralCoord(coord)));
    const linearRingPath = new google.maps.Data.LinearRing(literalPath);
    
    const flatMultiPath          = [flatPath, flatPath];
    const literalMultiPath       = [literalPath, literalPath];
    const latLngMultiPath        = [latLngPath, latLngPath];
    const linearRingMultiPath    = [linearRingPath, linearRingPath];
    const mvcMultiPath           = new google.maps.MVCArray([mvcPath, mvcPath]);
    const mvcMultiLinearRingPath = new google.maps.MVCArray(linearRingMultiPath);

    function testPath(getPath: () => CoordPath)
    {
        const path = geometry.toLiteralMultiPath(getPath());

        path.forEach(shape => shape.forEach((coord, index) =>
        {
            expect(coord.lat).toBe(flatPath[index][0]);
            expect(coord.lng).toBe(flatPath[index][1]);
        }));
    }

    it('should be created', () => expect(geometry).toBeTruthy());

    describe('toLiteralCoord', () =>
    {
        function testCoord(makeCord: (lat: number, lng: number) => Coord)
        {
            const lat = 10;
            const lng = 20;

            const coord = geometry.toLiteralCoord(makeCord(lat, lng));
        
            expect(coord.lat).toBe(lat);
            expect(coord.lng).toBe(lng);
        }

        it('should transform native LatLng objects to literals',    () => testCoord((lat, lng) => new google.maps.LatLng(lat, lng)));

        it('should transform flat coord arrays to literals',        () => testCoord((lat, lng) => [lat, lng]));
        
        it('should return the same object if a literal was passed', () => testCoord((lat, lng) => ({ lat, lng })));
    });

    describe('toLiteralMultiPath', () =>
    {
        it('should convert native MVCArray single-paths to multi-paths',                () => testPath(() => mvcPath));
        it('should convert native LinearRing single-paths to multi-paths',              () => testPath(() => linearRingPath));
        it('should convert native LatLng single-paths to multi-paths',                  () => testPath(() => latLngPath));
        it('should convert native LatLngLiterals single-paths to multi-paths',          () => testPath(() => literalPath));
        it('should convert flat coords single-paths to multi-paths',                    () => testPath(() => flatPath));

        it('should convert native MVCArray multi-paths to native literals',             () => testPath(() => mvcMultiPath));
        it('should convert native LinearRing MVCArray multi-paths to native literals',  () => testPath(() => mvcMultiLinearRingPath));
        it('should convert native LinearRing multi-paths to native literals',           () => testPath(() => linearRingMultiPath));
        it('should convert native LatLng multi-paths to native literals',               () => testPath(() => latLngMultiPath));
        it('should convert native LatLngLiteral multi-paths to native literals',        () => testPath(() => literalMultiPath));
        it('should convert flat coords multi-paths to native literals',                 () => testPath(() => flatMultiPath));;
    });

    describe('castMultiPath', () =>
    {
        function testSingleCast(makePath: () => Path)
        {
            expect(geometry.isMultiPath(geometry.castMultiPath(makePath()))).toBeTruthy();
        }

        function testMultiCast(makePath: () => MultiPath)
        {
            const path = makePath();

            expect(geometry.castMultiPath(path)).toBe(path);
        }

        it('should convert native MVCArray single-paths to a multi-paths',                       () => testSingleCast(() => mvcPath));
        it('should convert native LinearRing single-paths to a multi-paths',                     () => testSingleCast(() => linearRingPath));
        it('should convert native LatLng single-paths to a multi-paths',                         () => testSingleCast(() => latLngPath));
        it('should convert native LatLngLiteral single-paths to a multi-paths',                  () => testSingleCast(() => literalPath));
        it('should convert flat coords single-paths to a multi-paths',                           () => testSingleCast(() => flatPath));

        it('should return the specified MVCArray path if it is already a multi-path',            () => testMultiCast(() => mvcMultiPath));
        it('should return the specified LinearRing MVCArray path if it is already a multi-path', () => testMultiCast(() => mvcMultiLinearRingPath));
        it('should return the specified LinearRing path if it is already a multi-path',          () => testMultiCast(() => linearRingMultiPath));
        it('should return the specified LatLng path if it is already a multi-path',              () => testMultiCast(() => latLngMultiPath));
        it('should return the specified LatLngLiteral path if it is already a multi-path',       () => testMultiCast(() => literalMultiPath));
        it('should return the specified flat coords path if it is already a multi-path',         () => testMultiCast(() => flatMultiPath));
    });

    describe('isMultiPath', () =>
    {
        it('should determine whether the path is a multi-paths', () =>
        {
            expect(geometry.isMultiPath(flatPath)).toBeFalsy();
            expect(geometry.isMultiPath(latLngPath)).toBeFalsy();
            expect(geometry.isMultiPath(literalPath)).toBeFalsy();
            expect(geometry.isMultiPath(linearRingPath)).toBeFalsy();
            expect(geometry.isMultiPath(mvcPath)).toBeFalsy();

            expect(geometry.isMultiPath(flatMultiPath)).toBeTruthy();
            expect(geometry.isMultiPath(latLngMultiPath)).toBeTruthy();
            expect(geometry.isMultiPath(literalMultiPath)).toBeTruthy();
            expect(geometry.isMultiPath(mvcMultiPath)).toBeTruthy();
            expect(geometry.isMultiPath(mvcMultiLinearRingPath)).toBeTruthy();
            expect(geometry.isMultiPath(linearRingMultiPath)).toBeTruthy();
        });
    });
    
    describe('isFlatCoord', () =>
    {
        it('should determine whether an object is a flat coord', () =>
        {
            expect(geometry.isFlatCoord(null)).toBeFalsy();
            expect(geometry.isFlatCoord(undefined)).toBeFalsy();
            expect(geometry.isFlatCoord({})).toBeFalsy();
            expect(geometry.isFlatCoord([])).toBeFalsy();
            expect(geometry.isFlatCoord([[]])).toBeFalsy();
            expect(geometry.isFlatCoord(10)).toBeFalsy();
            expect(geometry.isFlatCoord('hello')).toBeFalsy();
            
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
            expect(geometry.isBounds(null)).toBeFalse();
            expect(geometry.isBounds(undefined)).toBeFalse();
            expect(geometry.isBounds({})).toBeFalse();
            expect(geometry.isBounds('hello')).toBeFalse();
            expect(geometry.isBounds(10)).toBeFalse();
            expect(geometry.isBounds([])).toBeFalse();
            expect(geometry.isBounds({ north: 1, south: 1, east: 1 })).toBeFalse();

            expect(geometry.isBounds({ north: 1, south: 1, east: 1, west: 1 })).toBeTrue();
            expect(geometry.isBounds(new google.maps.LatLngBounds())).toBeTrue();
        });
    });

    describe('isDataLayerGeometry', () =>
    {
        it('should determine whether an object is a native data layer geometry object', () =>
        {
            expect(geometry.isDataLayerGeometry(null)).toBeFalse();
            expect(geometry.isDataLayerGeometry(undefined)).toBeFalse();
            expect(geometry.isDataLayerGeometry({})).toBeFalse();
            expect(geometry.isDataLayerGeometry('hello')).toBeFalse();
            expect(geometry.isDataLayerGeometry(10)).toBeFalse();
            expect(geometry.isDataLayerGeometry([])).toBeFalse();
            expect(geometry.isDataLayerGeometry(new google.maps.Circle())).toBeFalse();

            expect(geometry.isDataLayerGeometry(new google.maps.Data.Geometry())).toBeTrue();
        });
    });

    describe('createDataPoint', () =>
    {
        function testCoord(makeCoord: () => Coord)
        {
            const coord  = makeCoord();
            const result = geometry.createDataPoint(coord).get();

            expect(geometry.toLiteralCoord(result)).toEqual(geometry.toLiteralCoord(coord));
        }

        it('should create a native geometry for a point from a flat coord',                 () => testCoord(() => flatCoord));
        it('should create a native geometry for a point from a native LatLngLiteral coord', () => testCoord(() => literalCoord));
        it('should create a native geometry for a point from a native LatLng coord',        () => testCoord(() => latLngCoord));
    });

    describe('createDataPolygon', () =>
    {
        it('should create a native geometry for a polygon from a MVCArray single-path',              () => testPath(() => geometry.createDataPolygon(mvcPath).getArray()));
        it('should create a native geometry for a polygon from a native LinearRing single-path',     () => testPath(() => geometry.createDataPolygon(linearRingPath).getArray()));
        it('should create a native geometry for a polygon from a native LatLng single-path',         () => testPath(() => geometry.createDataPolygon(latLngPath).getArray()));
        it('should create a native geometry for a polygon from a native LatLngLiteral single-path',  () => testPath(() => geometry.createDataPolygon(literalPath).getArray()));
        it('should create a native geometry for a polygon from a flat coords',                       () => testPath(() => geometry.createDataPolygon(flatPath).getArray()));

        it('should create a native geometry for a polygon from a MVCArray multi-path',               () => testPath(() => geometry.createDataPolygon(mvcMultiPath).getArray()));
        it('should create a native geometry for a polygon from a LinearRing MVCArray multi-path',    () => testPath(() => geometry.createDataPolygon(mvcMultiLinearRingPath).getArray()));
        it('should create a native geometry for a polygon from a LinearRing multi-path',             () => testPath(() => geometry.createDataPolygon(linearRingMultiPath).getArray()));
        it('should create a native geometry for a polygon from a LatLng multi-path',                 () => testPath(() => geometry.createDataPolygon(latLngMultiPath).getArray()));
        it('should create a native geometry for a polygon from a LatLngLiteral multi-path',          () => testPath(() => geometry.createDataPolygon(literalMultiPath).getArray()));
        it('should create a native geometry for a polygon from a flat multi-path',                   () => testPath(() => geometry.createDataPolygon(flatMultiPath).getArray()));
    });

    function testBounds(makeBounds: () => google.maps.LatLngBounds, northEast: FlatCoord, southWest: FlatCoord)
    {
        const bounds = makeBounds().toJSON();

        expect(bounds.north).toEqual(northEast[0]);
        expect(bounds.east).toEqual(northEast[1]);
        expect(bounds.south).toEqual(southWest[0]);
        expect(bounds.west).toEqual(southWest[1]);
    }

    describe('defineCoordBounds', () =>
    {
        it('should define the bounds for a flat coord',                 () => testBounds(() => geometry.defineCoordBounds(flatCoord), flatCoord, flatCoord));
        it('should define the bounds for a native LatLngLiteral coord', () => testBounds(() => geometry.defineCoordBounds(literalCoord), flatCoord, flatCoord));
        it('should define the bounds for a native LatLng coord',        () => testBounds(() => geometry.defineCoordBounds(latLngCoord), flatCoord, flatCoord));
    });

    describe('definePathBounds', () =>
    {
        // The first and last coords in the dummy flatPath are the north-east and south-west points
        it('should define the bounds for a MVCArray single-path',              () => testBounds(() => geometry.definePathBounds(mvcPath), flatPath[3], flatPath[0]));
        it('should define the bounds for a native LinearRing single-path',     () => testBounds(() => geometry.definePathBounds(linearRingPath), flatPath[3], flatPath[0]));
        it('should define the bounds for a native LatLng single-path',         () => testBounds(() => geometry.definePathBounds(latLngPath), flatPath[3], flatPath[0]));
        it('should define the bounds for a native LatLngLiteral single-path',  () => testBounds(() => geometry.definePathBounds(literalPath), flatPath[3], flatPath[0]));
        it('should define the bounds for a flat coords',                       () => testBounds(() => geometry.definePathBounds(flatPath), flatPath[3], flatPath[0]));

        it('should define the bounds for a MVCArray multi-path',               () => testBounds(() => geometry.definePathBounds(mvcMultiPath), flatPath[3], flatPath[0]));
        it('should define the bounds for a LinearRing MVCArray multi-path',    () => testBounds(() => geometry.definePathBounds(mvcMultiLinearRingPath), flatPath[3], flatPath[0]));
        it('should define the bounds for a LinearRing multi-path',             () => testBounds(() => geometry.definePathBounds(linearRingMultiPath), flatPath[3], flatPath[0]));
        it('should define the bounds for a LatLng multi-path',                 () => testBounds(() => geometry.definePathBounds(latLngMultiPath), flatPath[3], flatPath[0]));
        it('should define the bounds for a LatLngLiteral multi-path',          () => testBounds(() => geometry.definePathBounds(literalMultiPath), flatPath[3], flatPath[0]));
        it('should define the bounds for a flat multi-path',                   () => testBounds(() => geometry.definePathBounds(flatMultiPath), flatPath[3], flatPath[0]));
    });

    describe('defineGeometryBounds', () =>
    {
        // The first and last coords in the dummy flatPath are the north-east and south-west points
        it('should define the bounds for a MVCArray single-path',              () => testBounds(() => geometry.defineGeometryBounds(geometry.createDataPoint(flatCoord)), flatCoord, flatCoord));
        it('should define the bounds for a native LinearRing single-path',     () => testBounds(() => geometry.defineGeometryBounds(geometry.createDataPolygon(flatPath)), flatPath[3], flatPath[0]));
    });
});
