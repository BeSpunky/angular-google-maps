import { Coord, CoordPath           } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay } from '../../abstraction/base/i-google-maps-drawable-overlay';
import { IGoogleMapsFeature         } from './feature/i-google-maps-feature';

export interface IGoogleMapsData extends IGoogleMapsDrawableOverlay<google.maps.Data>
{
    createMarker(position: Coord, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature;
    createPolygon(path: CoordPath, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature;

    addFeature(feature: google.maps.Data.FeatureOptions | IGoogleMapsFeature): IGoogleMapsFeature;
    
    findFeature(id: string | number): google.maps.Data.Feature;

    removeFeature(featureOrId: google.maps.Data.Feature | IGoogleMapsFeature | number | string): IGoogleMapsFeature;

    /**
     * Should download GeoJson data from the specified url, interpret it and create map features for it.
     * Will automatically take care of the callback required by Google Maps Api internally.

     * @param {string} url The url to the GeoJson data to download.
     * @param {google.maps.Data.GeoJsonOptions} [options] (Optional) Configures the process of reading the GeoJson.
     * @returns {google.maps.Data.Feature[]} A promise for the features representing the geometries added from the GeoJson.
     */
    loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions): Promise<google.maps.Data.Feature[]>;

    /**
     * Should create the GeoJson representation of the data and provide it as an object when the promise resolves.
     * Will automatically take care of the callback required by Google Maps Api internally.
     *
     * @returns {any} A promise for the GeoJson object.
     */
    toGeoJson(): Promise<any>;

    /* ------------------------------------- Native wrappers -------------------------------------- *
     * Documentation in: https://developers.google.com/maps/documentation/javascript/reference/data *
     * -------------------------------------------------------------------------------------------- */

    getControlPosition(): google.maps.ControlPosition;
    setControlPosition(position: google.maps.ControlPosition): void;

    getControls(): string[];
    setControls(controls: string[]): void;

    getDrawingMode(): string;
    setDrawingMode(mode: string): void;

    getStyle(): google.maps.Data.StylingFunction | google.maps.Data.StyleOptions;
    setStyle(style: google.maps.Data.StylingFunction | google.maps.Data.StyleOptions): void;
}
