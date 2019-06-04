import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { ZenModule } from '@bespunky/angular-zen';

import { LazyGoogleMapsApiLoader } from './core/loaders/lazy-google-maps-api-loader';
import { GoogleMapsApiLoader } from './core/loaders/google-maps-api-loader';
import { GoogleMapsApiService } from './core/api/google-maps-api.service';
import { GoogleMapsConfig } from './core/config/google-maps-config';
import { GoogleMapComponent } from './google-map/component/google-map.component';
import { GoogleMapMarkerDirective } from './google-map/overlays/marker/directive/google-map-marker.directive';
import { GoogleMapsInternalApiService } from './core/api/google-maps-internal-api.service';
import { GoogleMapsApiReadyPromiseProvider } from './core/api/google-maps-api-ready.token';

@NgModule({
    declarations: [GoogleMapComponent, GoogleMapMarkerDirective],
    imports:      [ZenModule],
    exports:      [GoogleMapComponent, GoogleMapMarkerDirective]
})
export class GoogleMapsModule
{
    constructor(@Optional() @SkipSelf() googleMapsModule: GoogleMapsModule, private api: GoogleMapsInternalApiService)
    {
        if (googleMapsModule)
            throw new Error('GoogleMapsModule was previously loaded somewhere. Make sure there is only place where you import it.');

        this.api.load().then(this.onApiLoaded)
                       .catch(this.onApiLoadError);
    }

    static forRoot(config: GoogleMapsConfig): ModuleWithProviders
    {
        return {
            ngModule: GoogleMapsModule,
            providers: [
                GoogleMapsApiService,
                GoogleMapsApiReadyPromiseProvider,
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
