import { NgModule } from '@angular/core';
import { GoogleMapsDirectionsDirective } from './directives/google-maps-directions.directive';

/** @ignore */
const modules = [
];

/**
 * Enhances the maps module with directions capabilities.
 *
 * @export
 * @class GoogleMapsDirectionsModule
 */
@NgModule({
    imports  : modules,
    exports  : modules,
    declarations: [GoogleMapsDirectionsDirective]
})
export class GoogleMapsDirectionsModule { }