import { GoogleMapsApiService, GoogleMapsNativeObjectEmittingWrapper, NativeObjectWrapper, Coord, CoordPath, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsData } from '../i-google-maps-data';
import { IGoogleMapsFeature } from './i-google-maps-feature';

export type WrappedFeatureFunctions = WrappedNativeFunctions<google.maps.Data.Feature>;

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

    public setMarker(position: Coord): void
    {
        this.setGeometry(this.api.geometry.createDataPoint(position));
    }

    public setPolygon(path: CoordPath): void
    {
        this.setGeometry(this.api.geometry.createDataPolygon(path));
    }

    public toGeoJson(): Promise<any>
    {
        return new Promise(resolve => this.native.toGeoJson(resolve));
    }
}
