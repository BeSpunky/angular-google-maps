export enum OverlayType
{
    /** A pin on an exact coordinate over map. */
    Marker,
    /** A series of connected coordinates in an ordered sequence. Additionally, polygons form a closed loop and define a filled region. */
    Polygon,
    /** A linear overlay of connected line segments on the map. */
    Polyline,
    /** A circle on the Earth's surface; also known as a "spherical cap". */
    Circle,
    /** A rectangle overlay. */
    Rectangle,
    /** A rectangular image overlay on the map. */
    Ground,
    /** An overlay that looks like a bubble and is often connected to a marker. */
    InfoWindow,
    /** Data layer defining drawn features. Also allows loading features directly from a GeoJson. */
    Data,
    /** Directions layer rendered using the `GoogleMapsDirectionsDirective` after getting the results using the `GoogleMapsDirectionsService`. */
    Directions
}