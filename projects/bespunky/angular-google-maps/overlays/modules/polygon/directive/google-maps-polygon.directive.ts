import { Observable } from 'rxjs';
import { Directive, Input, Output } from '@angular/core';

import { Coord, Hook, GoogleMapsEventData } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlayLifecycleBase   } from '../../../abstraction/base/google-maps-overlay-lifecycle-base';
import { IGoogleMapsPolygon               } from '../i-google-maps-polygon';

@Directive({    
    selector: 'bs-google-maps-polygon, [bsGoogleMapsPolygon]',
    exportAs: 'polygon'
})
export class GoogleMapsPolygonDirective extends GoogleMapsOverlayLifecycleBase<IGoogleMapsPolygon>
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
    @Hook('click')        @Output() click:                   Observable<GoogleMapsEventData>;
    /** Fired when the DOM dblclick event is fired on the Polygon. */
    @Hook('dblclick')     @Output() doubleClick:             Observable<GoogleMapsEventData>;
    /** Fired when the Polygon is right-clicked on. */
    @Hook('rightclick')   @Output() rightClick:              Observable<GoogleMapsEventData>;
    /** Fired repeatedly while the user drags the polygon. */
    @Hook('drag')         @Output() drag:                    Observable<GoogleMapsEventData>;
    /** Fired when the user starts dragging the polygon. */
    @Hook('dragstart')    @Output() dragStart:               Observable<GoogleMapsEventData>;
    /** Fired when the the user stops dragging the polygon.. */
    @Hook('dragend')      @Output() dragEnd:                 Observable<GoogleMapsEventData>;
    /** Fired when the DOM mousedown event is fired on the Polygon. */
    @Hook('mousedown')    @Output() mouseDown:               Observable<GoogleMapsEventData>;
    /** Fired when the DOM mouseup event is fired on the Polygon. */
    @Hook('mouseup')      @Output() mouseUp:                 Observable<GoogleMapsEventData>;
    /** Fired when the DOM mousemove event is fired on the Polygon. */
    @Hook('mousemove')    @Output() mouseMove:               Observable<GoogleMapsEventData>;
    /** Fired on Polygon mouseover. */
    @Hook('mouseover')    @Output() mouseOver:               Observable<GoogleMapsEventData>;
    /** Fired on Polygon mouseout. */
    @Hook('mouseout')     @Output() mouseOut:                Observable<GoogleMapsEventData>;
}
