import { MockFill, MockEmittingWrapper       } from '@bespunky/angular-google-maps/core/testing';
import { Coord, CoordPath                    } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsFeature, IGoogleMapsData } from '@bespunky/angular-google-maps/overlays';

@MockFill
export class MockGoogleMapsFeature extends MockEmittingWrapper<google.maps.Data.Feature> implements IGoogleMapsFeature
{
    constructor(public data: IGoogleMapsData, nativeFeature?: google.maps.Data.Feature)
    {
        super(nativeFeature || new google.maps.Data.Feature());
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
        throw new Error("Method not implemented.");
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