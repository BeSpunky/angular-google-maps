import { Coord, CoordPath, Path, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay } from '../../abstraction/base/i-google-maps-drawable-overlay';
import { IGoogleMapsFeature         } from './feature/i-google-maps-feature';

/** A type for the native functions of a data layer which should be wrapped. Used along with the extension interface for the wrapper.  */
export type WrappedDataFunctions = WrappedNativeFunctions<google.maps.Data, 'add' | 'addGeoJson' | 'getFeatureById' | 'toGeoJson' | 'loadGeoJson' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

/**
 * Represents the functionality that a data layer wrapper should provide.
 *
 * @export
 * @interface IGoogleMapsData
 * @extends {IGoogleMapsDrawableOverlay<google.maps.Data>}
 * @extends {WrappedDataFunctions}
 */
export interface IGoogleMapsData extends IGoogleMapsDrawableOverlay<google.maps.Data>, WrappedDataFunctions
{
    /**
     * Creates a marker geometry feature with the specified properties and adds it to the map.
     *
     * @param {Coord} position The position at which the marker should be added.
     * @param {google.maps.Data.FeatureOptions} [options] (Optional) Any native options to assign to the marker.
     * @returns {IGoogleMapsFeature} The wrapper object for the new feature.
     */
    createMarker(position: Coord, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature;
    /**
     * Creates a polygon geometry feature with the specified properties and adds it to the map.
     *
     * @param {CoordPath} path The path describing the polygon coordinates.
     * @param {google.maps.Data.FeatureOptions} [options] (Optional) Any native options to assign to the polygon.
     * @returns {IGoogleMapsFeature} The wrapper object for the new feature.
     */
    createPolygon(path: CoordPath, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature;
    /**
     * Creates a polyline geometry feature with the specified properties and adds it to the map.
     *
     * @param {Path} path The path describing the polyline coordinates.
     * @param {google.maps.Data.FeatureOptions} [options] (Optional) Any native options to assign to the polyline.
     * @returns {IGoogleMapsFeature} The wrapper object for the new feature.
     */
    createPolyline(path: Path, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature;

    /**
     * Adds a feature to the data layer. If a native feature is specified, a wrapper will be created for it.
     *
     * @param {(google.maps.Data.FeatureOptions | IGoogleMapsFeature)} feature The native feature or feature wrapper to add.
     * @returns {IGoogleMapsFeature} The wrapper object for the new feature.
     */
    addFeature(feature: google.maps.Data.FeatureOptions | IGoogleMapsFeature): IGoogleMapsFeature;
    
    /**
     * Looks for a feature in the data layer.
     *
     * @param {(string | number)} id The id of the feature to look for.
     * @returns {google.maps.Data.Feature} The feature associated with the specified id or `null` when not found.
     */
    findFeature(id: string | number): google.maps.Data.Feature;

    /**
     * Removes a feature from the data layer.
     *
     * @param {(google.maps.Data.Feature | IGoogleMapsFeature | number | string)} featureOrId The feature or feature id to remove.
     * @returns {IGoogleMapsFeature} The removed feature wrapper.
     */
    removeFeature(featureOrId: google.maps.Data.Feature | IGoogleMapsFeature | number | string): IGoogleMapsFeature;

    /**
     * Downloads GeoJson data from the specified url, interprets it and creates map features for it.
     * Will automatically take care of the callback required by Google Maps Api internally.

     * @param {string} url The url to the GeoJson data to download.
     * @param {google.maps.Data.GeoJsonOptions} [options] (Optional) Configures the process of reading the GeoJson.
     * @returns {google.maps.Data.Feature[]} A promise for the features representing the geometries added from the GeoJson.
     */
    loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions): Promise<google.maps.Data.Feature[]>;

    /**
     * Creates the GeoJson representation of the data and provides it as an object when the promise resolves.
     * Will automatically take care of the callback required by Google Maps Api internally.
     *
     * @returns {Promise<any>} A promise for the GeoJson object.
     */
    toGeoJson(): Promise<any>;
}
