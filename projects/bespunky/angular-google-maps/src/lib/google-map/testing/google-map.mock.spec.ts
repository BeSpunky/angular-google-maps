import { IGoogleMap } from "../i-google-map";
import { IGoogleMapsMarker } from "../../overlays/marker/i-google-maps-marker";
import { IGoogleMapsData } from "../../overlays/data/i-google-maps-data";

export class MockGoogleMap implements IGoogleMap
{
    custom: any;

    constructor(public native: any = {}) { }

    // A simple logger to avoid swallowing executing transparently
    private logCall(methodName: string): any
    {
        console.log(`MockGoogleMap.${methodName}() called. No action taken.`);
    }

    createMarker(position: google.maps.LatLng | google.maps.LatLngLiteral, options?: google.maps.ReadonlyMarkerOptions): IGoogleMapsMarker
    {
        return this.logCall('createMarker');
    }
    createDataLayer(options?: google.maps.Data.DataOptions): IGoogleMapsData
    {
        return this.logCall('createDataLayer');
    }
    removeOverlay<TOverlay extends import("../../core/abstraction/types/drawable-overlay.type").DrawableOverlay>(overlay: TOverlay): void
    {
        return this.logCall('removeOverlay');
    }
    fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void
    {
        return this.logCall('fitBounds');
    }
    panBy(x: number, y: number): void
    {
        return this.logCall('panBy');
    }
    panTo(position: google.maps.LatLng | google.maps.LatLngLiteral): void
    {
        return this.logCall('panTo');
    }
    panToBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void
    {
        return this.logCall('panToBounds');
    }
    setOptions(options: google.maps.MapOptions): void
    {
        return this.logCall('setOptions');
    }
    getBounds(): google.maps.LatLngBounds
    {
        return this.logCall('getBounds');
    }
    getCenter(): google.maps.LatLng
    {
        return this.logCall('getCenter');
    }
    setCenter(position: google.maps.LatLng | google.maps.LatLngLiteral): void
    {
        return this.logCall('setCenter');
    }
    getClickableIcons(): boolean
    {
        return this.logCall('getClickableIcons');
    }
    setClickableIcons(clickable: boolean): void
    {
        return this.logCall('setClickableIcons');
    }
    getHeading(): number
    {
        return this.logCall('getHeading');
    }
    setHeading(heading: number): void
    {
        return this.logCall('setHeading');
    }
    getMapType(): string | google.maps.MapTypeId
    {
        return this.logCall('getMapType');
    }
    setMapType(type: string | google.maps.MapTypeId): void
    {
        return this.logCall('setMapType');
    }
    getProjection(): google.maps.Projection
    {
        return this.logCall('getProjection');
    }
    getStreetView(): google.maps.StreetViewPanorama
    {
        return this.logCall('getStreetView');
    }
    setStreetView(panorama: google.maps.StreetViewPanorama): void
    {
        return this.logCall('setStreetView');
    }
    getTilt(): number
    {
        return this.logCall('getTilt');
    }
    setTilt(tilt: number): void
    {
        return this.logCall('setTilt');
    }
    getZoom(): number
    {
        return this.logCall('getZoom');
    }
    setZoom(zoomLevel: number): void
    {
        return this.logCall('setZoom');
    }
    listenTo(eventName: string, handler: (...args: any[]) => void): () => void
    {
        return this.logCall('listenTo');
    }
    stopListeningTo(eventName: string): void
    {
        return this.logCall('stopListeningTo');
    }
    clearListeners(): void
    {
        return this.logCall('clearListeners');
    }
}