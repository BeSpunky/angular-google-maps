import { IGoogleMapsNativeObjectEmittingWrapper } from '../../abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { IMapSuperpowers                    } from './superpowers/i-map-superpowers';
import { ZoomLevel                              } from './types/zoom-level.enum';

export interface IGoogleMap extends IGoogleMapsNativeObjectEmittingWrapper<google.maps.Map>
{
    readonly superpowers: IMapSuperpowers;

    /* ------------------------------------- Native wrappers ------------------------------------- *
     * Documentation in: https://developers.google.com/maps/documentation/javascript/reference/map *
     * ------------------------------------------------------------------------------------------- */

    fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void;
    panBy(x: number, y: number): void;
    panTo(position: google.maps.LatLng | google.maps.LatLngLiteral): void;
    panToBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void;

    setOptions(options: google.maps.MapOptions): void;

    getBounds(): google.maps.LatLngBounds;

    getCenter(): google.maps.LatLng;
    setCenter(position: google.maps.LatLng | google.maps.LatLngLiteral): void;

    getClickableIcons(): boolean;
    setClickableIcons(clickable: boolean): void;

    getHeading(): number;
    setHeading(heading: number): void

    getMapType(): string | google.maps.MapTypeId;
    setMapType(type: string | google.maps.MapTypeId): void;

    getProjection(): google.maps.Projection;

    getStreetView(): google.maps.StreetViewPanorama;
    setStreetView(panorama: google.maps.StreetViewPanorama): void;

    getTilt(): number;
    setTilt(tilt: number): void;

    getZoom(): number;
    setZoom(zoomLevel: number | ZoomLevel): void;
}
