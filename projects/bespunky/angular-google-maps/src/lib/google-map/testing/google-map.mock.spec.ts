import { IGoogleMap } from "../i-google-map";
import { IGoogleMapsMarker } from "../../overlays/marker/i-google-maps-marker";
import { IGoogleMapsData } from "../../overlays/data/i-google-maps-data";
import { IGoogleMapsDrawableOverlay } from "../../core/abstraction/base/i-google-maps-drawable-overlay";

export class MockGoogleMap implements IGoogleMap
{
    native = Promise.resolve(this.nativeMap);

    custom: any;

    constructor(private nativeMap: object = {}) { }

    createMarker(position: google.maps.LatLng | google.maps.LatLngLiteral, options?: google.maps.ReadonlyMarkerOptions): Promise<IGoogleMapsMarker>
    {
        throw new Error("Method not implemented.");
    }
    createDataLayer(options?: google.maps.Data.DataOptions): Promise<IGoogleMapsData>
    {
        throw new Error("Method not implemented.");
    }
    removeOverlay(overlay: IGoogleMapsDrawableOverlay): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    getCenter(): Promise<google.maps.LatLng>
    {
        throw new Error("Method not implemented.");
    }
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    getZoom(): Promise<number>
    {
        throw new Error("Method not implemented.");
    }
    setZoom(zoomLevel: number): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    listenTo(eventName: string, handler: () => void): Promise<any>
    {
        throw new Error("Method not implemented.");
    }
    stopListeningTo(eventName: string): Promise<any>
    {
        throw new Error("Method not implemented.");
    }
}