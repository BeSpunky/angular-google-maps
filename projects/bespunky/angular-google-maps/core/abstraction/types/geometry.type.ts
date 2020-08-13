/* Represents the supported coord forms of Google Maps API. */
export type NativeCoord = google.maps.LatLng | google.maps.LatLngLiteral;
/* Represents a coordinate as an array. First item is latitude, second is longitude. */
export type FlatCoord = [number, number];
/* Represents the coordinate forms supported by the library. */
export type Coord = NativeCoord | FlatCoord;

/* Represents the supported single-path form of Google Maps API. */
export type NativePath = google.maps.MVCArray<NativeCoord>;
/* Represents the supported multi-path form of Google Maps API. */
export type NativeMultiPath = google.maps.MVCArray<NativePath>;
/* Represents the single-path forms supported by the library. */
export type Path = Coord[] | NativePath;
/* Represents the multi-path forms supported by the library. */
export type MultiPath = Coord[][] | NativeMultiPath;
/* Represents a flexible path that can either be single or multi-path. */
export type CoordPath = Path | MultiPath;