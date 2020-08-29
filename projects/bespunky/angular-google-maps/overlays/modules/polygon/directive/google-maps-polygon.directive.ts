import { Observable } from 'rxjs';
import { Directive, Input, Output } from '@angular/core';

import { Coord, Hook, IGoogleMapsEventData } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlayComponentBase    } from '../../../abstraction/base/google-maps-overlay-component-base';
import { IGoogleMapsPolygon                } from '../i-google-maps-polygon';
import { GoogleMapsPolygonFactoryProvider  } from '../google-maps-polygon-factory.provider';

@Directive({    
    selector : 'bs-google-maps-polygon, [bsGoogleMapsPolygon]',
    exportAs : 'polygon',
    providers: [GoogleMapsPolygonFactoryProvider]
})
export class GoogleMapsPolygonDirective extends GoogleMapsOverlayComponentBase<IGoogleMapsPolygon>
{
    @Input() public path?          : Coord[] | Coord[][];
    @Input() public draggable?     : boolean;
    @Input() public editable?      : boolean;
    @Input() public visible?       : boolean;
    @Input() public clickable?     : boolean;
    @Input() public fillColor?     : string;
    @Input() public fillOpacity?   : number;
    @Input() public strokeColor?   : string;
    @Input() public strokeOpacity? : number;
    @Input() public strokePosition?: google.maps.StrokePosition;
    @Input() public strokeWeight?  : number;
    @Input() public zIndex?        : number;
    @Input() public geodesic?      : boolean;
    @Input() public options?       : google.maps.PolygonOptions;

    /** Fired when the DOM click event is fired on the Polygon. */
    @Hook('click')        @Output() click:                   Observable<IGoogleMapsEventData>;
    /** Fired when the DOM dblclick event is fired on the Polygon. */
    @Hook('dblclick')     @Output() doubleClick:             Observable<IGoogleMapsEventData>;
    /** Fired when the Polygon is right-clicked on. */
    @Hook('rightclick')   @Output() rightClick:              Observable<IGoogleMapsEventData>;
    /** Fired repeatedly while the user drags the polygon. */
    @Hook('drag')         @Output() drag:                    Observable<IGoogleMapsEventData>;
    /** Fired when the user starts dragging the polygon. */
    @Hook('dragstart')    @Output() dragStart:               Observable<IGoogleMapsEventData>;
    /** Fired when the the user stops dragging the polygon.. */
    @Hook('dragend')      @Output() dragEnd:                 Observable<IGoogleMapsEventData>;
    /** Fired when the DOM mousedown event is fired on the Polygon. */
    @Hook('mousedown')    @Output() mouseDown:               Observable<IGoogleMapsEventData>;
    /** Fired when the DOM mouseup event is fired on the Polygon. */
    @Hook('mouseup')      @Output() mouseUp:                 Observable<IGoogleMapsEventData>;
    /** Fired when the DOM mousemove event is fired on the Polygon. */
    @Hook('mousemove')    @Output() mouseMove:               Observable<IGoogleMapsEventData>;
    /** Fired on Polygon mouseover. */
    @Hook('mouseover')    @Output() mouseOver:               Observable<IGoogleMapsEventData>;
    /** Fired on Polygon mouseout. */
    @Hook('mouseout')     @Output() mouseOut:                Observable<IGoogleMapsEventData>;
}
