
import { GoogleMapsApiService } from '../../core/api/google-maps-api.service';
import { IGoogleMap } from '../../google-map/i-google-map';
import { IGoogleMapsMarker } from './i-google-maps-marker';
import { NativeObjectWrapper } from '../../core/decorators/native-object-wrapper.decorator';
import { GoogleMapsDrawableOverlay } from '../../core/abstraction/base/google-maps-drawable-overlay';
import { OverlayType } from '../../core/abstraction/base/overlay-type.enum';
import { Wrap } from '../../core/decorators/wrap.decorator';
import { OutsideAngular } from '../../core/decorators/outside-angular.decorator';

@NativeObjectWrapper
export class GoogleMapsMarker extends GoogleMapsDrawableOverlay<google.maps.Marker> implements IGoogleMapsMarker
{
    constructor(api: GoogleMapsApiService, public map: IGoogleMap, private options?: google.maps.ReadonlyMarkerOptions)
    {
        super(api, map, OverlayType.Marker);
    }

    protected createNativeObject(): google.maps.Marker
    {
        return new google.maps.Marker(this.options);
    }
    
    @Wrap() @OutsideAngular
    setOptions(options: google.maps.MarkerOptions): void { return void 0; }

    @Wrap()
    getAnimation(): google.maps.Animation { return void 0; }

    @Wrap()
    setAnimation(animation?: google.maps.Animation): void { return void 0; }

    @Wrap()
    getClickable(): boolean { return void 0; }

    @Wrap() @OutsideAngular
    setClickable(clickable: boolean): void { return void 0; }

    @Wrap()
    getCursor(): string { return void 0; }

    @Wrap() @OutsideAngular
    setCursor(cursor: string): void { return void 0; }

    @Wrap()
    getDraggable(): boolean { return void 0; }

    @Wrap() @OutsideAngular
    setDraggable(draggable: boolean): void { return void 0; }

    @Wrap()
    getIcon(): string | google.maps.Icon | google.maps.Symbol { return void 0; }

    @Wrap() @OutsideAngular
    setIcon(icon: string | google.maps.Icon | google.maps.Symbol): void { return void 0; }

    @Wrap()
    getLabel(): google.maps.MarkerLabel { return void 0; }

    @Wrap() @OutsideAngular
    setLabel(label: string | google.maps.MarkerLabel): void { return void 0; }

    @Wrap()
    getOpacity(): number { return void 0; }

    @Wrap() @OutsideAngular
    setOpacity(opacity: number): void { return void 0; }
  
    @Wrap()
    getPosition(): google.maps.LatLng { return void 0; }
    
    @Wrap() @OutsideAngular
    setPosition(position: google.maps.LatLng | google.maps.LatLngLiteral): void { return void 0; }

    @Wrap()
    getShape(): google.maps.MarkerShape { return void 0; }

    @Wrap() @OutsideAngular
    setShape(shape: google.maps.MarkerShape): void { return void 0; }

    @Wrap()
    getTitle(): string { return void 0; }

    @Wrap() @OutsideAngular
    setTitle(title: string): void { return void 0; }

    @Wrap()
    getVisible(): boolean { return void 0; }

    @Wrap() @OutsideAngular
    setVisible(visible: boolean): void { return void 0; }

    @Wrap()
    getZIndex(): number { return void 0; }

    @Wrap() @OutsideAngular
    setZIndex(zIndex: number): void { return void 0; }
}