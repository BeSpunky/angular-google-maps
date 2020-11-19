import { GeometryTransformService, FlatCoord, Coord, Path, MultiPath, CoordPath, IBounds, BoundsLike, NativeBounds } from '@bespunky/angular-google-maps/core';
import { MockBounds                                                                                                } from '../mocks/mock-bounds';

/** @ignore */
const geometry = new GeometryTransformService();

/**
 * The following are the geometry types supported by the library.
 * They have been assigned with dummy values for testing.
 */

// Coords
/** Dummy coord for testing. See `produceCoordSpecs()`. */
export const flatCoord    = [10, 11] as FlatCoord;
/** Dummy coord for testing. See `produceCoordSpecs()`. */
export const literalCoord = geometry.toLiteralCoord(flatCoord);
/** Dummy coord for testing. See `produceCoordSpecs()`. */
export const latLngCoord  = new google.maps.LatLng(literalCoord);

/** All dummy coords for testing combined into an array. */
export const allDummyCoords = [flatCoord, literalCoord, latLngCoord];

// Single Paths
/** Dummy single-path for testing. See `produceSinglePathSpecs()`. For bounds: [0] is defined as south-west, [length-1] is defined as north-east. */
export const flatPath       = [[10, 11], [20, 22], [30, 33], [40, 44]] as FlatCoord[];
/** Dummy single-path for testing. See `produceSinglePathSpecs()`. For bounds: [0] is defined as south-west, [length-1] is defined as north-east. */
export const literalPath    = flatPath.map(coord => geometry.toLiteralCoord(coord));
/** Dummy single-path for testing. See `produceSinglePathSpecs()`. For bounds: [0] is defined as south-west, [length-1] is defined as north-east. */
export const latLngPath     = flatPath.map(coord => new google.maps.LatLng(coord[0], coord[1]));
/** Dummy single-path for testing. See `produceSinglePathSpecs()`. For bounds: [0] is defined as south-west, [length-1] is defined as north-east. */
export const mvcPath        = new google.maps.MVCArray(flatPath.map(coord => geometry.toLiteralCoord(coord)));
/** Dummy single-path for testing. See `produceSinglePathSpecs()`. For bounds: [0] is defined as south-west, [length-1] is defined as north-east. */
export const linearRingPath = new google.maps.Data.LinearRing(literalPath);

/** All dummy single paths for testing combined into an array. */
export const allDummySinglePaths = [flatPath, literalPath, latLngPath, mvcPath, linearRingPath];

// Multi Paths
/** Dummy multi-path for testing. See `produceMultiPathSpecs()`. */
export const flatMultiPath          = [flatPath, flatPath];
/** Dummy multi-path for testing. See `produceMultiPathSpecs()`. */
export const literalMultiPath       = [literalPath, literalPath];
/** Dummy multi-path for testing. See `produceMultiPathSpecs()`. */
export const latLngMultiPath        = [latLngPath, latLngPath];
/** Dummy multi-path for testing. See `produceMultiPathSpecs()`. */
export const linearRingMultiPath    = [linearRingPath, linearRingPath];
/** Dummy multi-path for testing. See `produceMultiPathSpecs()`. */
export const mvcMultiPath           = new google.maps.MVCArray([mvcPath, mvcPath]);
/** Dummy multi-path for testing. See `produceMultiPathSpecs()`. */
export const mvcMultiLinearRingPath = new google.maps.MVCArray(linearRingMultiPath);

/** All dummy single paths for testing combined into an array. */
export const allDummyMultiPaths = [flatMultiPath, literalMultiPath, latLngMultiPath, linearRingMultiPath, mvcMultiPath, mvcMultiLinearRingPath];

// IBounds
/** Dummy bounds for testing. See `produceNativeBoundsSpecs()` and `produceIBoundsSpecs()`. */
export const mockBounds  = new MockBounds();
mockBounds.bounds = new google.maps.LatLngBounds(literalPath[0], literalPath[flatPath.length - 1]);

/** The south-west coord of the dummy testing paths. */
export const southWest = flatPath[0];
/** The north-east coord of the dummy testing paths. */
export const northEast = flatPath[flatPath.length - 1];

/** All dummy bounds for testing combined into an array. */
export const allDummyBounds = [mockBounds];

// Data Layer Geometry
/** Dummy geometry feature for testing. See `produceDataGeometrySpecs()`. */
export const dataPoint   = new google.maps.Data.Point(literalCoord);
/** Dummy geometry feature for testing. See `produceDataGeometrySpecs()`. */
export const dataPolygon = new google.maps.Data.Polygon(linearRingMultiPath);

