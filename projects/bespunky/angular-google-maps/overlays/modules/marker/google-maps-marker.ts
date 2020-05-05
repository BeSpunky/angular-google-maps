
import { GoogleMapsApiService, NativeObjectWrapper, IGoogleMap, Wrap, OutsideAngular, Coord } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay } from '../../abstraction/base/google-maps-drawable-overlay';
import { OverlayType               } from '../../abstraction/base/overlay-type.enum';
import { IGoogleMapsMarker         } from './i-google-maps-marker';

// @dynamic
@NativeObjectWrapper
export class GoogleMapsMarker extends GoogleMapsDrawableOverlay<google.maps.Marker> implements IGoogleMapsMarker
{
    constructor(api: GoogleMapsApiService, public map: IGoogleMap, options?: google.maps.ReadonlyMarkerOptions)
    {
        super(api, map, OverlayType.Marker, options);
    }

    protected createNativeObject(options?: google.maps.ReadonlyMarkerOptions): google.maps.Marker
    {
        return new google.maps.Marker(options);
    }
    
    public getPosition(): google.maps.LatLngLiteral
    {
        return this.api.geometry.toLiteralCoord(this.native.getPosition());
    }
    
    @OutsideAngular
    public setPosition(position: Coord): void
    {
        this.native.setPosition(this.api.geometry.toLiteralCoord(position));
    }
    
    @Wrap() @OutsideAngular
    setOptions(options: google.maps.MarkerOptions): void { }

    @Wrap()
    getAnimation(): google.maps.Animation { return void 0; }

    @Wrap()
    setAnimation(animation?: google.maps.Animation): void { }

    @Wrap()
    getClickable(): boolean { return void 0; }

    @Wrap() @OutsideAngular
    setClickable(clickable: boolean): void { }

    @Wrap()
    getCursor(): string { return void 0; }

    @Wrap() @OutsideAngular
    setCursor(cursor: string): void { }

    @Wrap()
    getDraggable(): boolean { return void 0; }

    @Wrap() @OutsideAngular
    setDraggable(draggable: boolean): void { }

    @Wrap()
    getIcon(): string | google.maps.Icon | google.maps.Symbol { return void 0; }

    @Wrap() @OutsideAngular
    setIcon(icon: string | google.maps.Icon | google.maps.Symbol): void { }

    @Wrap()
    getLabel(): google.maps.MarkerLabel { return void 0; }

    @Wrap() @OutsideAngular
    setLabel(label: string | google.maps.MarkerLabel): void { }

    @Wrap()
    getOpacity(): number { return void 0; }

    @Wrap() @OutsideAngular
    setOpacity(opacity: number): void { }
  
    @Wrap()
    getShape(): google.maps.MarkerShape { return void 0; }

    @Wrap() @OutsideAngular
    setShape(shape: google.maps.MarkerShape): void { }

    @Wrap()
    getTitle(): string { return void 0; }

    @Wrap() @OutsideAngular
    setTitle(title: string): void { }

    @Wrap()
    getVisible(): boolean { return void 0; }

    @Wrap() @OutsideAngular
    setVisible(visible: boolean): void { }

    @Wrap()
    getZIndex(): number { return void 0; }

    @Wrap() @OutsideAngular
    setZIndex(zIndex: number): void { }
}