import 'reflect-metadata'; // Imported once here. No need to import in other places.

import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CoreModule                                        } from '@bespunky/angular-zen/core';
import { UniversalModule                                   } from '@bespunky/angular-zen/universal';

import { _InternalModule, GoogleMapsInternalApiService, GoogleMapsApiLoader } from '@bespunky/angular-google-maps/_internal';
import { NoOpGoogleMapsApiLoader                                            } from './api/loader/no-op-google-maps-api-loader';
import { GoogleMapModule                                                    } from './modules/map/google-map.module';

@NgModule({
    imports     : [GoogleMapModule, CoreModule, UniversalModule, _InternalModule],
    exports     : [GoogleMapModule]
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
