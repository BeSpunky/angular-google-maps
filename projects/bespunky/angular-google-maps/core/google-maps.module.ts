import 'reflect-metadata'; // Imported once here. No need to import in other places.

import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CoreModule      } from '@bespunky/angular-zen/core';
import { UniversalModule } from '@bespunky/angular-zen/universal';

import { GoogleMapsApiLoader               } from './api/loader/google-maps-api-loader';
import { NoOpGoogleMapsApiLoader           } from './api/loader/no-op-google-maps-api-loader';
import { GoogleMapsApiReadyPromiseProvider } from './api/loader/google-maps-api-ready.token';
import { GoogleMapsInternalApiService      } from './api/google-maps-internal-api.service';
import { GoogleMapModule                   } from './modules/map/google-map.module';

@NgModule({
    imports     : [GoogleMapModule, CoreModule, UniversalModule],
    exports     : [GoogleMapModule],
    providers   : [GoogleMapsApiReadyPromiseProvider]
})
export class GoogleMapsModule
{
    constructor(@Optional() @SkipSelf() googleMapsModule: GoogleMapsModule, private api: GoogleMapsInternalApiService)
    {
        if (googleMapsModule)
            throw new Error('GoogleMapsModule was previously loaded somewhere. Make sure there is only one place where you import it.');

        this.api.load().then (this.onApiLoaded)
                       .catch(this.onApiLoadError);
    }

    // This is overriden by the async GoogleMapsModule to provide a different loader
    static forRoot(): ModuleWithProviders<GoogleMapsModule>
    {
        return {
            ngModule: GoogleMapsModule,
            providers: [
                { provide: GoogleMapsApiLoader, useClass: NoOpGoogleMapsApiLoader }
            ]
        };
    }

    protected onApiLoaded()
    {
        // TODO: Notify anyone??
    }

    protected onApiLoadError(error: any)
    {
        // TODO: Notify anyone??

        console.log('[GoogleMapsModule] Google Maps API failed to load:', error);
    }
}
