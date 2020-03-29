import { Directive, Input, Output, EventEmitter } from '@angular/core';

import { GoogleMapsOverlayLifecycleBase } from '../../../core/abstraction/base/google-maps-overlay-lifecycle-base';
import { IGoogleMapsMarker } from '../i-google-maps-marker';
import { GoogleMapsMarkerFactoryProvider } from '../google-maps-marker-factory.provider';
import { MarkerEventsMapProvider } from './marker-event.enum';
import { Wrapper } from '../../../core/decorators/wrapper.decorator';

@Directive({
    selector: 'bs-google-maps-marker, [bsGoogleMapsMarker]',
    exportAs: 'marker',
    providers: [
        GoogleMapsMarkerFactoryProvider,
        MarkerEventsMapProvider
    ]
})
export class GoogleMapsMarkerDirective extends GoogleMapsOverlayLifecycleBase
{
    @Wrapper @Input() public marker?: IGoogleMapsMarker;
    @Input  () public options?      : google.maps.MarkerOptions;
    @Input  () public position?     : google.maps.LatLng | google.maps.LatLngLiteral;

    /** Fired when the marker's animation property changes. */
    @Output() public animationChanged                               = new EventEmitter();
    /** Fired when the marker icon was clicked. */
    @Output() public click                                          = new EventEmitter();
    /** Fired for a rightclick on the marker. */
    @Output() public rightClick                                     = new EventEmitter();
    /** Fired when the marker's clickable property changes. */
    @Output() public clickableChanged                               = new EventEmitter();
    /** Fired when the marker icon was double clicked. */
    @Output() public doubleClick                                    = new EventEmitter();
    /** Fired for a mousedown on the marker. */
    @Output() public mouseDown                                      = new EventEmitter();
    /** Fired when the mouse leaves the area of the marker icon. */
    @Output() public mouseOut                                       = new EventEmitter();
    /** Fired when the mouse enters the area of the marker icon. */
    @Output() public mouseOver                                      = new EventEmitter();
    /** Fired for a mouseup on the marker. */
    @Output() public mouseUp                                        = new EventEmitter();
    /** Fired when the marker's cursor property changes. */
    @Output() public cursorChanged                                  = new EventEmitter();
    /** Fired repeatedly while the user drags the marker. */
    @Output() public drag                                           = new EventEmitter();
    /** Fired when the user stops dragging the marker. */
    @Output() public dragEnd                                        = new EventEmitter();
    /** Fired when the marker's draggable property changes. */
    @Output() public draggableChanged                               = new EventEmitter();
    /** Fired when the user starts dragging the marker. */
    @Output() public dragStart                                      = new EventEmitter();
    /** Fired when the marker's flat property changes. */
    @Output() public flatChanged                                    = new EventEmitter();
    /** Fired when the marker icon property changes. */
    @Output() public iconChanged                                    = new EventEmitter();
    /** Fired when the marker position property changes. */
    @Output() public positionChanged                                = new EventEmitter();
    /** Fired when the marker's shape property changes. */
    @Output() public shapeChanged                                   = new EventEmitter();
    /** Fired when the marker title property changes. */
    @Output() public titleChanged                                   = new EventEmitter();
    /** Fired when the marker's visible property changes. */
    @Output() public visibleChanged                                 = new EventEmitter();
    /** Fired when the marker's zIndex property changes.    */
    @Output() public zIndexChanged                                  = new EventEmitter();
}
