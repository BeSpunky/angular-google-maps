import { MockEmittingWrapper                   } from '@bespunky/angular-google-maps/core/testing';
import { Coord, CoordPath, NativeObjectWrapper } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsFeature, IGoogleMapsData   } from '@bespunky/angular-google-maps/overlays';

// @dynamic
@NativeObjectWrapper<google.maps.Data.Feature, MockGoogleMapsFeature>()
export class MockGoogleMapsFeature extends MockEmittingWrapper<google.maps.Data.Feature> implements IGoogleMapsFeature
{
    private id = Math.random();

    constructor(public data: IGoogleMapsData, nativeFeature?: google.maps.Data.Feature)
    {
        super(nativeFeature || new google.maps.Data.Feature());
    }
    getBounds(): google.maps.LatLngBounds
    {
        throw new Error("Method not implemented.");
    }
    setMarker(position: Coord): void
    {
        throw new Error("Method not implemented.");
    }
    setPolygon(path: CoordPath): void
    {
        throw new Error("Method not implemented.");
    }    
    getId(): string | number
    {
        return this.id;
    }
    getGeometry(): google.maps.Data.Geometry
    {
        throw new Error("Method not implemented.");
    }
    setGeometry(geometry: google.maps.Data.Geometry | google.maps.LatLng | google.maps.LatLngLiteral): void
    {
        throw new Error("Method not implemented.");
    }
    toGeoJson(): Promise<any>
    {
        throw new Error("Method not implemented.");
    }
}