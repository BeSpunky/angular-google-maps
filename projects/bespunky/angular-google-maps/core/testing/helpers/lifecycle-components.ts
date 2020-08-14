/**
 * Provides utils for testing components and directives deriving from `GoogleMapsComponentBase`, for example `GoogleMapComponent`, `GoogleMapsMarkerDirective`, etc.
 */
import { ViewChild, Directive } from '@angular/core';

import { GoogleMapsComponentBase, EmittingWrapper, GoogleMap, GoogleMapComponent } from '@bespunky/angular-google-maps/core';

export function createLifecycleTestingHostComponentTemplate(testedComponentTemplate: string, mapDirectives: string = ''): string
{
    return `<bs-google-map ${mapDirectives} [center]="center">${testedComponentTemplate}</bs-google-map>`;
}

/**
 * Provides the bases for a test host component that defines a map with an inner component.
 * Use together with `createLifecycleTestingHostComponentTemplate()` to create the template when implementing this class.
 * The tested component/directive should be marked with `#testedComponent` for it to be accessible when testing.
 * 
 * @example Testing the `GoogleMapsDataDirective`
 * 
 * ```
 *     @Component({
 *         template: createLifecycleTestingHostComponentTemplate('<bs-google-maps-data #testedComponent></bs-google-maps-data>')
 *     })
 *     class TestHostComponent extends LifecycleComponentTestHost { } 
 * ```
 * 
 * @class LifecycleComponentTestHost
 */
@Directive()
export class LifecycleComponentTestHost
{
    @ViewChild(GoogleMapComponent)
    public mapComponent: GoogleMapComponent;
    @ViewChild('testedComponent')
    public testedComponent: GoogleMapsComponentBase<EmittingWrapper>;

    public map: GoogleMap;
}