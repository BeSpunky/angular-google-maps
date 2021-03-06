import { Observable } from 'rxjs';
import { Directive, Input, Output } from '@angular/core';

import { IGoogleMapsEventData, Hook, BoundsLike                                 } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlayComponentBase                                         } from '../../../abstraction/base/google-maps-overlay-component-base';
import { GoogleMapsMarkerFactoryProvider, NativeGoogleMapsMarkerFactoryProvider } from '../google-maps-marker-factory.provider';
import { IGoogleMapsMarker                                                      } from '../i-google-maps-marker';

/**
 * Adds a marker to the containing map.
 * 
 * Must be placed inside a `<bs-google-map/>` element.
 *
 * @export
 * @class GoogleMapsMarkerDirective
 * @extends {GoogleMapsOverlayComponentBase<IGoogleMapsMarker>}
 */
@Directive({
    selector : 'bs-google-maps-marker, [bsGoogleMapsMarker]',
    exportAs : 'marker',
    providers: [GoogleMapsMarkerFactoryProvider, NativeGoogleMapsMarkerFactoryProvider]
})
export class GoogleMapsMarkerDirective extends GoogleMapsOverlayComponentBase<IGoogleMapsMarker>
{
    @Input() public animation?: google.maps.Animation;
    @Input() public clickable?: boolean;
    @Input() public cursor?   : string;
    @Input() public draggable?: boolean;
    @Input() public icon?     : string | google.maps.Icon | google.maps.Symbol;
    @Input() public label?    : string;
    @Input() public opacity?  : number;
    @Input() public options?  : google.maps.MarkerOptions;
    @Input() public position? : BoundsLike;
    @Input() public shape?    : google.maps.MarkerShape;
    @Input() public title?    : string;
    @Input() public visible?  : boolean;
    @Input() public zIndex?   : number;

    /** Fired when the marker's animation property changes. */
    @Hook('animation_changed') @Output() public animationChanged      : Observable<IGoogleMapsEventData>;
    /** Fired when the marker icon was clicked. */
    @Hook('click')             @Output() public click                 : Observable<IGoogleMapsEventData>;
    /** Fired for a rightclick on the marker. */
    @Hook('rightclick')        @Output() public rightClick            : Observable<IGoogleMapsEventData>;
    /** Fired when the marker's clickable property changes. */
    @Hook('clickable_changed') @Output() public clickableChanged      : Observable<IGoogleMapsEventData>;
    /** Fired when the marker icon was double clicked. */
    @Hook('dblclick')          @Output() public doubleClick           : Observable<IGoogleMapsEventData>;
    /** Fired for a mousedown on the marker. */
    @Hook('mousedown')         @Output() public mouseDown             : Observable<IGoogleMapsEventData>;
    /** Fired when the mouse leaves the area of the marker icon. */
    @Hook('mouseout')          @Output() public mouseOut              : Observable<IGoogleMapsEventData>;
    /** Fired when the mouse enters the area of the marker icon. */
    @Hook('mouseover')         @Output() public mouseOver             : Observable<IGoogleMapsEventData>;
    /** Fired for a mouseup on the marker. */
    @Hook('mouseup')           @Output() public mouseUp               : Observable<IGoogleMapsEventData>;
    /** Fired when the marker's cursor property changes. */
    @Hook('cursor_changed')    @Output() public cursorChanged         : Observable<IGoogleMapsEventData>;
    /** Fired repeatedly while the user drags the marker. */
    @Hook('drag')              @Output() public drag                  : Observable<IGoogleMapsEventData>;
    /** Fired when the user stops dragging the marker. */
    @Hook('dragend')           @Output() public dragEnd               : Observable<IGoogleMapsEventData>;
    /** Fired when the marker's draggable property changes. */
    @Hook('draggable_changed') @Output() public draggableChanged      : Observable<IGoogleMapsEventData>;
    /** Fired when the user starts dragging the marker. */
    @Hook('dragstart')         @Output() public dragStart             : Observable<IGoogleMapsEventData>;
    /** Fired when the marker's flat property changes. */
    @Hook('flat_changed')      @Output() public flatChanged           : Observable<IGoogleMapsEventData>;
    /** Fired when the marker icon property changes. */
    @Hook('icon_changed')      @Output() public iconChanged           : Observable<IGoogleMapsEventData>;
    /** Fired when the marker position property changes. */
    @Hook('position_changed')  @Output() public positionChanged       : Observable<IGoogleMapsEventData>;
    /** Fired when the marker's shape property changes. */
    @Hook('shape_changed')     @Output() public shapeChanged          : Observable<IGoogleMapsEventData>;
    /** Fired when the marker title property changes. */
    @Hook('title_changed')     @Output() public titleChanged          : Observable<IGoogleMapsEventData>;
    /** Fired when the marker's visible property changes. */
    @Hook('visible_changed')   @Output() public visibleChanged        : Observable<IGoogleMapsEventData>;
    /** Fired when the marker's zIndex property changes.    */
    @Hook('zindex_changed')    @Output() public zIndexChanged         : Observable<IGoogleMapsEventData>;
}
