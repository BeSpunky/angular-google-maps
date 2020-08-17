import { NgModule, ModuleWithProviders } from '@angular/core';
import { CoreModule, UniversalModule   } from '@bespunky/angular-zen';

import { _GoogleMapsModule, _InternalModule         } from '@bespunky/angular-google-maps/_internal';
import { _GoogleMapsCoreModule, GoogleMapsApiLoader } from '@bespunky/angular-google-maps/core';
import { LazyGoogleMapsApiLoader } from './services/lazy-google-maps-api-loader';
import { GoogleMapsConfig        } from './services/google-maps-config';
import { SafeDirective           } from './directives/safe.directive';

// Import and re-export the core google maps module so map component and other modules are accessible
@NgModule({
    declarations: [SafeDirective],
    imports     : [_GoogleMapsCoreModule, CoreModule, UniversalModule, _InternalModule],
    exports     : [SafeDirective, _GoogleMapsCoreModule]
})
export class GoogleMapsModule extends _GoogleMapsModule
{
    /**
     * Creates providers and configures the module before import.
     * 
     * When implementing your own api loader:
     * 1. Do not pass in the `config` param.
     * 2. Declare a provider for `GoogleMapsApiLoader` in your app.
     * 
     * @static
     * @param {GoogleMapsConfig} [config] Configure automatic loading of Google Maps API. When not provided, it is assumed that you will provide your 
     * own implementation for `GoogleMapsApiLoader`.
     */
    static forRoot(config?: GoogleMapsConfig): ModuleWithProviders<GoogleMapsModule>
    {
        // If no config was provided, it is assumed that the user will provide his own loader.
        return config ? {
            ngModule: GoogleMapsModule,
            providers: [
                { provide: GoogleMapsApiLoader, useClass: LazyGoogleMapsApiLoader },
                { provide: GoogleMapsConfig, useValue: config }
            ]
        } : { ngModule: GoogleMapsModule };
    }
}