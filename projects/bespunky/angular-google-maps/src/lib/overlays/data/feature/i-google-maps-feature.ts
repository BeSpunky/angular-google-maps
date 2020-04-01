import { IGoogleMapsData } from '../i-google-maps-data';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../../../core/abstraction/base/i-google-maps-native-object-emitting-wrapper';

export interface IGoogleMapsFeature extends IGoogleMapsNativeObjectEmittingWrapper<google.maps.Data.Feature>
{
    /** The data object this feature was added to. */
    readonly data: IGoogleMapsData;

    getId(): number | string;
    
    getGeometry(): google.maps.Data.Geometry;
    setGeometry(geometry: google.maps.Data.Geometry | google.maps.LatLng | google.maps.LatLngLiteral): void;

    getProperty(name: string): any;
    setProperty(name: string, value: any): any;

    /**
     * Should create the GeoJson representation of the feature and provide it as an object when the promise resolves.
     * Will automatically take care of the callback required by Google Maps Api internally.
     *
     * @returns {Promise<any>} A promise for the GeoJson object.
     */
    toGeoJson(): Promise<any>;
}
