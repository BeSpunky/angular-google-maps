/**
 * Checks whether the given value is a native map mouse event object.
 *
 * @export
 * @param {*} event The value to test.
 * @returns {event is google.maps.MouseEvent} `true` if the object is a native map mouse event; otherwise `false`.
 */
export function isGoogleMapsMouseEvent(event: any): event is google.maps.MouseEvent
{
    return (event as google.maps.MouseEvent).latLng !== undefined;
}
