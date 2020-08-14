import { NgModule, ModuleWithProviders } from '@angular/core';
import { CoreModule, UniversalModule   } from '@bespunky/angular-zen';

import { _GoogleMapsModule, _InternalModule                            } from '@bespunky/angular-google-maps/_internal';
import { GoogleMapsModule as GoogleMapsSyncModule, GoogleMapsApiLoader } from '@bespunky/angular-google-maps/core';
import { LazyGoogleMapsApiLoader } from './services/lazy-google-maps-api-loader';
import { GoogleMapsConfig        } from './services/google-maps-config';
import { SafeDirective           } from './directives/safe.directive';

// Import and re-export the core google maps module so map component and other modules are accessible
@NgModule({
    declarations: [SafeDirective],
    imports     : [GoogleMapsSyncModule.forRoot(), CoreModule, UniversalModule, _InternalModule],
    exports     : [SafeDirective, GoogleMapsSyncModule]
})
export class GoogleMapsModule extends _GoogleMapsModule
{
    static forRoot(config: GoogleMapsConfig): ModuleWithProviders<GoogleMapsModule>
    {
        return {
            ngModule: GoogleMapsSyncModule,
            providers: [
                { provide: GoogleMapsApiLoader, useClass: LazyGoogleMapsApiLoader },
                { provide: GoogleMapsConfig, useValue: config }
            ]
        };
    }
}
