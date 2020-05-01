import { Coord } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay } from '../abstraction/base/i-google-maps-drawable-overlay';

export interface IGoogleMapsMarker extends IGoogleMapsDrawableOverlay<google.maps.Marker>
{
    getPosition(): google.maps.LatLngLiteral;
    setPosition(coord: Coord): void;

    /* --------------------------------------- Native wrappers -------------------------------------- *
     * Documentation in: https://developers.google.com/maps/documentation/javascript/reference/marker *
     * ---------------------------------------------------------------------------------------------- */

    setOptions(options: google.maps.MarkerOptions): void;

    getAnimation(): google.maps.Animation;
    setAnimation(animation?: google.maps.Animation): void;

    getClickable(): boolean;
    setClickable(clickable: boolean): void;

    getCursor(): string;
    setCursor(cursor: string): void;

    getDraggable(): boolean;
    setDraggable(draggable: boolean): void;

    getIcon(): string | google.maps.Icon | google.maps.Symbol;
    setIcon(icon: string | google.maps.Icon | google.maps.Symbol): void;

    getLabel(): google.maps.MarkerLabel;
    setLabel(label: string | google.maps.MarkerLabel): void;

    getOpacity(): number;
    setOpacity(opacity: number): void;

    getShape(): google.maps.MarkerShape;
    setShape(shape: google.maps.MarkerShape): void;

    getTitle(): string;
    setTitle(title: string): void;

    getVisible(): boolean;
    setVisible(visible: boolean): void;

    getZIndex(): number;
    setZIndex(zIndex: number): void;
}
