import { IGoogleMap, Coord, NativeObjectWrapper } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsMarker, OverlayType         } from '@bespunky/angular-google-maps/overlays';
import { MockDrawableOverlay                    } from '../mock-drawable-overlay';

// @dynamic
@NativeObjectWrapper<google.maps.Marker, MockMarker>()
export class MockMarker extends MockDrawableOverlay<google.maps.Marker> implements IGoogleMapsMarker
{
    constructor(map: IGoogleMap, native?: google.maps.Marker)
    {
        super(map, native || new google.maps.Marker());

        this.type = OverlayType.Marker;
    }

    getBounds(): google.maps.LatLngBounds
    {
        throw new Error("Method not implemented.");
    }
    setOptions(options: google.maps.MarkerOptions): void
    {
        throw new Error("Method not implemented.");
    }
    getAnimation(): google.maps.Animation
    {
        throw new Error("Method not implemented.");
    }
    setAnimation(animation?: google.maps.Animation): void
    {
        throw new Error("Method not implemented.");
    }
    getClickable(): boolean
    {
        throw new Error("Method not implemented.");
    }
    setClickable(clickable: boolean): void
    {
        throw new Error("Method not implemented.");
    }
    getCursor(): string
    {
        throw new Error("Method not implemented.");
    }
    setCursor(cursor: string): void
    {
        throw new Error("Method not implemented.");
    }
    getDraggable(): boolean
    {
        throw new Error("Method not implemented.");
    }
    setDraggable(draggable: boolean): void
    {
        throw new Error("Method not implemented.");
    }
    getIcon(): string | google.maps.Icon | google.maps.Symbol
    {
        throw new Error("Method not implemented.");
    }
    setIcon(icon: string | google.maps.Icon | google.maps.Symbol): void
    {
        throw new Error("Method not implemented.");
    }
    getLabel(): google.maps.MarkerLabel
    {
        throw new Error("Method not implemented.");
    }
    setLabel(label: string | google.maps.MarkerLabel): void
    {
        throw new Error("Method not implemented.");
    }
    getOpacity(): number
    {
        throw new Error("Method not implemented.");
    }
    setOpacity(opacity: number): void
    {
        throw new Error("Method not implemented.");
    }
    getPosition(): google.maps.LatLngLiteral
    {
        throw new Error("Method not implemented.");
    }
    setPosition(position: Coord): void
    {
        throw new Error("Method not implemented.");
    }
    getShape(): google.maps.MarkerShape
    {
        throw new Error("Method not implemented.");
    }
    setShape(shape: google.maps.MarkerShape): void
    {
        throw new Error("Method not implemented.");
    }
    getTitle(): string
    {
        throw new Error("Method not implemented.");
    }
    setTitle(title: string): void
    {
        throw new Error("Method not implemented.");
    }
    getVisible(): boolean
    {
        throw new Error("Method not implemented.");
    }
    setVisible(visible: boolean): void
    {
        throw new Error("Method not implemented.");
    }
    getZIndex(): number
    {
        throw new Error("Method not implemented.");
    }
    setZIndex(zIndex: number): void
    {
        throw new Error("Method not implemented.");
    }
}