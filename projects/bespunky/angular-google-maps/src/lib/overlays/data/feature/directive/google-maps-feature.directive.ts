import { Directive, Input, EventEmitter, Output } from '@angular/core';
import { IGoogleMapsFeature } from '../i-google-maps-feature';
import { WrapperInput } from '../../../../core/decorators/wrapper-input.decorator';
import { GoogleMapsFeatureFactoryProvider } from '../google-maps-feature-factory.provider';
import { GoogleMapsLifecycleBase } from '../../../../core/abstraction/base/google-maps-lifecycle-base';
import { FeatureEventsMapProvider } from './feature-event.enum';

@Directive({
    selector: 'bs-google-maps-feature, [bsGoogleMapsFeature]',
    exportAs: 'feature',
    providers: [
        GoogleMapsFeatureFactoryProvider,
        FeatureEventsMapProvider
    ]
})
export class GoogleMapsFeatureDirective extends GoogleMapsLifecycleBase
{
    @WrapperInput() public feature?: IGoogleMapsFeature;
    @Input() public options?: google.maps.Data.FeatureOptions;

    @Output() public removeProperty                             = new EventEmitter();
    /** This event is fired when a feature's geometry is set. */
    @Output() public setGeometry                                = new EventEmitter();
    /** This event is fired when a feature's property is set. */
    @Output() public setProperty                                = new EventEmitter();
}
