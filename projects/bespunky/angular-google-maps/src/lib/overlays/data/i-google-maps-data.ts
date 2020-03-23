import { IGoogleMapsDrawableOverlay } from '../../core/abstraction/base/i-google-maps-drawable-overlay';


export interface IGoogleMapsData extends IGoogleMapsDrawableOverlay
{
    addFeature(feature: google.maps.Data.Feature): Promise<void>;
    removeFeature(featureOrId: google.maps.Data.Feature | number | string): Promise<google.maps.Data.Feature>;

    findFeature(id: number | string): Promise<google.maps.Data.Feature>;

    /**
     * Should download GeoJson data from the specified url, interpret it and create map features for it.
     * Will automatically take care of the callback required by Google Maps Api internally.

     * @param {string} url The url to the GeoJson data to download.
     * @param {google.maps.Data.GeoJsonOptions} [options] (Optional) Configures the process of reading the GeoJson.
     * @returns {Promise<google.maps.Data.Feature[]>} A promise for the features representing the geometries added from the GeoJson.
     */
    loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions): Promise<google.maps.Data.Feature[]>;

    /**
     * Should create the GeoJson representation of the data and provide it as an object when the promise resolves.
     * Will automatically take care of the callback required by Google Maps Api internally.
     *
     * @returns {Promise<any>} A promise for the GeoJson object.
     */
    toGeoJson(): Promise<any>;
}
