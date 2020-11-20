/**
 * Provides utils for testing components and directives deriving from `GoogleMapsComponentBase`, for example `GoogleMapComponent`, `GoogleMapsMarkerDirective`, etc.
 */
import { ViewChild, Directive } from '@angular/core';

import { GoogleMapsComponentBase, EmittingWrapper, GoogleMap, GoogleMapComponent } from '@bespunky/angular-google-maps/core';

/**
 * Wraps the template of a tested component with a map element template.
 *
 * @export
 * @param {string} testedComponentTemplate The template to include inside of the map element.
 * @param {string} [mapDirectives=''] (Optional) Any directives or attributes to add to the map element.
 * @returns {string} A string containing the component template wrapped inside a map tempalte.
 */
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