/**
 * Represents objects which can be defined in a bounds object (e.g. markers, polygons...).
 */
export interface IBounds
{
    /**
     * Calculates the bounds of the object.
     *
     * @returns {google.maps.LatLngBounds} The bounds of the object.
     */
    getBounds(): google.maps.LatLngBounds;
}