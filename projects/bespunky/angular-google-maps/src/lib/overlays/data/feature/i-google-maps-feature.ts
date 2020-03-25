import { IGoogleMapsNativeObjectWrapper } from '../../../core/abstraction/base/i-google-maps-native-object-wrapper';

export interface IGoogleMapsFeature extends IGoogleMapsNativeObjectWrapper
{
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
