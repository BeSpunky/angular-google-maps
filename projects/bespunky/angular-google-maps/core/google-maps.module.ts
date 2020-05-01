import 'reflect-metadata'; // Imported once here. No need to import in other places.

import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CoreModule      } from '@bespunky/angular-zen/core';
import { UniversalModule } from '@bespunky/angular-zen/universal';

import { GoogleMapsApiLoader               } from './api/loader/google-maps-api-loader';
import { NoOpGoogleMapsApiLoader           } from './api/loader/no-op-google-maps-api-loader';
import { GoogleMapsApiReadyPromiseProvider } from './api/loader/google-maps-api-ready.token';
import { GoogleMapsInternalApiService      } from './api/google-maps-internal-api.service';
import { GoogleMapFactoryProvider          } from './modules/google-map/google-map-factory.provider';
import { GoogleMapComponent                } from './modules/google-map/component/google-map.component';

@NgModule({
    declarations: [GoogleMapComponent],
    imports     : [CoreModule, UniversalModule],
    exports     : [GoogleMapComponent],
    providers   : [GoogleMapsApiReadyPromiseProvider, GoogleMapFactoryProvider]
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
