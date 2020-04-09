import { GoogleMapsDrawableOverlay } from '../../core/abstraction/base/google-maps-drawable-overlay';
import { IGoogleMapsPolygon } from './igoogle-maps-polygon';
import { Coord } from '../../core/abstraction/types/geometry-utils.type';
import { NativeObjectWrapper } from '../../core/decorators/native-object-wrapper.decorator';
import { Wrap } from '../../core/decorators/wrap.decorator';
import { OutsideAngular } from '../../core/decorators/outside-angular.decorator';

@NativeObjectWrapper
export class GoogleMapsPolygon extends GoogleMapsDrawableOverlay<google.maps.Polygon> implements IGoogleMapsPolygon
{
    protected createNativeObject(options?: google.maps.PolygonOptions): google.maps.Polygon
    {
        return new google.maps.Polygon(options);
    }

    public getPath(): google.maps.LatLngLiteral[][]
    {
        return this.api.geometry.toMultiPath(this.native.getPaths());
    }

    @OutsideAngular
    public setPath(coords: Coord[] | Coord[][]): void
    {
        this.native.setPaths(this.api.geometry.toMultiPath(coords));
    }

    setClickable     (clickable: boolean)                        : void { this.setOptions({ clickable }); }
    setFillColor     (fillColor: string)                         : void { this.setOptions({ fillColor }); }
    setFillOpacity   (fillOpacity: number)                       : void { this.setOptions({ fillOpacity }); }
    setStrokeColor   (strokeColor: string)                       : void { this.setOptions({ strokeColor }); }
    setStrokeOpacity (strokeOpacity: number)                     : void { this.setOptions({ strokeOpacity }); }
    setStrokePosition(strokePosition: google.maps.StrokePosition): void { this.setOptions({ strokePosition }); }
    setStrokeWeight  (strokeWeight: number)                      : void { this.setOptions({ strokeWeight }); }
    setZIndex        (zIndex: number)                            : void { this.setOptions({ zIndex }); }
    setGeodesic      (geodesic: boolean)                         : void { this.setOptions({ geodesic }); }

    @Wrap() getDraggable(): boolean { return void 0; }

    @Wrap() @OutsideAngular setDraggable(draggable: boolean): void { }

    @Wrap() getEditable(): boolean { return void 0; }

    @Wrap() @OutsideAngular setEditable(editable: boolean): void { }

    @Wrap() getVisible(): boolean { return void 0; }

    @Wrap() @OutsideAngular setVisible(visible: boolean): void { }

    @Wrap() @OutsideAngular setOptions(options: google.maps.PolygonOptions): void { }
}
