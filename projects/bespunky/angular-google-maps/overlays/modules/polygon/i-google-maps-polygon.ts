import { CoordPath } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay } from '../../abstraction/base/i-google-maps-drawable-overlay';

export interface IGoogleMapsPolygon extends IGoogleMapsDrawableOverlay<google.maps.Polygon>
{
    getPath(): google.maps.LatLngLiteral[][];
    setPath(coords: CoordPath): void;

    // Options delegators
    setClickable     (clickable: boolean)                  : void;
    setFillColor     (color: string)                       : void;
    setFillOpacity   (opacity: number)                     : void;
    setStrokeColor   (color: string)                       : void;
    setStrokeOpacity (opacity: number)                     : void;
    setStrokePosition(position: google.maps.StrokePosition): void;
    setStrokeWeight  (weight: number)                      : void;
    setZIndex        (zIndex: number)                      : void;
    setGeodesic      (geodesic: boolean)                   : void;

    /* ---------------------------------------- Native wrappers -------------------------------------- *
     * Documentation in: https://developers.google.com/maps/documentation/javascript/reference/polygon *
     * ----------------------------------------------------------------------------------------------- */

    getDraggable(): boolean;
    setDraggable(draggable: boolean): void;

    getEditable(): boolean;
    setEditable(editable: boolean): void;

    getVisible(): boolean;
    setVisible(visible: boolean): void;

    setOptions(options: google.maps.PolygonOptions): void;
}
