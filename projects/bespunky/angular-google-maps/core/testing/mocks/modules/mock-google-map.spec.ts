import { MockFill            } from '@bespunky/angular-google-maps/testing';
import { IGoogleMap          } from '@bespunky/angular-google-maps/core';
import { MockEmittingWrapper } from '../mock-emitting-wrapper.spec';

@MockFill
export class MockGoogleMap extends MockEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    constructor(public native: any = new google.maps.Map(document.createElement('div')))
    {
        super(native);
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