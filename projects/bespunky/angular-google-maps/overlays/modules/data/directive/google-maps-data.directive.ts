import { Observable } from 'rxjs';
import { Directive, Output, Input } from '@angular/core';

import { Hook, GoogleMapsEventData      } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlayLifecycleBase } from '../../../abstraction/base/google-maps-overlay-lifecycle-base';
import { IGoogleMapsData                } from '../i-google-maps-data';

@Directive({
    selector: 'bs-google-maps-data, [bsGoogleMapsData]',
    exportAs: 'dataLayer'
})
export class GoogleMapsDataDirective extends GoogleMapsOverlayLifecycleBase<IGoogleMapsData>
{
    @Input() public controlPosition?: google.maps.ControlPosition;
    @Input() public controls?       : string[];
    @Input() public drawingMode?    : string;
    @Input() public style?          : google.maps.Data.StylingFunction | google.maps.Data.StyleOptions;

    /** Fired when a feature is added to the collection. */
    @Hook('addfeature')     @Output() public addFeature          : Observable<GoogleMapsEventData>;
    /** Fired for a click on the geometry. */
    @Hook('click')          @Output() public click               : Observable<GoogleMapsEventData>;
    /** Fired for a double click on the geometry. */
    @Hook('dblclick')       @Output() public doubleClick         : Observable<GoogleMapsEventData>;
    /** Fired for a mousedown on the geometry. */
    @Hook('mousedown')      @Output() public mouseDown           : Observable<GoogleMapsEventData>;
    /** Fired when the mouse leaves the area of the geometry. */
    @Hook('mouseout')       @Output() public mouseOut            : Observable<GoogleMapsEventData>;
    /** Fired when the mouse enters the area of the geometry. */
    @Hook('mouseover')      @Output() public mouseOver           : Observable<GoogleMapsEventData>;
    /** Fired for a mouseup on the geometry. */
    @Hook('mouseup')        @Output() public mouseUp             : Observable<GoogleMapsEventData>;
    /** Fired when a feature is removed from the collection. */
    @Hook('removefeature')  @Output() public removeFeature       : Observable<GoogleMapsEventData>;
    /** Fired when a feature's property is removed. */
    @Hook('removeproperty') @Output() public removeProperty      : Observable<GoogleMapsEventData>;
    /** Fired for a rightclick on the geometry. */
    @Hook('rightclick')     @Output() public rightClick          : Observable<GoogleMapsEventData>;
    /** Fired when a feature's geometry is set. */
    @Hook('setgeometry')    @Output() public setGeometry         : Observable<GoogleMapsEventData>;
    /** Fired when a feature's property is set. */
    @Hook('setproperty')    @Output() public setProperty         : Observable<GoogleMapsEventData>;
}