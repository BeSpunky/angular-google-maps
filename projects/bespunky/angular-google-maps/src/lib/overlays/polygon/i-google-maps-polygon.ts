import { IGoogleMapsDrawableOverlay } from '../../core/abstraction/base/i-google-maps-drawable-overlay';
import { Coord } from '../../core/abstraction/types/geometry-utils.type';

export interface IGoogleMapsPolygon extends IGoogleMapsDrawableOverlay<google.maps.Polygon>
{
    getPath(): google.maps.LatLngLiteral[][];
    setPath(coords: Coord[] | Coord[][]): void;

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
