import { GoogleMapsApiService, NativeObjectWrapper, IGoogleMap, OutsideAngular, Coord, CoordPath, Delegation, Path } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay             } from '../../abstraction/base/google-maps-drawable-overlay';
import { OverlayType                           } from '../../abstraction/base/overlay-type.enum';
import { isGoogleMapsFeatureOptions            } from '../../abstraction/type-guards/feature-options-type-guard';
import { IGoogleMapsData, WrappedDataFunctions } from './i-google-maps-data';
import { IGoogleMapsFeature                    } from './feature/i-google-maps-feature';
import { GoogleMapsFeature                     } from './feature/google-maps-feature';
import { FeatureTracker                        } from './services/feature-tracker';

/** Extends intellisense for `GoogleMapsData` with native data layer functions. */
export interface GoogleMapsData extends WrappedDataFunctions { }

/**
 * The angular-ready wrapper for the native `google.maps.Data` class.
 *
 * @export
 * @class GoogleMapsData
 * @extends {GoogleMapsDrawableOverlay<google.maps.Data>}
 * @implements {IGoogleMapsData}
 */
// @dynamic
@NativeObjectWrapper<GoogleMapsData>({
    getMap: Delegation.Exclude,
    setMap: Delegation.Exclude
})
export class GoogleMapsData extends GoogleMapsDrawableOverlay<google.maps.Data> implements IGoogleMapsData
{
    /**
     * The tracker of geometry features currently added to the data layer.     *
     */
    public readonly features = new FeatureTracker();

    constructor(map: IGoogleMap, api: GoogleMapsApiService, native: google.maps.Data)
    {
        super(OverlayType.Data, map, api, native);
    }

    public getBounds(): google.maps.LatLngBounds
    {
        return this.api.geometry.defineBounds(...this.features.list.map(feature => feature.getBounds()));
    }

    /**
     * Creates a marker geometry feature with the specified properties and adds it to the map.
     *
     * @param {Coord} position The position at which the marker should be added.
     * @param {google.maps.Data.FeatureOptions} [options] (Optional) Any native options to assign to the marker.
     * @returns {IGoogleMapsFeature} The wrapper object for the new feature.
     */
    @OutsideAngular
    public createMarker(position: Coord, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature
    {
        options = this.buildOptions(this.api.geometry.createDataPoint(position), options);

        return this.addFeature(options);
    }

    /**
     * Creates a polygon geometry feature with the specified properties and adds it to the map.
     *
     * @param {CoordPath} path The path describing the polygon coordinates.
     * @param {google.maps.Data.FeatureOptions} [options] (Optional) Any native options to assign to the polygon.
     * @returns {IGoogleMapsFeature} The wrapper object for the new feature.
     */
    @OutsideAngular
    public createPolygon(path: CoordPath, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature
    {
        options = this.buildOptions(this.api.geometry.createDataPolygon(path), options);

        return this.addFeature(options);
    }

    /**
     * Creates a polyline geometry feature with the specified properties and adds it to the map.
     *
     * @param {Path} path The path describing the polyline coordinates.
     * @param {google.maps.Data.FeatureOptions} [options] (Optional) Any native options to assign to the polyline.
     * @returns {IGoogleMapsFeature} The wrapper object for the new feature.
     */
    @OutsideAngular
    public createPolyline(path: Path, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature
    {
        options = this.buildOptions(this.api.geometry.createDataPolyline(path), options);

        return this.addFeature(options);
    }

    private buildOptions(geometry: google.maps.Data.Geometry, baseOptions?: google.maps.Data.FeatureOptions): google.maps.Data.FeatureOptions
    {
        return Object.assign({}, baseOptions, { geometry });
    }

    /**
     * Adds a feature to the data layer.
     *
     * @param {IGoogleMapsFeature} feature The feature wrapper to add.
     * @returns {IGoogleMapsFeature} The wrapper object for the new feature.
     */
    public addFeature(feature: IGoogleMapsFeature): IGoogleMapsFeature;
    /**
     * Creates a wrapper object for the feature and adds it to the data layer.
     *
     * @param {(google.maps.Data.FeatureOptions | IGoogleMapsFeature)} feature The native feature or feature wrapper to add.
     * @returns {IGoogleMapsFeature} The wrapper object for the new feature.
     */
    public addFeature(options: google.maps.Data.FeatureOptions): IGoogleMapsFeature;
    /**
     * @ignore
     */
    @OutsideAngular
    public addFeature(feature: google.maps.Data.FeatureOptions | IGoogleMapsFeature): IGoogleMapsFeature
    {
        if (isGoogleMapsFeatureOptions(feature))
            feature = new GoogleMapsFeature(this, this.api, new google.maps.Data.Feature(feature)); 

        this.native.add(feature.native);
        this.features.add(feature);

        return feature;
    }

    /**
     * Removes a feature from the data layer.
     *
     * @param {google.maps.Data.Feature} feature The native feature to remove.
     * @returns {IGoogleMapsFeature} The removed feature wrapper or `null` if not found.
     */
    public removeFeature(feature: google.maps.Data.Feature): IGoogleMapsFeature;
    /**
     * Removes a feature from the data layer.
     *
     * @param {IGoogleMapsFeature} feature The feature to remove.
     * @returns {IGoogleMapsFeature} The removed feature wrapper or `null` if not found.
     */
    public removeFeature(feature: IGoogleMapsFeature): IGoogleMapsFeature;
    /**
     * Removes a feature from the data layer.
     *
     * @param {(number | string)} featureId The id of the feature to remove.
     * @returns {IGoogleMapsFeature} The removed feature wrapper or `null` if not found.
     */
    public removeFeature(featureId: string | number): IGoogleMapsFeature;
    /**
     * @ignore
     */
    @OutsideAngular
    public removeFeature(featureOrId: string | number | google.maps.Data.Feature | IGoogleMapsFeature): IGoogleMapsFeature
    {
        const removed = this.features.remove(featureOrId);

        if (removed)
            this.native.remove(removed.native);

        return removed;
    }

    /**
     * Looks for a feature in the data layer.
     *
     * @param {(string | number)} id The id of the feature to look for.
     * @returns {google.maps.Data.Feature} The feature associated with the specified id or `null` when not found.
     */
    public findFeature(id: string | number): google.maps.Data.Feature { return this.native.getFeatureById(id); }

    /**
     * Creates the GeoJson representation of the data and provides it as an object when the promise resolves.
     * Will automatically take care of the callback required by Google Maps Api internally.
     *
     * @returns {Promise<any>} A promise for the GeoJson object.
     */
    public toGeoJson(): Promise<any>
    {
        return new Promise(resolve => this.native.toGeoJson(resolve));
    }

    /**
     * Downloads GeoJson data from the specified url, interprets it and creates map features for it.
     * Will automatically take care of the callback required by Google Maps Api internally.

     * @param {string} url The url to the GeoJson data to download.
     * @param {google.maps.Data.GeoJsonOptions} [options] (Optional) Configures the process of reading the GeoJson.
     * @returns {google.maps.Data.Feature[]} A promise for the features representing the geometries added from the GeoJson.
     */
    @OutsideAngular
    public loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions): Promise<google.maps.Data.Feature[]>
    {
        return new Promise(resolve => this.native.loadGeoJson(url, options, resolve));
    }
}