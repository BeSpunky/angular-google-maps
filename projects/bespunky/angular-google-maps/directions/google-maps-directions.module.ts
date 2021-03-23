import { NgModule } from '@angular/core';

import { GoogleMapsDirectionsDirective } from './directives/google-maps-directions.directive';

/**
 * Enhances the maps module with directions capabilities.
 *
 * @export
 * @class GoogleMapsDirectionsModule
 */
@NgModule({
    declarations: [GoogleMapsDirectionsDirective],
    exports     : [GoogleMapsDirectionsDirective]
})
export class GoogleMapsDirectionsModule { }