import { MockFill } from "../../../testing/mock-fill.decorator.spec";
import { MockDrawableOverlay } from "../../../core/abstraction/testing/mock-drawable-overlay.spec";
import { IGoogleMapsMarker } from "../i-google-maps-marker";
import { OverlayType } from '../../../core/abstraction/base/overlay-type.enum';
import { IGoogleMap } from '../../../google-map/i-google-map';

@MockFill
export class MockMarker extends MockDrawableOverlay<google.maps.Marker> implements IGoogleMapsMarker
{
    constructor(map: IGoogleMap, native?: google.maps.Marker)
    {
        super(map, native || new google.maps.Marker());

        this.type = OverlayType.Marker;
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
    getPosition(): google.maps.LatLng
    {
        throw new Error("Method not implemented.");
    }
    setPosition(position: google.maps.LatLng | google.maps.LatLngLiteral): void
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