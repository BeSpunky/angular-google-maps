import { GoogleMapsApiService, GoogleMapsNativeObjectEmittingWrapper, NativeObjectWrapper, Wrap, OutsideAngular, Coord, CoordPath } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsData } from '../i-google-maps-data';
import { IGoogleMapsFeature } from './i-google-maps-feature';

// @dynamic
@NativeObjectWrapper
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

    @Wrap()
    getId(): number | string { return void 0; }

    @Wrap()
    getGeometry(): google.maps.Data.Geometry { return void 0; }

    @Wrap() @OutsideAngular
    setGeometry(geometry: google.maps.Data.Geometry | google.maps.LatLng | google.maps.LatLngLiteral): void { }

    @Wrap()
    getProperty(name: string): any { return void 0; }

    @Wrap() @OutsideAngular
    setProperty(name: string, value: any): void { }
}
