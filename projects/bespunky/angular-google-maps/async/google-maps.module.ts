import 'reflect-metadata'; // Imported once here. No need to import in other places.

import { NgModule, ModuleWithProviders } from '@angular/core';

import { GoogleMapsModule as SyncGoogleMapsModule, GoogleMapsApiLoader } from '@bespunky/angular-google-maps/core';
import { LazyGoogleMapsApiLoader } from './services/lazy-google-maps-api-loader';
import { GoogleMapsConfig } from './services/google-maps-config';
import { SafeDirective } from './directives/safe.directive';

// Import and re-export the core google maps module so it does all the work
@NgModule({
    declarations: [SafeDirective],
    exports:      [SafeDirective, SyncGoogleMapsModule]
})
export class GoogleMapsModule extends SyncGoogleMapsModule
{
    static forRoot(config: GoogleMapsConfig): ModuleWithProviders<GoogleMapsModule>
    {
        return {
            ngModule: GoogleMapsModule,
            providers: [
                { provide: GoogleMapsApiLoader, useClass: LazyGoogleMapsApiLoader },
                { provide: GoogleMapsConfig, useValue: config }
            ]
        };
    }
}
