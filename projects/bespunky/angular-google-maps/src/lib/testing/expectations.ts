/**
 * Provides util functions to shortcut `expect()` statements.
 */

/**
 * Shortcuts expecting a literal position match with a native LatLng object.
 * Uses `toBeCloseTo()` with 6 digits precision.
 *
 * @param nativePosition The position retrieved from a google maps native object.
 * @param matched The mocked position to match with the native one.
 */
export function expectPositionEquals(nativePosition: google.maps.LatLng, mockPosition: google.maps.LatLng | google.maps.ReadonlyLatLngLiteral)
{
    const matchedLat = mockPosition instanceof google.maps.LatLng ? mockPosition.lat() : mockPosition.lat;
    const matchedLng = mockPosition instanceof google.maps.LatLng ? mockPosition.lng() : mockPosition.lng;

    expect(nativePosition.lat()).toBeCloseTo(matchedLat, 6);
    expect(nativePosition.lng()).toBeCloseTo(matchedLng, 6);
}
