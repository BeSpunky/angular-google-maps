import { Observable } from 'rxjs';
import { GoogleMapsEventData } from './google-maps-event-data';

/**
 * Defines the contract for wrappers emitting mouse related events.
 *
 * @export
 * @interface IGoogleMapsMouseEventsEmitter
 */
export interface IGoogleMapsMouseEventsEmitter
{
    /** Fired for a click on the element. */
    click      : Observable<GoogleMapsEventData>;
    /** Fired for a double click on the element. */
    doubleClick: Observable<GoogleMapsEventData>;
    /** Fired for a mousedown on the element. */
    mouseDown  : Observable<GoogleMapsEventData>;
    /** Fired when the mouse leaves the area of the element. */
    mouseOut   : Observable<GoogleMapsEventData>;
    /** Fired when the mouse enters the area of the element. */
    mouseOver  : Observable<GoogleMapsEventData>;
    /** Fired for a mouseup on the element. */
    mouseUp    : Observable<GoogleMapsEventData>;
    /** Fired for a rightclick on the element. */
    rightClick : Observable<GoogleMapsEventData>;
}