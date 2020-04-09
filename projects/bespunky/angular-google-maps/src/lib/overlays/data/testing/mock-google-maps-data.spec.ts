import { IGoogleMapsData } from '../i-google-maps-data';
import { MockDrawableOverlay } from '../../../core/abstraction/testing/mock-drawable-overlay.spec';
import { IGoogleMap } from '../../../google-map/i-google-map';
import { MockFill } from '../../../testing/mock-fill.decorator.spec';
import { IGoogleMapsFeature } from '../feature/i-google-maps-feature';
import { Coord } from '../../../core/abstraction/types/geometry-utils.type';

@MockFill
export class MockGoogleMapsData extends MockDrawableOverlay<google.maps.Data> implements IGoogleMapsData
{
    constructor(public map: IGoogleMap)
    {
        super(map, new google.maps.Data());
    }
    
    createMarker(position: Coord, options?: google.maps.Data.FeatureOptions): IGoogleMapsFeature
    {
        throw new Error("Method not implemented.");
    }
    addFeature(feature: IGoogleMapsFeature | google.maps.Data.FeatureOptions): IGoogleMapsFeature
    {
        throw new Error("Method not implemented.");
    }
    findFeature(id: string | number): google.maps.Data.Feature
    {
        throw new Error("Method not implemented.");
    }
    removeFeature(featureOrId: string | number | IGoogleMapsFeature | google.maps.Data.Feature): IGoogleMapsFeature
    {
        throw new Error("Method not implemented.");
    }
    loadGeoJson(url: string, options?: google.maps.Data.GeoJsonOptions): Promise<google.maps.Data.Feature[]>
    {
        throw new Error("Method not implemented.");
    }
    toGeoJson(): Promise<any>
    {
        throw new Error("Method not implemented.");
    }
    getControlPosition(): google.maps.ControlPosition
    {
        throw new Error("Method not implemented.");
    }
    setControlPosition(position: google.maps.ControlPosition): void
    {
        throw new Error("Method not implemented.");
    }
    getControls(): string[]
    {
        throw new Error("Method not implemented.");
    }
    setControls(controls: string[]): void
    {
        throw new Error("Method not implemented.");
    }
    getDrawingMode(): string
    {
        throw new Error("Method not implemented.");
    }
    setDrawingMode(mode: string): void
    {
        throw new Error("Method not implemented.");
    }
    getStyle(): google.maps.Data.StylingFunction | google.maps.Data.StyleOptions
    {
        throw new Error("Method not implemented.");
    }
    setStyle(style: google.maps.Data.StylingFunction | google.maps.Data.StyleOptions): void
    {
        throw new Error("Method not implemented.");
    }
}