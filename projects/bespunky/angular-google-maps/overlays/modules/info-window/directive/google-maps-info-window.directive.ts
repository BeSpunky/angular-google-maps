import { Observable } from 'rxjs';
import { Directive, Input, Output } from '@angular/core';

import { GoogleMapsEventData, Hook, Coord } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlayComponentBase  } from '../../../abstraction/base/google-maps-overlay-component-base';
import { IGoogleMapsInfoWindow               } from '../i-google-maps-info-window';
import { GoogleMapsInfoWindowFactoryProvider } from '../google-maps-info-window-factory.provider';

@Directive({
    selector : 'bs-google-maps-info-window, [bsGoogleMapsInfoWindow]',
    exportAs : 'infoWindow',
    providers: [GoogleMapsInfoWindowFactoryProvider]
})
export class GoogleMapsInfoWindowDirective extends GoogleMapsOverlayComponentBase<IGoogleMapsInfoWindow>
{
    @Input() public animation?: google.maps.Animation;
    @Input() public clickable?: boolean;
    @Input() public cursor?   : string;
    @Input() public draggable?: boolean;
    @Input() public icon?     : string | google.maps.Icon | google.maps.Symbol;
    @Input() public label?    : string;
    @Input() public opacity?  : number;
    @Input() public options?  : google.maps.InfoWindowOptions;
    @Input() public position? : Coord;
    @Input() public shape?    : google.maps.InfoWindowShape;
    @Input() public title?    : string;
    @Input() public visible?  : boolean;
    @Input() public zIndex?   : number;

    /** Fired when the infoWindow's animation property changes. */
    @Hook('animation_changed') @Output() public animationChanged      : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow icon was clicked. */
    @Hook('click')             @Output() public click                 : Observable<GoogleMapsEventData>;
    /** Fired for a rightclick on the infoWindow. */
    @Hook('rightclick')        @Output() public rightClick            : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow's clickable property changes. */
    @Hook('clickable_changed') @Output() public clickableChanged      : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow icon was double clicked. */
    @Hook('dblclick')          @Output() public doubleClick           : Observable<GoogleMapsEventData>;
    /** Fired for a mousedown on the infoWindow. */
    @Hook('mousedown')         @Output() public mouseDown             : Observable<GoogleMapsEventData>;
    /** Fired when the mouse leaves the area of the infoWindow icon. */
    @Hook('mouseout')          @Output() public mouseOut              : Observable<GoogleMapsEventData>;
    /** Fired when the mouse enters the area of the infoWindow icon. */
    @Hook('mouseover')         @Output() public mouseOver             : Observable<GoogleMapsEventData>;
    /** Fired for a mouseup on the infoWindow. */
    @Hook('mouseup')           @Output() public mouseUp               : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow's cursor property changes. */
    @Hook('cursor_changed')    @Output() public cursorChanged         : Observable<GoogleMapsEventData>;
    /** Fired repeatedly while the user drags the infoWindow. */
    @Hook('drag')              @Output() public drag                  : Observable<GoogleMapsEventData>;
    /** Fired when the user stops dragging the infoWindow. */
    @Hook('dragend')           @Output() public dragEnd               : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow's draggable property changes. */
    @Hook('draggable_changed') @Output() public draggableChanged      : Observable<GoogleMapsEventData>;
    /** Fired when the user starts dragging the infoWindow. */
    @Hook('dragstart')         @Output() public dragStart             : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow's flat property changes. */
    @Hook('flat_changed')      @Output() public flatChanged           : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow icon property changes. */
    @Hook('icon_changed')      @Output() public iconChanged           : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow position property changes. */
    @Hook('position_changed')  @Output() public positionChanged       : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow's shape property changes. */
    @Hook('shape_changed')     @Output() public shapeChanged          : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow title property changes. */
    @Hook('title_changed')     @Output() public titleChanged          : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow's visible property changes. */
    @Hook('visible_changed')   @Output() public visibleChanged        : Observable<GoogleMapsEventData>;
    /** Fired when the infoWindow's zIndex property changes.    */
    @Hook('zindex_changed')    @Output() public zIndexChanged         : Observable<GoogleMapsEventData>;
}
