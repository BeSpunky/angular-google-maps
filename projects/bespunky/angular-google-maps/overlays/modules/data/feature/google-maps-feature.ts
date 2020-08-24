import { GoogleMapsApiService, GoogleMapsNativeObjectEmittingWrapper, NativeObjectWrapper, Coord, CoordPath, OutsideAngular } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsData                             } from '../i-google-maps-data';
import { IGoogleMapsFeature, WrappedFeatureFunctions, FeatureProperties } from './i-google-maps-feature';

export interface GoogleMapsFeature extends WrappedFeatureFunctions { }

// @dynamic
@NativeObjectWrapper<google.maps.Data.Feature, GoogleMapsFeature>()
export class GoogleMapsFeature extends GoogleMapsNativeObjectEmittingWrapper<google.maps.Data.Feature> implements IGoogleMapsFeature
{
    constructor(protected api: GoogleMapsApiService, public readonly data: IGoogleMapsData, options?: google.maps.Data.FeatureOptions)
    {
        super(api, options);
    }
   
    protected createNativeObject(options?: google.maps.Data.FeatureOptions): google.maps.Data.Feature
    {
        return new google.maps.Data.Feature(options);
    }

    public getBounds(): google.maps.LatLngBounds
    {
        return this.api.geometry.defineGeometryBounds(this.getGeometry());
    }

    public getId(): string | number
    {
        return this.native.getId();
    }

    public getProperties(): FeatureProperties
    {
        const properties = {};

        this.native.forEachProperty((value, name) => properties[name] = value);

        return properties;
    }
    
    @OutsideAngular
    public setProperties(properties: FeatureProperties): void
    {
        Object.keys(properties).forEach(name => this.native.setProperty(name, properties[name]));
    }

    @OutsideAngular
    public setMarker(position: Coord): void
    {
        this.native.setGeometry(this.api.geometry.createDataPoint(position));
    }

    @OutsideAngular
    public setPolygon(path: CoordPath): void
    {
        this.native.setGeometry(this.api.geometry.createDataPolygon(path));
    }

    public toGeoJson(): Promise<any>
    {
        return new Promise(resolve => this.native.toGeoJson(resolve));
    }
}
