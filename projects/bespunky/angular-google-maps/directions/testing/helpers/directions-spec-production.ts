import { literalCoord, latLngCoord, allBoundsLike, produceBoundsLikeSpecs } from '@bespunky/angular-google-maps/core/testing';
import { DirectionsPlace, DirectionsWaypoint                               } from '@bespunky/angular-google-maps/directions';

/**
 * The following are the directions types supported by the library.
 * They have been assigned with dummy values for testing.
 */

export const stringPlace       = 'Tel Aviv, Israel';
export const literalCoordPlace = literalCoord;
export const latLngCoordPlace  = latLngCoord;
export const nativePlace       = { location: literalCoord } as google.maps.Place;
export const boundsLikePlaces  = [...allBoundsLike];

export const allNativePlaces = [stringPlace, literalCoordPlace, latLngCoordPlace, nativePlace];
/** All dummy places for testing combined into an array. */
export const allDummyPlaces  = [...allNativePlaces, ...boundsLikePlaces];

export const stringWaypoint       = { location: stringPlace } as google.maps.DirectionsWaypoint;
export const literalCoordWaypoint = { location: literalCoordPlace } as DirectionsWaypoint;
export const latLngCoordWaypoint  = { location: latLngCoordPlace } as google.maps.DirectionsWaypoint;
export const placeWaypoint        = { location: nativePlace } as google.maps.DirectionsWaypoint;
export const boundsLikeWaypoint   = boundsLikePlaces.map(({ typeName, value }) => ({ typeName, value: ({ locations: value } as DirectionsWaypoint) }));

export const allNativeWaypoints = [stringWaypoint, latLngCoordWaypoint, placeWaypoint];
/** All dummy waypoints for testing combined into an array. */
export const allDummyWaypoints  = [...allNativeWaypoints, literalCoordWaypoint, ...boundsLikeWaypoint]

/**
 * Produces a spec for each native place type and runs the test against the place.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <place type>`.
 * @param {(value: DirectionsPlace) => void} test The test to perform on the place.
 */
export function produceNativePlaceSpecs(expectation: string, test: (place: DirectionsPlace) => void): void
{
    it(`should ${expectation} for string place`,               () => test(stringPlace));
    it(`should ${expectation} for native LatLngLiteral place`, () => test(literalCoordPlace));
    it(`should ${expectation} for native LatLng place`,        () => test(latLngCoordPlace));
    it(`should ${expectation} for native place`,               () => test(nativePlace));
}

/**
 * Produces a spec for the additional types supported by the library as places and runs the test against each place.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <place type>`.
 * @param {(value: DirectionsPlace) => void} test The test to perform on the place.
 */
export function produceFlexiblePlaceSpecs(expectation: string, test: (place: DirectionsPlace) => void): void
{
    // These are native types which happen to be bounds like. They will be tested apart.
    const boundsLikeExcludes = ['literal coord', 'LatLng coord'];

    produceBoundsLikeSpecs(expectation, test, boundsLikeExcludes);
}

/**
 * Produces a spec for each supported place type and runs the test against the place.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <place type>`.
 * @param {(value: DirectionsPlace) => void} test The test to perform on the place.
 */
export function producePlaceSpecs(expectation: string, test: (place: DirectionsPlace) => void): void
{
    produceNativePlaceSpecs(expectation, test);
    produceFlexiblePlaceSpecs(expectation, test);
}

/**
 * Produces a spec for each native waypoint type and runs the test against the waypoint.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <wayoint type>`.
 * @param {(value: DirectionsWaypoint) => void} test The test to perform on the waypoint.
 */
export function produceNativeWaypointSpecs(expectation: string, test: (place: DirectionsWaypoint) => void): void
{
    it(`should ${expectation} for string waypoint`,        () => test(stringWaypoint));
    it(`should ${expectation} for native LatLng waypoint`, () => test(latLngCoordWaypoint));
    it(`should ${expectation} for native place waypoint`,  () => test(placeWaypoint));
}

/**
 * Produces a spec for the additional waypoint types supported by the library and runs the test against each waypoint.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <wayoint type>`.
 * @param {(value: DirectionsWaypoint) => void} test The test to perform on the waypoint.
 */
export function produceFlexibleWaypointSpecs(expectation: string, test: (place: DirectionsWaypoint) => void): void
{
    it(`should ${expectation} for native LatLngLiteral waypoint`, () => test(literalCoordWaypoint));

    // These are native types which happen to be bounds like. They will be tested apart.
    const boundsLikeExcludes = ['literal coord', 'LatLng coord'];

    produceBoundsLikeSpecs(expectation, value => test({ location: value }), boundsLikeExcludes);
}

/**
 * Produces a spec for each supported waypoint type and runs the test against the waypoint.
 *
 * @export
 * @param {string} expectation Format is `should <expectation> for a <wayoint type>`.
 * @param {(value: DirectionsWaypoint) => void} test The test to perform on the waypoint.
 */
export function produceWaypointSpecs(expectation: string, test: (place: DirectionsWaypoint) => void): void
{
    produceNativeWaypointSpecs(expectation, test);
    produceFlexibleWaypointSpecs(expectation, test);
}