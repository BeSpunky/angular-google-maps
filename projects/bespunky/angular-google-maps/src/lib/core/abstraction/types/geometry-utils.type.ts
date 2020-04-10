/* Represents a coordinate as an array. First item is latitude, second is longitude. */
export type FlatCoord = [number, number];
/* Represents the coordinate forms supported by the library. */
export type Coord = google.maps.LatLng | google.maps.LatLngLiteral | google.maps.ReadonlyLatLngLiteral | FlatCoord;
/* Represents the multipath forms supported by the library. */
export type MultiPath = Coord[] | Coord[][] | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>;