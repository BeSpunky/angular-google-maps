import { IGoogleMap } from "../i-google-map";
import { IGoogleMapsMarker } from "../../overlays/marker/i-google-maps-marker";
import { IGoogleMapsPolygon } from '../../overlays/polygon/i-google-maps-polygon';
import { IGoogleMapsData } from "../../overlays/data/i-google-maps-data";
import { MockEmittingWrapper } from '../../core/abstraction/testing/mock-emitting-wrapper.spec';
import { MockFill } from '../../testing/mock-fill.decorator.spec';
import { Coord, CoordPath } from '../../core/abstraction/types/geometry.type';

@MockFill
export class MockGoogleMap extends MockEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    constructor(public native: any = new google.maps.Map(document.createElement('div')))
    {
        super(native);
    }
    createMarker(position: Coord, options?: google.maps.ReadonlyMarkerOptions): IGoogleMapsMarker
    {
        throw new Error("Method not implemented.");
    }
    createPolygon(path: CoordPath, options?: google.maps.PolygonOptions): IGoogleMapsPolygon
    {
        throw new Error("Method not implemented.");
    }
    createDataLayer(options?: google.maps.Data.DataOptions): IGoogleMapsData
    {
        throw new Error("Method not implemented.");
    }
    removeOverlay<TOverlay extends import("../../core/abstraction/types/abstraction").DrawableOverlay>(overlay: TOverlay): void
    {
        throw new Error("Method not implemented.");
    }
    fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void
    {
        throw new Error("Method not implemented.");
    }
    panBy(x: number, y: number): void
    {
        throw new Error("Method not implemented.");
    }
    panTo(position: google.maps.LatLng | google.maps.LatLngLiteral): void
    {
        throw new Error("Method not implemented.");
    }
    panToBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void
    {
        throw new Error("Method not implemented.");
    }
    setOptions(options: google.maps.MapOptions): void
    {
        throw new Error("Method not implemented.");
    }
    getBounds(): google.maps.LatLngBounds
    {
        throw new Error("Method not implemented.");
    }
    getCenter(): google.maps.LatLng
    {
        throw new Error("Method not implemented.");
    }
    setCenter(position: google.maps.LatLng | google.maps.LatLngLiteral): void
    {
        throw new Error("Method not implemented.");
    }
    getClickableIcons(): boolean
    {
        throw new Error("Method not implemented.");
    }
    setClickableIcons(clickable: boolean): void
    {
        throw new Error("Method not implemented.");
    }
    getHeading(): number
    {
        throw new Error("Method not implemented.");
    }
    setHeading(heading: number): void
    {
        throw new Error("Method not implemented.");
    }
    getMapType(): string | google.maps.MapTypeId
    {
        throw new Error("Method not implemented.");
    }
    setMapType(type: string | google.maps.MapTypeId): void
    {
        throw new Error("Method not implemented.");
    }
    getProjection(): google.maps.Projection
    {
        throw new Error("Method not implemented.");
    }
    getStreetView(): google.maps.StreetViewPanorama
    {
        throw new Error("Method not implemented.");
    }
    setStreetView(panorama: google.maps.StreetViewPanorama): void
    {
        throw new Error("Method not implemented.");
    }
    getTilt(): number
    {
        throw new Error("Method not implemented.");
    }
    setTilt(tilt: number): void
    {
        throw new Error("Method not implemented.");
    }
    getZoom(): number
    {
        throw new Error("Method not implemented.");
    }
    setZoom(zoomLevel: number): void
    {
        throw new Error("Method not implemented.");
    }
}