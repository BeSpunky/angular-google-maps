import { IGoogleMapsFeature } from '../i-google-maps-feature';
import { IGoogleMapsData } from '../../i-google-maps-data';
import { MockEmittingWrapper } from '../../../../core/abstraction/testing/mock-emitting-wrapper.spec';

export class MockGoogleMapsFeature extends MockEmittingWrapper<google.maps.Data.Feature> implements IGoogleMapsFeature
{
    constructor(public data: IGoogleMapsData)
    {
        super(new google.maps.Data.Feature());
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