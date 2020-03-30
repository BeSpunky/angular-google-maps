import { Observable } from 'rxjs';
import { Directive, Input, Output } from '@angular/core';

import { IGoogleMapsFeature } from '../i-google-maps-feature';
import { Wrapper } from '../../../../core/decorators/wrapper.decorator';
import { GoogleMapsFeatureFactoryProvider } from '../google-maps-feature-factory.provider';
import { GoogleMapsLifecycleBase } from '../../../../core/abstraction/base/google-maps-lifecycle-base';
import { GoogleMapsEventData } from '../../../../core/abstraction/events/google-maps-event-data';

@Directive({
    selector: 'bs-google-maps-feature, [bsGoogleMapsFeature]',
    exportAs: 'feature',
    providers: [
        GoogleMapsFeatureFactoryProvider
        // No need to provide events. EventsMap provider will be found in the parent data directive scope
    ]
})
export class GoogleMapsFeatureDirective extends GoogleMapsLifecycleBase
{
    @Wrapper @Input() public feature?: IGoogleMapsFeature;
    @Input() public options?: google.maps.Data.FeatureOptions;

    /** Fired when a feature is added to the collection. */
    @Output() public addFeature                                 : Observable<GoogleMapsEventData>;
    /** Fired for a click on the geometry. */
    @Output() public click                                      : Observable<GoogleMapsEventData>;
    /** Fired for a double click on the geometry. */
    @Output() public doubleClick                                : Observable<GoogleMapsEventData>;
    /** Fired for a mousedown on the geometry. */
    @Output() public mouseDown                                  : Observable<GoogleMapsEventData>;
    /** Fired when the mouse leaves the area of the geometry. */
    @Output() public mouseOut                                   : Observable<GoogleMapsEventData>;
    /** Fired when the mouse enters the area of the geometry. */
    @Output() public mouseOver                                  : Observable<GoogleMapsEventData>;
    /** Fired for a mouseup on the geometry. */
    @Output() public mouseUp                                    : Observable<GoogleMapsEventData>;
    /** Fired when a feature is removed from the collection. */
    @Output() public removeFeature                              : Observable<GoogleMapsEventData>;
    /** Fired when a feature's property is removed. */
    @Output() public removeProperty                             : Observable<GoogleMapsEventData>;
    /** Fired for a rightclick on the geometry. */
    @Output() public rightClick                                 : Observable<GoogleMapsEventData>;
    /** Fired when a feature's geometry is set. */
    @Output() public setGeometry                                : Observable<GoogleMapsEventData>;
    /** Fired when a feature's property is set. */
    @Output() public setProperty                                : Observable<GoogleMapsEventData>;
    
    ngOnInit()
    {
        super.ngOnInit();

        this.feature.data.addFeature(this.feature);
    }

    ngOnDestroy()
    {
        this.feature.data.removeFeature(this.feature);
    }

    protected initEmitters()
    {
        // Hook emitters to the data object's event, but filter out events not related with this specific feature
        this.api.hookAndSetEmitters(this,
                                    this.eventsMap,
                                    this.feature.data,
                                    (event: GoogleMapsEventData) => this.feature.native.then(native => event.nativeArgs.some(arg => arg.feature === native)));
    }
}
