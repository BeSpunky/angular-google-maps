import { Observable } from 'rxjs';
import { Directive, Input, Output } from '@angular/core';

import { BoundsLike, Hook, IGoogleMapsEventData } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlayComponentBase    } from '../../../abstraction/base/google-maps-overlay-component-base';
import { IGoogleMapsCircle                 } from '../i-google-maps-circle';
import { GoogleMapsCircleFactoryProvider   } from '../google-maps-circle-factory.provider';

@Directive({    
    selector : 'bs-google-maps-circle, [bsGoogleMapsCircle]',
    exportAs : 'circle',
    providers: [GoogleMapsCircleFactoryProvider]
})
export class GoogleMapsCircleDirective extends GoogleMapsOverlayComponentBase<IGoogleMapsCircle>
{
    // The directive uses BoundsLike to allow flexibility. For type precision, users will use wrapper.getCenter();
    @Input() public center?        : BoundsLike;
    @Input() public radius?        : number;
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
    @Input() public options?       : google.maps.CircleOptions;

    /* This event is fired when the circle's center is changed. */
    @Hook('center_changed') @Output() public centerChanged: Observable<IGoogleMapsEventData>;	
    /* This event is fired when the DOM click event is fired on the circle. */
    @Hook('click')          @Output() public click        : Observable<IGoogleMapsEventData>;	
    /* This event is fired when the DOM dblclick event is fired on the circle. */
    @Hook('dblclick')       @Output() public doubleClick  : Observable<IGoogleMapsEventData>;	
    /* This event is repeatedly fired while the user drags the circle. */
    @Hook('drag')           @Output() public drag         : Observable<IGoogleMapsEventData>;	
    /* This event is fired when the user stops dragging the circle. */
    @Hook('dragend')        @Output() public dragEnd      : Observable<IGoogleMapsEventData>;	
    /* This event is fired when the user starts dragging the circle. */
    @Hook('dragstart')      @Output() public dragStart    : Observable<IGoogleMapsEventData>;	
    /* This event is fired when the DOM mousedown event is fired on the circle. */
    @Hook('mousedown')      @Output() public mouseDown    : Observable<IGoogleMapsEventData>;	
    /* This event is fired when the DOM mousemove event is fired on the circle. */
    @Hook('mousemove')      @Output() public mouseMove    : Observable<IGoogleMapsEventData>;	
    /* This event is fired on circle mouseout. */
    @Hook('mouseout')       @Output() public mouseOut     : Observable<IGoogleMapsEventData>;	
    /* This event is fired on circle mouseover. */
    @Hook('mouseover')      @Output() public mouseOver    : Observable<IGoogleMapsEventData>;	
    /* This event is fired when the DOM mouseup event is fired on the circle. */
    @Hook('mouseup')        @Output() public mouseUp       : Observable<IGoogleMapsEventData>;	
    /* This event is fired when the circle's radius is changed. */
    @Hook('radius_changed') @Output() public radiusChanged: Observable<IGoogleMapsEventData>;
    /* This event is fired when the circle is right - clicked on. */
    @Hook('rightclick')     @Output() public rightClick   : Observable<IGoogleMapsEventData>;	
}
