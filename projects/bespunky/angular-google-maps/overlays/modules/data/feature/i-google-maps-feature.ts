import { IGoogleMapsNativeObjectEmittingWrapper, Coord, CoordPath, IBounds, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsData } from '../i-google-maps-data';

export type WrappedFeatureFunctions = WrappedNativeFunctions<google.maps.Data.Feature>;

export type FeatureProperties = { [name: string]: any };

export interface IGoogleMapsFeature extends IGoogleMapsNativeObjectEmittingWrapper<google.maps.Data.Feature>, WrappedFeatureFunctions, IBounds
{
    /** The data object this feature was added to. */
    readonly data: IGoogleMapsData;

    /**
     * Gets the id assigned to the feature.
     *
     * @returns {(string | number)} The id assigned to the feature.
     * 
     * Even though the @NativeObjectWrapper decorator can take care of delegating this method, the interface
     * needs to declare it so it may be used throughout the library to identify features using interface abstraction access.
     * @see FeatureTracker source code.
     */
    getId(): string | number;
    
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

    /**
     * Gets a map of all properties assigned to the feature.
     *
     * @returns {FeatureProperties} The map of properties assigned to the feature.
     */
    getProperties(): FeatureProperties;

    /**
     * Assignes properties to the feature.
     * Any existing properties will be overriten. Non specified properties will not be touched.
     *
     * @param {FeatureProperties} properties The properties to assigne to the feature.
     */
    setProperties(properties: FeatureProperties): void;

    /**
     * Should create the GeoJson representation of the feature and provide it as an object when the promise resolves.
     * Will automatically take care of the callback required by Google Maps Api internally.
     *
     * @returns {Promise<any>} A promise for the GeoJson object.
     */
    toGeoJson(): Promise<any>;
}
