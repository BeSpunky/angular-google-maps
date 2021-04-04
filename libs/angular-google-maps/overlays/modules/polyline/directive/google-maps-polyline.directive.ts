import { Observable } from 'rxjs';
import { Directive, Input, Output } from '@angular/core';

import { Hook, IGoogleMapsEventData, Path                                           } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlayComponentBase                                             } from '../../../abstraction/base/google-maps-overlay-component-base';
import { GoogleMapsPolylineFactoryProvider, NativeGoogleMapsPolylineFactoryProvider } from '../google-maps-polyline-factory.provider';
import { IGoogleMapsPolyline                                                        } from '../i-google-maps-polyline';

/**
 * Adds a polyline to the containing map.
 * 
 * Must be placed inside a `<bs-google-map/>` element.
 *
 * @export
 * @class GoogleMapsPolylineDirective
 * @extends {GoogleMapsOverlayComponentBase<IGoogleMapsPolyline>}
 */
@Directive({    
    selector : 'bs-google-maps-polyline, [bsGoogleMapsPolyline]',
    exportAs : 'polyline',
    providers: [GoogleMapsPolylineFactoryProvider, NativeGoogleMapsPolylineFactoryProvider]
})
export class GoogleMapsPolylineDirective extends GoogleMapsOverlayComponentBase<IGoogleMapsPolyline>
{
    @Input() public path?          : Path;
    @Input() public draggable?     : boolean;
    @Input() public editable?      : boolean;
    @Input() public visible?       : boolean;
    @Input() public clickable?     : boolean;
    @Input() public strokeColor?   : string;
    @Input() public strokeOpacity? : number;
    @Input() public strokeWeight?  : number;
    @Input() public zIndex?        : number;
    @Input() public geodesic?      : boolean;
    @Input() public options?       : google.maps.PolylineOptions;

    /** This event is fired when the DOM click event is fired on the Polyline. */
    @Hook('click')       @Output() click	    : Observable<IGoogleMapsEventData>;
    /** This event is fired when the DOM contextmenu event is fired on Poyline. */
    @Hook('contextmenu') @Output() contextMenu	: Observable<IGoogleMapsEventData>;
    /** This event is fired when the DOM dblclick event is fired on the Polyline. */
    @Hook('dblclick')    @Output() doubleClick	: Observable<IGoogleMapsEventData>;
    /** This event is repeatedly fired while the user drags the polyline. */
    @Hook('drag')        @Output() drag	        : Observable<IGoogleMapsEventData>;
    /** This event is fired when the user stops dragging the polyline. */
    @Hook('dragend')     @Output() dragEnd	    : Observable<IGoogleMapsEventData>;
    /** This event is fired when the user starts dragging the polyline. */
    @Hook('dragstart')   @Output() dragStart	: Observable<IGoogleMapsEventData>;
    /** This event is fired when the DOM mousedown event is fired on the Polyline. */
    @Hook('mousedown')   @Output() mouseDown	: Observable<IGoogleMapsEventData>;
    /** This event is fired when the DOM mousemove event is fired on the Polyline. */
    @Hook('mousemove')   @Output() mouseMove	: Observable<IGoogleMapsEventData>;
    /** This event is fired on Polyline mouseout. */
    @Hook('mouseout')    @Output() mouseOut	    : Observable<IGoogleMapsEventData>;
    /** This event is fired on Polyline mouseover. */
    @Hook('mouseover')   @Output() mouseOver	: Observable<IGoogleMapsEventData>;
    /** This event is fired when the DOM mouseup event is fired on the Polyline. */
    @Hook('mouseup')     @Output() mouseUp	    : Observable<IGoogleMapsEventData>;
    /**
     * This event is fired when the Polyline is right-clicked on.
     * Notice: Use the Polyline.contextmenu event instead in order to support usage patterns like control-click on macOS.
     */
    @Hook('rightclick')  @Output() rightClick	: Observable<IGoogleMapsEventData>;
}
