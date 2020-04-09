import { IGoogleMapsDrawableOverlay } from '../../core/abstraction/base/i-google-maps-drawable-overlay';
import { Coord } from '../../core/abstraction/types/geometry-utils.type';

export interface IGoogleMapsPolygon extends IGoogleMapsDrawableOverlay<google.maps.Polygon>
{
    getPath(): Coord[] | Coord[][];
    setPath(coords: Coord[] | Coord[][]): void;

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
