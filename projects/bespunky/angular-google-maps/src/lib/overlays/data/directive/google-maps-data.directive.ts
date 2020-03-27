import { Directive, Input, EventEmitter, Output } from '@angular/core';

import { GoogleMapsLifecycleBase } from '../../../core/abstraction/base/google-maps-lifecycle-base';
import { IGoogleMapsData } from '../i-google-maps-data';
import { DataEventsMapProvider } from '../types/data-event.enum';
import { GoogleMapsDataFactoryProvider } from '../google-maps-data-factory.provider';
import { WrapperInput } from '../../../core/decorators/wrapper-input.decorator';

@Directive({
    selector: 'bs-google-maps-data, [bsGoogleMapsData]',
    exportAs: 'dataLayer',
    providers: [
        GoogleMapsDataFactoryProvider,
        DataEventsMapProvider
    ]
})
export class GoogleMapsDataDirective extends GoogleMapsLifecycleBase
{
    @WrapperInput() public dataLayer?: IGoogleMapsData;
    @Input() public options?: google.maps.Data.DataOptions;

    /** This event is fired when a feature is added to the collection. */
    @Output() public addFeature                                 = new EventEmitter();
    /** This event is fired for a click on the geometry. */
    @Output() public click                                      = new EventEmitter();
    /** This event is fired for a double click on the geometry. */
    @Output() public doubleClick                                = new EventEmitter();
    /** This event is fired for a mousedown on the geometry. */
    @Output() public mouseDown                                  = new EventEmitter();
    /** This event is fired when the mouse leaves the area of the geometry. */
    @Output() public mouseOut                                   = new EventEmitter();
    /** This event is fired when the mouse enters the area of the geometry. */
    @Output() public mouseOver                                  = new EventEmitter();
    /** This event is fired for a mouseup on the geometry. */
    @Output() public mouseUp                                    = new EventEmitter();
    /** This event is fired when a feature is removed from the collection. */
    @Output() public removeFeature                              = new EventEmitter();
    /** This event is fired when a feature's property is removed. */
    @Output() public removeProperty                             = new EventEmitter();
    /** This event is fired for a rightclick on the geometry. */
    @Output() public rightClick                                 = new EventEmitter();
    /** This event is fired when a feature's geometry is set. */
    @Output() public setGeometry                                = new EventEmitter();
    /** This event is fired when a feature's property is set. */
    @Output() public setProperty                                = new EventEmitter();
}