/** All dummy geometry features for testing combined into an array. */
export const allDummyDataGeometries = [dataPoint, dataPolygon];

/**
 * Produces a spec for each supported coord type and runs the test against the coord.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <geometry type>`.
 * @param {(value: Coord) => void} test The test to perform on the coord.
 */
export function produceCoordSpecs(expectation: string, test: (coord: Coord) => void): void
{
    it(`should ${expectation} for a flat coord`,                 () => test(flatCoord));
    it(`should ${expectation} for a native LatLngLiteral coord`, () => test(literalCoord));
    it(`should ${expectation} for a native LatLng coord`,        () => test(latLngCoord));
}

/**
 * Produces a spec for each supported single path type and runs the test against the path.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <geometry type>`.
 * @param {(value: Path) => void} test The test to perform on the path.
 */
export function produceSinglePathSpecs(expectation: string, test: (path: Path) => void): void
{
    it(`should ${expectation} for a MVCArray single-path`,             () => test(mvcPath));
    it(`should ${expectation} for a native LinearRing single-path`,    () => test(linearRingPath));
    it(`should ${expectation} for a native LatLng single-path`,        () => test(latLngPath));
    it(`should ${expectation} for a native LatLngLiteral single-path`, () => test(literalPath));
    it(`should ${expectation} for a flat coords`,                      () => test(flatPath));
}

/**
 * Produces a spec for each supported multi path type and runs the test against the path.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <geometry type>`.
 * @param {(value: MultiPath) => void} test The test to perform on the path.
 */
export function produceMultiPathSpecs(expectation: string, test: (multiPath: MultiPath) => void): void
{
    it(`should ${expectation} for a MVCArray multi-path`,            () => test(mvcMultiPath));
    it(`should ${expectation} for a LinearRing MVCArray multi-path`, () => test(mvcMultiLinearRingPath));
    it(`should ${expectation} for a LinearRing multi-path`,          () => test(linearRingMultiPath));
    it(`should ${expectation} for a LatLng multi-path`,              () => test(latLngMultiPath));
    it(`should ${expectation} for a LatLngLiteral multi-path`,       () => test(literalMultiPath));
    it(`should ${expectation} for a flat multi-path`,                () => test(flatMultiPath));
}

/**
 * Produces a spec for each supported path type (single and multi paths) and runs the test against the path.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <geometry type>`.
 * @param {(path: CoordPath) => void} test The test to perform on the path.
 */
export function producePathSpecs(expectation: string, test: (path: CoordPath) => void): void
{
    produceSinglePathSpecs(expectation, test);
    produceMultiPathSpecs(expectation, test);
}

/**
 * Produces a spec for each supported native bounds types and runs the test against the bounds.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <geometry type>`.
 * @param {(boundable: IBounds) => void} test The test to perform on the bounds object.
 */
export function produceNativeBoundsSpecs(expectation: string, test: (bounds: NativeBounds) => void): void
{
    it(`should ${expectation} for a LatLngBoundsLiteral`, () => test(mockBounds.bounds.toJSON()));
    it(`should ${expectation} for a LatLngBounds`,        () => test(mockBounds.bounds));
}

/**
 * Produces a spec for each supported IBounds implementing types and runs the test against the implementers.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <geometry type>`.
 * @param {(boundable: IBounds) => void} test The test to perform on the IBounds implementer.
 */
export function produceIBoundsSpecs(expectation: string, test: (boundable: IBounds) => void): void
{
    it(`should ${expectation} for IBounds implementors`, () => test(mockBounds));
}

/**
 * Produces a spec for each supported data layer geometry type and runs the test against the geometry.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <geometry type>`.
 * @param {(geo: google.maps.Data.Geometry) => void} test The test to perform on the geometry.
 */
export function produceDataGeometrySpecs(expectation: string, test: (geo: google.maps.Data.Geometry) => void): void
{
    it(`should ${expectation} for a data point`,   () => test(dataPoint));
    it(`should ${expectation} for a data polygon`, () => test(dataPolygon));
}

/**
 * Produces a spec for each supported BoundsLike geometry type and runs the test against the geometry.
 *
 * @export
 * @param {string} expectation
 * @param {(element: BoundsLike) => void} test
 */
export function produceBoundsLikeSpecs(expectation: string, test: (element: BoundsLike) => void): void
{
    produceCoordSpecs       (expectation, test);
    producePathSpecs        (expectation, test);
    produceNativeBoundsSpecs(expectation, test);
    produceIBoundsSpecs     (expectation, test);
    produceDataGeometrySpecs(expectation, test);
}