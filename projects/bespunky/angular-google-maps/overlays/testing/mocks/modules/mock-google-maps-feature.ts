import { MockEmittingWrapper                                                 } from '@bespunky/angular-google-maps/core/testing';
import { Coord, CoordPath, NativeObjectWrapper, Path, WrappedNativeFunctions } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsFeature, IGoogleMapsData, FeatureProperties              } from '@bespunky/angular-google-maps/overlays';

export type WrappedFeatureFunctions = WrappedNativeFunctions<google.maps.Data.Feature>;

export interface MockGoogleMapsFeature extends WrappedFeatureFunctions { }

// @dynamic
@NativeObjectWrapper<google.maps.Data.Feature, MockGoogleMapsFeature>()
export class MockGoogleMapsFeature extends MockEmittingWrapper<google.maps.Data.Feature> implements IGoogleMapsFeature
{
    private id = Math.random();

    constructor(public data: IGoogleMapsData, nativeFeature?: google.maps.Data.Feature)
    {
        super(nativeFeature || new google.maps.Data.Feature());
    }
    getId(): string | number
    {
        return this.id;
    }
    setMarker(position: Coord): void
    {
        throw new Error("Method not implemented.");
    }
    setPolygon(path: CoordPath): void
    {
        throw new Error("Method not implemented.");
    }
    setPolyline(path: Path): void
    {
        throw new Error("Method not implemented.");
    }
    toGeoJson(): Promise<any>
    {
        throw new Error("Method not implemented.");
    }
    getProperties(): FeatureProperties
    {
        throw new Error("Method not implemented.");
    }
    setProperties(properties: FeatureProperties): void
    {
        throw new Error("Method not implemented.");
    }
    getBounds(): google.maps.LatLngBounds
    {
        throw new Error("Method not implemented.");
    }
}