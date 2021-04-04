import { GeometryTransformService, Coord, CoordPath } from '@bespunky/angular-google-maps/core';

/** @ignore */
const geometry = new GeometryTransformService();

/**
 * Produces a coord using the specified function and compares it to the expected coord.
 *
 * @export
 * @param {() => Coord} makeCoord A function which produces a coord.
 * @param {Coord} expected The coord expected to be produced by the `makeCoord()` function.
 */
export function expectCoord(makeCoord: () => Coord, expected: Coord): void
{
    const coord = geometry.toLiteralCoord(makeCoord());

    expect(coord).toEqual(geometry.toLiteralCoord(expected));
}

/**
 * Produces a path using the specified function and compares it to the expected path. 
 *
 * @export
 * @param {() => CoordPath} makePath A function which produces a path.
 * @param {CoordPath} expected The path expected to be produced by the `makePath()` function.
 */
export function expectPath(makePath: () => CoordPath, expected: CoordPath): void
{
    const path     = geometry.toLiteralMultiPath(makePath());
          expected = geometry.toLiteralMultiPath(expected);

    path.forEach((shape, shapeIndex) => shape.forEach((coord, coordIndex) =>
    {
        expect(coord).toEqual(expected[shapeIndex][coordIndex]);
    }));
}

/**
 * Produces a bounds object using the specified funcion and compares it to the specified corner coords.
 *
 * @export
 * @param {() => google.maps.LatLngBounds} makeBounds A function which produces a native bounds object.
 * @param {Coord} northEast The expected north-east corner of the produced bounds.
 * @param {Coord} southWest The expected south-west corner of the produced bounds.
 */
export function expectBounds(makeBounds: () => google.maps.LatLngBounds, northEast: Coord, southWest: Coord): void
{
    const bounds = makeBounds().toJSON();
    const [north, east] = geometry.toFlatCoord(northEast);
    const [south, west] = geometry.toFlatCoord(southWest);

    expect(bounds.north).toEqual(north);
    expect(bounds.east).toEqual(east);
    expect(bounds.south).toEqual(south);
    expect(bounds.west).toEqual(west);
}