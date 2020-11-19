/**
 * Represents mouse event data transformed by the library.
 * 
 * See [`EventDataTransformService`](/docs/injectables/EventDataTransformService.html)
 *
 * @export
 * @interface IGoogleMapsMouseEvent
 */
export interface IGoogleMapsMouseEvent
{
    /**
     * The coordinate where the mouse event took place.
     *
     * @type {google.maps.LatLngLiteral}
     */
    position: google.maps.LatLngLiteral;
}
