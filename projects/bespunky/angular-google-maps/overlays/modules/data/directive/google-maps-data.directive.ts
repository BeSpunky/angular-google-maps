import { Observable } from 'rxjs';
import { Directive, Output, Input } from '@angular/core';

import { Hook, IGoogleMapsEventData                                         } from '@bespunky/angular-google-maps/core';
import { GoogleMapsOverlayComponentBase                                     } from '../../../abstraction/base/google-maps-overlay-component-base';
import { GoogleMapsDataFactoryProvider, NativeGoogleMapsDataFactoryProvider } from '../google-maps-data-factory.provider';
import { IGoogleMapsData                                                    } from '../i-google-maps-data';

/**
 * Adds a data layer to the containing map.
 * 
 * Must be placed inside a `<bs-google-map/>` element.
 *
 * @export
 * @class GoogleMapsDataDirective
 * @extends {GoogleMapsOverlayComponentBase<IGoogleMapsData>}
 */
@Directive({
    selector : 'bs-google-maps-data, [bsGoogleMapsData]',
    exportAs : 'dataLayer',
    providers: [GoogleMapsDataFactoryProvider, NativeGoogleMapsDataFactoryProvider]
})
export class GoogleMapsDataDirective extends GoogleMapsOverlayComponentBase<IGoogleMapsData>
{
    @Input() public controlPosition?: google.maps.ControlPosition;
    @Input() public controls?       : string[];
    @Input() public drawingMode?    : string;
    @Input() public style?          : google.maps.Data.StylingFunction | google.maps.Data.StyleOptions;

    /** Fired when a feature is added to the collection. */
    @Hook('addfeature')     @Output() public addFeature          : Observable<IGoogleMapsEventData>;
    /** Fired for a click on the geometry. */
    @Hook('click')          @Output() public click               : Observable<IGoogleMapsEventData>;
    /** Fired for a double click on the geometry. */
    @Hook('dblclick')       @Output() public doubleClick         : Observable<IGoogleMapsEventData>;
    /** Fired for a mousedown on the geometry. */
    @Hook('mousedown')      @Output() public mouseDown           : Observable<IGoogleMapsEventData>;
    /** Fired when the mouse leaves the area of the geometry. */
    @Hook('mouseout')       @Output() public mouseOut            : Observable<IGoogleMapsEventData>;
    /** Fired when the mouse enters the area of the geometry. */
    @Hook('mouseover')      @Output() public mouseOver           : Observable<IGoogleMapsEventData>;
    /** Fired for a mouseup on the geometry. */
    @Hook('mouseup')        @Output() public mouseUp             : Observable<IGoogleMapsEventData>;
    /** Fired when a feature is removed from the collection. */
    @Hook('removefeature')  @Output() public removeFeature       : Observable<IGoogleMapsEventData>;
    /** Fired when a feature's property is removed. */
    @Hook('removeproperty') @Output() public removeProperty      : Observable<IGoogleMapsEventData>;
    /** Fired for a rightclick on the geometry. */
    @Hook('rightclick')     @Output() public rightClick          : Observable<IGoogleMapsEventData>;
    /** Fired when a feature's geometry is set. */
    @Hook('setgeometry')    @Output() public setGeometry         : Observable<IGoogleMapsEventData>;
    /** Fired when a feature's property is set. */
    @Hook('setproperty')    @Output() public setProperty         : Observable<IGoogleMapsEventData>;
}