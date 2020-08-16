import 'reflect-metadata'; // Imported once here. No need to import in other places.

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CoreModule                    } from '@bespunky/angular-zen/core';
import { UniversalModule               } from '@bespunky/angular-zen/universal';

import { _GoogleMapsModule, _InternalModule, GoogleMapsApiLoader } from '@bespunky/angular-google-maps/_internal';
import { NoOpGoogleMapsApiLoader                                 } from './api/loader/no-op-google-maps-api-loader';
import { GoogleMapModule                                         } from './modules/map/google-map.module';

/**
 * INTERNAL. NOT FOR DIRECT USE. IMPORT `GoogleMapsModule` FROM `@bespunky/angular-google-maps/core` OR `@bespunky/angular-google-maps/async` INSTEAD.
 * 
 * A shared module between the sync and async versions of the GoogleMapsModule. providing and enabling all basic and core functionality. */
@NgModule({
    imports: [GoogleMapModule, CoreModule, UniversalModule, _InternalModule],
    exports: [GoogleMapModule]
})
export class _GoogleMapsCoreModule { }

@NgModule({
    imports     : [_GoogleMapsCoreModule],
    exports     : [_GoogleMapsCoreModule]
})
export class GoogleMapsModule extends _GoogleMapsModule
{
    static forRoot(): ModuleWithProviders<GoogleMapsModule>
    {
        return {
            ngModule: GoogleMapsModule,
            providers: [
                { provide: GoogleMapsApiLoader, useClass: NoOpGoogleMapsApiLoader }
            ]
        };
    }
}
