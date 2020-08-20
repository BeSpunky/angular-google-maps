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
        function testMultiPath(getPath: () => CoordPath)
        {
            const path = geometry.toLiteralMultiPath(getPath());

            path.forEach(shape => shape.forEach((coord, index) =>
            {
                expect(coord.lat).toBe(flatPath[index][0]);
                expect(coord.lng).toBe(flatPath[index][1]);
            }));
        }

        it('should convert native MVCArray single-paths to multi-paths',                () => testMultiPath(() => mvcPath));
        it('should convert native LinearRing single-paths to multi-paths',              () => testMultiPath(() => linearRingPath));
        it('should convert native LatLng single-paths to multi-paths',                  () => testMultiPath(() => latLngPath));
        it('should convert native LatLngLiterals single-paths to multi-paths',          () => testMultiPath(() => literalPath));
        it('should convert flat coords single-paths to multi-paths',                    () => testMultiPath(() => flatPath));

        it('should convert native MVCArray multi-paths to native literals',             () => testMultiPath(() => mvcMultiPath));
        it('should convert native LinearRing MVCArray multi-paths to native literals',  () => testMultiPath(() => mvcMultiLinearRingPath));
        it('should convert native LinearRing multi-paths to native literals',           () => testMultiPath(() => linearRingMultiPath));
        it('should convert native LatLng multi-paths to native literals',               () => testMultiPath(() => latLngMultiPath));
        it('should convert native LatLngLiteral multi-paths to native literals',        () => testMultiPath(() => literalMultiPath));
        it('should convert flat coords multi-paths to native literals',                 () => testMultiPath(() => flatMultiPath));;
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
        it('should return the specified LinearRing path if it is already a multi-path',          () => testMultiCast(() => mvcMultiLinearRingPath));
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
});
