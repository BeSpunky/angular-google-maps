import { Directive, Input, EventEmitter, Output } from '@angular/core';
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
    
    ngOnInit()
    {
        super.ngOnInit();

        this.feature.data.addFeature(this.feature);

        this.feature.native.then(native =>
        {
            // Hook emitters to the data object's event, but filter out events not related with this specific feature
            this.api.hookEmitters(this,
                                  this.eventsMap,
                                  this.feature.data,
                                  (event: GoogleMapsEventData) => event.nativeArgs.some(arg => arg.feature === native));
        });
    }

    ngOnDestroy()
    {
        this.feature.data.removeFeature(this.feature);

        // TODO: Unhook events. Will doing so right now unhook events registered by data directives? maybe a separate unhook method is needed for delegated events.

        super.ngOnDestroy();
    }
}
