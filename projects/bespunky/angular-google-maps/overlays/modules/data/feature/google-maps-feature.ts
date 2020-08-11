import { GoogleMapsApiService, GoogleMapsNativeObjectEmittingWrapper, NativeObjectWrapper, Coord, CoordPath, WrappedNativeFunctions, OutsideAngular } from '@bespunky/angular-google-maps/core';
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

    public getId(): string | number
    {
        return this.native.getId();
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
