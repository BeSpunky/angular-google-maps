import { Observable } from 'rxjs';
import { Directive, Input, Output } from '@angular/core';

import { GoogleMapsOverlayLifecycleBase } from '../../../core/abstraction/base/google-maps-overlay-lifecycle-base';
import { IGoogleMapsMarker } from '../i-google-maps-marker';
import { GoogleMapsMarkerFactoryProvider } from '../google-maps-marker-factory.provider';
import { MarkerEventsMapProvider } from './marker-event.enum';
import { Wrapper } from '../../../core/decorators/wrapper.decorator';
import { GoogleMapsEventData } from '../../../core/abstraction/events/google-maps-event-data';

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
    @Output() public animationChanged                               : Observable<GoogleMapsEventData>;
    /** Fired when the marker icon was clicked. */
    @Output() public click                                          : Observable<GoogleMapsEventData>;
    /** Fired for a rightclick on the marker. */
    @Output() public rightClick                                     : Observable<GoogleMapsEventData>;
    /** Fired when the marker's clickable property changes. */
    @Output() public clickableChanged                               : Observable<GoogleMapsEventData>;
    /** Fired when the marker icon was double clicked. */
    @Output() public doubleClick                                    : Observable<GoogleMapsEventData>;
    /** Fired for a mousedown on the marker. */
    @Output() public mouseDown                                      : Observable<GoogleMapsEventData>;
    /** Fired when the mouse leaves the area of the marker icon. */
    @Output() public mouseOut                                       : Observable<GoogleMapsEventData>;
    /** Fired when the mouse enters the area of the marker icon. */
    @Output() public mouseOver                                      : Observable<GoogleMapsEventData>;
    /** Fired for a mouseup on the marker. */
    @Output() public mouseUp                                        : Observable<GoogleMapsEventData>;
    /** Fired when the marker's cursor property changes. */
    @Output() public cursorChanged                                  : Observable<GoogleMapsEventData>;
    /** Fired repeatedly while the user drags the marker. */
    @Output() public drag                                           : Observable<GoogleMapsEventData>;
    /** Fired when the user stops dragging the marker. */
    @Output() public dragEnd                                        : Observable<GoogleMapsEventData>;
    /** Fired when the marker's draggable property changes. */
    @Output() public draggableChanged                               : Observable<GoogleMapsEventData>;
    /** Fired when the user starts dragging the marker. */
    @Output() public dragStart                                      : Observable<GoogleMapsEventData>;
    /** Fired when the marker's flat property changes. */
    @Output() public flatChanged                                    : Observable<GoogleMapsEventData>;
    /** Fired when the marker icon property changes. */
    @Output() public iconChanged                                    : Observable<GoogleMapsEventData>;
    /** Fired when the marker position property changes. */
    @Output() public positionChanged                                : Observable<GoogleMapsEventData>;
    /** Fired when the marker's shape property changes. */
    @Output() public shapeChanged                                   : Observable<GoogleMapsEventData>;
    /** Fired when the marker title property changes. */
    @Output() public titleChanged                                   : Observable<GoogleMapsEventData>;
    /** Fired when the marker's visible property changes. */
    @Output() public visibleChanged                                 : Observable<GoogleMapsEventData>;
    /** Fired when the marker's zIndex property changes.    */
    @Output() public zIndexChanged                                  : Observable<GoogleMapsEventData>;
}
