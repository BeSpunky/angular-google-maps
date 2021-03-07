import { literalCoord, latLngCoord, allBoundsLike, latLngBounds, produceFlexibleDummiesSpecs, FlexibleDummies } from '@bespunky/angular-google-maps/core/testing';
import { DirectionsPlace, DirectionsWaypoint, NativeDirectionsPlace, NativeDirectionsWaypoint                               } from '@bespunky/angular-google-maps/directions';

/**
 * The following are the directions types supported by the library.
 * They have been assigned with dummy values for testing.
 */

export const stringPlace       = 'Tel Aviv, Israel';
export const literalCoordPlace = literalCoord;
export const latLngCoordPlace  = latLngCoord;
export const nativePlace       = { location: literalCoord } as google.maps.Place;
export const boundsLikePlaces  = [...allBoundsLike];

export const allNativePlaces: FlexibleDummies<NativeDirectionsPlace> = [
    { typeName: 'string place'       , value: stringPlace       },
    { typeName: 'literal coord place', value: literalCoordPlace },
    { typeName: 'LatLng coord place' , value: latLngCoordPlace  },
    { typeName: 'native Place place' , value: nativePlace       }
];

export const stringWaypoint       = { location: stringPlace } as google.maps.DirectionsWaypoint;
export const latLngCoordWaypoint  = { location: latLngCoordPlace } as google.maps.DirectionsWaypoint;
export const placeWaypoint        = { location: nativePlace } as google.maps.DirectionsWaypoint;
export const literalCoordWaypoint = { location: literalCoordPlace } as DirectionsWaypoint;
export const boundsLikeWaypoints   = boundsLikePlaces.map(({ typeName, value }) => ({ typeName, value: ({ location: value } as DirectionsWaypoint) }));

export const allNativeWaypoints: FlexibleDummies<NativeDirectionsWaypoint> = [
    { typeName: 'string waypoint'      , value: stringWaypoint      },
    { typeName: 'LatLng coord waypoint', value: latLngCoordWaypoint },
    { typeName: 'native Place waypoint', value: placeWaypoint       }
];

export const allFlexibleWaypoints: FlexibleDummies<DirectionsWaypoint> = [
    { typeName: 'literal coord waypoint', value: literalCoordWaypoint },
    ...boundsLikeWaypoints
];

export const allFlexiblePlaces: FlexibleDummies<DirectionsPlace> = [
    ...boundsLikePlaces,
    ...allNativeWaypoints,
    ...allFlexibleWaypoints
];

export const directionsRoute: google.maps.DirectionsRoute = {
    bounds           : latLngBounds,
    copyrights       : '',
    fare             : { currency: '', value: 0 },
    legs             : [],
    overview_path    : [],
    overview_polyline: '',
    warnings         : [],
    waypoint_order   : []
};

export const directionsResult: google.maps.DirectionsResult = {
    geocoded_waypoints: [{partial_match: false, place_id: 'some place', types: ['dummy']}],
    routes            : [directionsRoute]
};

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
    // Native place types which happen to be bounds like. Excluded as they should be tested using `produceNativePlacesSpecs()`.
    const boundsLikeExcludes  = ['literal coord', 'LatLng coord'];
    // Flexible waypoint types which take the same shape as a `google.maps.Place`. Excluded as they should be tested using `produceNativePlacesSpecs()`.
    const nativePlaceExcludes = ['literal coord waypoint', 'LatLng coord waypoint'];
    const excludes            = [...boundsLikeExcludes, ...nativePlaceExcludes];

    produceFlexibleDummiesSpecs(allFlexiblePlaces, 'DirectionsPlace', expectation, test, excludes);
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
    // These are native waypoint types which happen to be bounds like. They will be tested apart.
    const boundsLikeExcludes = ['LatLng coord'];

    produceFlexibleDummiesSpecs(allFlexibleWaypoints, 'DirectionsWaypoint', expectation, test, boundsLikeExcludes);
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