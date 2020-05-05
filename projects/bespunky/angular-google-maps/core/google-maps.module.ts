import 'reflect-metadata'; // Imported once here. No need to import in other places.

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CoreModule                    } from '@bespunky/angular-zen/core';
import { UniversalModule               } from '@bespunky/angular-zen/universal';

import { _GoogleMapsModule, _InternalModule, GoogleMapsApiLoader } from '@bespunky/angular-google-maps/_internal';
import { NoOpGoogleMapsApiLoader                                 } from './api/loader/no-op-google-maps-api-loader';
import { GoogleMapModule                                         } from './modules/map/google-map.module';

@NgModule({
    imports     : [GoogleMapModule, CoreModule, UniversalModule, _InternalModule],
    exports     : [GoogleMapModule]
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
