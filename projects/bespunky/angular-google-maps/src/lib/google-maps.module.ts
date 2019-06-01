import { NgModule, Optional, SkipSelf, ModuleWithProviders, NgZone } from '@angular/core';
import { ZenModule } from '@bespunky/angular-zen';

import { LazyGoogleMapsApiLoader } from './loaders/lazy-google-maps-api-loader';
import { GoogleMapsApiLoader } from './loaders/google-maps-api-loader';
import { GoogleMapsApiService } from './api/google-maps-api.service';
import { GoogleMapsConfig } from './config/google-maps-config';
import { GoogleMapComponent } from './google-map/google-map.component';

@NgModule({
    declarations: [GoogleMapComponent],
    imports:      [ZenModule],
    exports:      [GoogleMapComponent]
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
                GoogleMapsApiService,
                { provide: GoogleMapsApiLoader, useClass: LazyGoogleMapsApiLoader },
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
