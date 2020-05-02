import { CoordPath, NativeObjectWrapper, Wrap, OutsideAngular, GoogleMapsApiService } from '@bespunky/angular-google-maps/core';
import { GoogleMapsDrawableOverlay } from '../../abstraction/base/google-maps-drawable-overlay';
import { OverlayType               } from '../../abstraction/base/overlay-type.enum';
import { IGoogleMapWithOverlays    } from '../map/i-google-map-with-overlays';
import { IGoogleMapsPolygon        } from './i-google-maps-polygon';

@NativeObjectWrapper
export class GoogleMapsPolygon extends GoogleMapsDrawableOverlay<google.maps.Polygon> implements IGoogleMapsPolygon
{
    constructor(api: GoogleMapsApiService, map: IGoogleMapWithOverlays, ...nativeArgs: any[])
    {
        super(api, map, OverlayType.Polygon, ...nativeArgs);
    }

    protected createNativeObject(options?: google.maps.PolygonOptions): google.maps.Polygon
    {
        return new google.maps.Polygon(options);
    }

    public getPath(): google.maps.LatLngLiteral[][]
    {
        return this.api.geometry.toLiteralMultiPath(this.native.getPaths());
    }

    @OutsideAngular
    public setPath(coords: CoordPath): void
    {
        this.native.setPaths(this.api.geometry.toLiteralMultiPath(coords));
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
