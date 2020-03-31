import { Observable } from 'rxjs';
import { Directive, Input, Output } from '@angular/core';

import { GoogleMapsOverlayLifecycleBase } from '../../../core/abstraction/base/google-maps-overlay-lifecycle-base';
import { GoogleMapsMarkerFactoryProvider } from '../google-maps-marker-factory.provider';
import { GoogleMapsEventData } from '../../../core/abstraction/events/google-maps-event-data';
import { Hook } from '../../../core/decorators/hook.decorator';
import { IGoogleMapsMarker } from '../i-google-maps-marker';

@Directive({
    selector: 'bs-google-maps-marker, [bsGoogleMapsMarker]',
    exportAs: 'marker',
    providers: [ GoogleMapsMarkerFactoryProvider ]
})
export class GoogleMapsMarkerDirective extends GoogleMapsOverlayLifecycleBase<IGoogleMapsMarker>
{
    @Input() public position?     : google.maps.LatLng | google.maps.LatLngLiteral;

    /** Fired when the marker's animation property changes. */
    @Hook('animation_changed') @Output() public animationChanged      : Observable<GoogleMapsEventData>;
    /** Fired when the marker icon was clicked. */
    @Hook('click')             @Output() public click                 : Observable<GoogleMapsEventData>;
    /** Fired for a rightclick on the marker. */
    @Hook('rightclick')        @Output() public rightClick            : Observable<GoogleMapsEventData>;
    /** Fired when the marker's clickable property changes. */
    @Hook('clickable_changed') @Output() public clickableChanged      : Observable<GoogleMapsEventData>;
    /** Fired when the marker icon was double clicked. */
    @Hook('dblclick')          @Output() public doubleClick           : Observable<GoogleMapsEventData>;
    /** Fired for a mousedown on the marker. */
    @Hook('mousedown')         @Output() public mouseDown             : Observable<GoogleMapsEventData>;
    /** Fired when the mouse leaves the area of the marker icon. */
    @Hook('mouseout')          @Output() public mouseOut              : Observable<GoogleMapsEventData>;
    /** Fired when the mouse enters the area of the marker icon. */
    @Hook('mouseover')         @Output() public mouseOver             : Observable<GoogleMapsEventData>;
    /** Fired for a mouseup on the marker. */
    @Hook('mouseup')           @Output() public mouseUp               : Observable<GoogleMapsEventData>;
    /** Fired when the marker's cursor property changes. */
    @Hook('cursor_changed')    @Output() public cursorChanged         : Observable<GoogleMapsEventData>;
    /** Fired repeatedly while the user drags the marker. */
    @Hook('drag')              @Output() public drag                  : Observable<GoogleMapsEventData>;
    /** Fired when the user stops dragging the marker. */
    @Hook('dragend')           @Output() public dragEnd               : Observable<GoogleMapsEventData>;
    /** Fired when the marker's draggable property changes. */
    @Hook('draggable_changed') @Output() public draggableChanged      : Observable<GoogleMapsEventData>;
    /** Fired when the user starts dragging the marker. */
    @Hook('dragstart')         @Output() public dragStart             : Observable<GoogleMapsEventData>;
    /** Fired when the marker's flat property changes. */
    @Hook('flat_changed')      @Output() public flatChanged           : Observable<GoogleMapsEventData>;
    /** Fired when the marker icon property changes. */
    @Hook('icon_changed')      @Output() public iconChanged           : Observable<GoogleMapsEventData>;
    /** Fired when the marker position property changes. */
    @Hook('position_changed')  @Output() public positionChanged       : Observable<GoogleMapsEventData>;
    /** Fired when the marker's shape property changes. */
    @Hook('shape_changed')     @Output() public shapeChanged          : Observable<GoogleMapsEventData>;
    /** Fired when the marker title property changes. */
    @Hook('title_changed')     @Output() public titleChanged          : Observable<GoogleMapsEventData>;
    /** Fired when the marker's visible property changes. */
    @Hook('visible_changed')   @Output() public visibleChanged        : Observable<GoogleMapsEventData>;
    /** Fired when the marker's zIndex property changes.    */
    @Hook('zindex_changed')    @Output() public zIndexChanged         : Observable<GoogleMapsEventData>;
}
