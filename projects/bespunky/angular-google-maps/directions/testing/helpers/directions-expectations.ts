import { expectCoord                                                     } from '@bespunky/angular-google-maps/core/testing';
import { GeometryTransformService, NativeCoord                           } from '@bespunky/angular-google-maps/core';
import { DirectionsTransformService, DirectionsPlace, DirectionsWaypoint } from '@bespunky/angular-google-maps/directions';

/** @ignore */
const geometry   = new GeometryTransformService();
/** @ignore */
const directions = new DirectionsTransformService(geometry);

/**
 * Produces a place using the specified function and compares it to the expected place.
 *
 * @export
 * @param {() => DirectionsPlace} makePlace A function which produces a place.
 * @param {DirectionsPlace} expected The place expected to be produced by the `DirectionsPlace()` function.
 */
export function expectPlace(makePlace: () => DirectionsPlace, expected: DirectionsPlace): void
{
    const place = directions.toNativePlace(makePlace());

    // Functions are not compare correctly with expect().toEqual(), so LatLng objects should be treated apart
    if (place instanceof google.maps.LatLng)
    {
        expectCoord(() => place, expected as google.maps.LatLng);
    }
    else if ((place as google.maps.Place).location instanceof google.maps.LatLng)
    {
        expectCoord(() => (place as google.maps.Place).location, (expected as google.maps.Place).location);
    }
    else
    {
        expect(place).toEqual(directions.toNativePlace(expected) as string | google.maps.LatLngLiteral | google.maps.Place);
    }
}

/**
 * Produces a waypoint using the specified function and compares it to the expected waypoint.
 *
 * @export
 * @param {() => DirectionsWaypoint} makeWaypoint A function which produces a waypoint.
 * @param {DirectionsWaypoint} expected The waypoint expected to be produced by the `DirectionsWaypoint()` function.
 */
export function expectWaypoint(makeWaypoint: () => DirectionsWaypoint, expected: DirectionsWaypoint): void
{
    const { location: waypointLocation } = directions.toNativeWaypoint(makeWaypoint());
    const { location: expectedLocation } = directions.toNativeWaypoint(expected);
    
    // Functions are not compare correctly with expect().toEqual(), so LatLng objects should be treated apart
    if (expectedLocation instanceof google.maps.LatLng)
    {
        expect(waypointLocation).toBeInstanceOf(google.maps.LatLng);
        expectCoord(() => waypointLocation as google.maps.LatLng, expectedLocation);
    }
    else if ((expectedLocation as google.maps.Place).location instanceof google.maps.LatLng)
    {
        expect((waypointLocation as google.maps.Place).location).toBeInstanceOf(google.maps.LatLng);
        expectCoord(() => (waypointLocation as google.maps.Place).location, (expectedLocation as google.maps.Place).location);
    }
    else
    {
        expect(waypointLocation).toEqual(expectedLocation);
    }
}
