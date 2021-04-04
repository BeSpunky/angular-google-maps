import { IBounds } from '../base/i-bounds';

/* Represents the supported coord forms of Google Maps API. */
export type NativeCoord = google.maps.LatLng | google.maps.LatLngLiteral;
/* Represents a coordinate as an array. First item is latitude, second is longitude. */
export type FlatCoord = [number, number];
/* Represents the coordinate forms supported by the library. */
export type Coord = NativeCoord | FlatCoord;

/* Represents the supported single-path form of Google Maps API. */
export type NativePath = google.maps.MVCArray<NativeCoord> | google.maps.Data.LinearRing;
/* Represents the supported multi-path form of Google Maps API. */
export type NativeMultiPath = google.maps.MVCArray<NativePath> | google.maps.Data.LinearRing[];
/* Represents the single-path forms supported by the library. */
export type Path = Coord[] | NativePath;
/* Represents the multi-path forms supported by the library. */
export type MultiPath = Coord[][] | NativeMultiPath;
/* Represents a flexible path that can either be single or multi-path. */
export type CoordPath = Path | MultiPath;

/** Represents data layer geometries. */
export type NativeGeometry = google.maps.Data.Geometry;

/** Represents a bounds object. */
export type NativeBounds = google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral;

/** Represents types for which bounds can be inferred. Used in geometry transformation and bounds calculations. */
export type BoundsLike = IBounds | NativeBounds | Coord | CoordPath | NativeGeometry; // TODO: Add rect, circle, etc.