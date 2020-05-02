import { IGoogleMapsNativeObjectEmittingWrapper, Coord, CoordPath } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsData } from '../i-google-maps-data';

export interface IGoogleMapsFeature extends IGoogleMapsNativeObjectEmittingWrapper<google.maps.Data.Feature>
{
    /** The data object this feature was added to. */
    readonly data: IGoogleMapsData;

    /**
     * Replaces the geometry of this feature with a marker geometry.
     *
     * @param {Coord} position The position of the marker on the map.
     */
    setMarker(position: Coord): void;
    /**
     * Replaces the geometry of this feature with a polygon geometry.
     *
     * @param {CoordPath} path The polygon's path.
     */
    setPolygon(path: CoordPath): void;

    getId(): number | string;
    
    getGeometry(): google.maps.Data.Geometry;
    setGeometry(geometry: google.maps.Data.Geometry | google.maps.LatLng | google.maps.LatLngLiteral): void;

    getProperty(name: string): any;
    setProperty(name: string, value: any): void;

    /**
     * Should create the GeoJson representation of the feature and provide it as an object when the promise resolves.
     * Will automatically take care of the callback required by Google Maps Api internally.
     *
     * @returns {Promise<any>} A promise for the GeoJson object.
     */
    toGeoJson(): Promise<any>;
}
