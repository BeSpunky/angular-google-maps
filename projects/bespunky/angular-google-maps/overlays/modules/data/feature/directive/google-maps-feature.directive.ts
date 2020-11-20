import { Observable } from 'rxjs';
import { Directive, Output, Input } from '@angular/core';

import { GoogleMapsComponentBase, IGoogleMapsMouseEventsEmitter, IGoogleMapsEventData, Hook, Coord, CoordPath } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsFeature, FeatureProperties } from '../i-google-maps-feature';
import { GoogleMapsFeatureFactoryProvider      } from '../google-maps-feature-factory.provider';

/**
 * Adds a feature to the containing data layer.
 * 
 * Must be placed inside a `<bs-google-maps-data/>` element.
 *
 * @export
 * @class GoogleMapsFeatureDirective
 * @extends {GoogleMapsComponentBase<IGoogleMapsFeature>}
 * @implements {IGoogleMapsMouseEventsEmitter}
 */
@Directive({
    selector : 'bs-google-maps-feature, [bsGoogleMapsFeature]',
    exportAs : 'feature',
    providers: [GoogleMapsFeatureFactoryProvider]
})
export class GoogleMapsFeatureDirective extends GoogleMapsComponentBase<IGoogleMapsFeature> implements IGoogleMapsMouseEventsEmitter
{
    // The `geometry` property will delegate to the feature's geometry, but requires the user to have an instantiated
    // `Data.Geometry` object. The quick geometry properties on the other hand, will create and set the inner feature geometry
    // automatically. Only one property should be set at a time. Either `geometry` or one of the quick setters.
    // Using both, or more than one quick geometry setter at a time, could lead to inconsistancies.
    @Input() public geometry?: google.maps.Data.Geometry;
    @Input() public marker?  : Coord;
    @Input() public polygon? : CoordPath;
    
    @Input() public properties?: FeatureProperties;
    
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
        
    ngOnInit()
    {
        this.wrapper.data.addFeature(this.wrapper);
    }

    ngOnDestroy()
    {
        this.wrapper.data.removeFeature(this.wrapper);
    }

    protected initEmitters()
    {
        // Hook emitters to the data object's event, but filter out events not related with this specific feature
        this.api.hookAndSetEmitters(this,
                                    this.wrapper.data,
                                    (event: IGoogleMapsEventData) => event.nativeArgs.some(arg => arg.feature === this.wrapper.native));
    }
}
