import { IGoogleMapsFeature } from '../../../../overlays/modules/data/feature/i-google-maps-feature';
import { IGoogleMapsData } from '../../../../overlays/modules/data/i-google-maps-data';
import { MockEmittingWrapper } from '../../../../core/abstraction/testing/mock-emitting-wrapper.spec';
import { MockFill } from '../../../../testing/mock-fill.decorator.spec';
import { CoordPath, Coord } from '../../../../core/abstraction/types/geometry.type';

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