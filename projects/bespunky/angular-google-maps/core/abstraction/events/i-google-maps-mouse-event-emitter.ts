import { Observable } from 'rxjs';
import { IGoogleMapsEventData } from './i-google-maps-event-data';

/**
 * Defines the contract for wrappers emitting mouse related events.
 *
 * @export
 * @interface IGoogleMapsMouseEventsEmitter
 */
export interface IGoogleMapsMouseEventsEmitter
{
    /** Fired for a click on the element. */
    click      : Observable<IGoogleMapsEventData>;
    /** Fired for a double click on the element. */
    doubleClick: Observable<IGoogleMapsEventData>;
    /** Fired for a mousedown on the element. */
    mouseDown  : Observable<IGoogleMapsEventData>;
    /** Fired when the mouse leaves the area of the element. */
    mouseOut   : Observable<IGoogleMapsEventData>;
    /** Fired when the mouse enters the area of the element. */
    mouseOver  : Observable<IGoogleMapsEventData>;
    /** Fired for a mouseup on the element. */
    mouseUp    : Observable<IGoogleMapsEventData>;
    /** Fired for a rightclick on the element. */
    rightClick : Observable<IGoogleMapsEventData>;
}