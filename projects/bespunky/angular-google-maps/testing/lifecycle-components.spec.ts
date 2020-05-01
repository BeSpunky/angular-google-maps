/**
 * Provides utils for testing components and directives deriving from `GoogleMapsLifecycleBase`, for example `GoogleMapComponent`, `GoogleMapsMarkerDirective`, etc.
 */

import { ViewChild } from '@angular/core';
import { GoogleMapsLifecycleBase } from '../core/abstraction/base/google-maps-lifecycle-base';
import { GoogleMapComponent } from '../src/lib/google-map/component/google-map.component';
import { GoogleMap } from '../src/lib/google-map/google-map';
import { EmittingWrapper } from '../core/abstraction/types/abstraction';

export function createLifecycleTestingHostComponentTemplate(testedComponentTemplate: string): string
{
    return `<bs-google-map [center]="center">${testedComponentTemplate}</bs-google-map>`;
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
export class LifecycleComponentTestHost
{
    @ViewChild(GoogleMapComponent)
    public mapComponent: GoogleMapComponent;
    @ViewChild('testedComponent')
    public testedComponent: GoogleMapsLifecycleBase<EmittingWrapper>;

    public map: GoogleMap;
}