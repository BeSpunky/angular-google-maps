import { NgModule, Optional, SkipSelf, ModuleWithProviders, NgZone } from '@angular/core';
import { ZenModule } from '@bespunky/angular-zen';

import { LazyGoogleMapsApiLoader } from './loaders/lazy-google-maps-api-loader';
import { GoogleMapsApiLoader } from './loaders/google-maps-api-loader';
import { GoogleMapsApiService } from './api/google-maps-api.service';
import { GoogleMapsConfig } from './google-maps-config';

@NgModule({
    declarations: [],
    imports: [ ZenModule ],
    providers: [
        GoogleMapsApiService,
        { provide: GoogleMapsApiLoader, useClass: LazyGoogleMapsApiLoader }
    ],
    exports: []
})
export class GoogleMapsModule
{
    constructor(@Optional() @SkipSelf() googleMapsModule: GoogleMapsModule, private zone: NgZone, private api: GoogleMapsApiService)
    {
        if (googleMapsModule)
            throw new Error('GoogleMapsModule was previously loaded somewhere. Make sure there is only place where you import it.');

        zone.runOutsideAngular(() =>
        {
            api.load().then(this.onApiLoaded)
                      .catch(this.onApiLoadError);
        });
    }

    static forRoot(config: GoogleMapsConfig): ModuleWithProviders
    {
        return {
            ngModule: GoogleMapsModule,
            providers: [
                { provide: GoogleMapsConfig, useValue: config }
            ]
        };
    }

    private onApiLoaded()
    {
        // TODO: Notify anyone??
    }

    private onApiLoadError(error: any)
    {
        // TODO: Notify anyone??

        console.log('[GoogleMapsModule] Google Maps API failed to load:', error);
    }
}
