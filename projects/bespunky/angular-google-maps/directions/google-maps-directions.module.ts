import { ModuleWithProviders, NgModule } from '@angular/core';

import { GoogleMapsDirectionsDirective } from './directives/google-maps-directions.directive';
import { NativeGoogleMapsDirectionsServiceProvider } from './services/google-maps-directions-service-factory.provider';

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
export class GoogleMapsDirectionsModule
{
    static forRoot(): ModuleWithProviders<GoogleMapsDirectionsModule>
    {
        return {
            ngModule : GoogleMapsDirectionsModule,
            providers: [NativeGoogleMapsDirectionsServiceProvider]
        };
    }
}