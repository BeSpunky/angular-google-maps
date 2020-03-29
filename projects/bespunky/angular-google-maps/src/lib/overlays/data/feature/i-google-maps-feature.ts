import { IGoogleMapsData } from '../i-google-maps-data';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../../../core/abstraction/base/i-google-maps-native-object-emitting-wrapper';

export interface IGoogleMapsFeature extends IGoogleMapsNativeObjectEmittingWrapper
{
    /** The data object this feature was added to. */
    readonly data: IGoogleMapsData;

    getId(): Promise<number | string>;
    
    getGeometry(): Promise<google.maps.Data.Geometry>;
    setGeometry(geometry: google.maps.Data.Geometry | google.maps.LatLng | google.maps.LatLngLiteral): Promise<void>;

    getProperty(name: string): Promise<any>;
    setProperty(name: string, value: any): Promise<any>;

    /**
     * Should create the GeoJson representation of the feature and provide it as an object when the promise resolves.
     * Will automatically take care of the callback required by Google Maps Api internally.
     *
     * @returns {Promise<any>} A promise for the GeoJson object.
     */
    toGeoJson(): Promise<any>;
}
