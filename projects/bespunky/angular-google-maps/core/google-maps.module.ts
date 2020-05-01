import 'reflect-metadata'; // Imported once here. No need to import in other places.

import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { UniversalModule } from '@bespunky/angular-zen/universal';
import { AsyncModule } from '@bespunky/angular-zen/async';

import { LazyGoogleMapsApiLoader } from './core/loaders/lazy-google-maps-api-loader';
import { GoogleMapsApiLoader } from './core/loaders/google-maps-api-loader';
import { GoogleMapsApiService } from './core/api/google-maps-api.service';
import { GoogleMapsConfig } from './core/config/google-maps-config';
import { GoogleMapComponent } from './google-map/component/google-map.component';
import { GoogleMapsMarkerDirective } from './overlays/marker/directive/google-maps-marker.directive';
import { GoogleMapsInternalApiService } from './core/api/google-maps-internal-api.service';
import { GoogleMapsApiReadyPromiseProvider } from './core/api/google-maps-api-ready.token';
import { GoogleMapsDataDirective } from './overlays/data/directive/google-maps-data.directive';
import { GoogleMapsFeatureDirective } from './overlays/data/feature/directive/google-maps-feature.directive';
import { SafeDirective } from './core/api/safe.directive';
import { GoogleMapsPolygonDirective } from './overlays/polygon/directive/google-maps-polygon.directive';
import { NoOpGoogleMapsApiLoader } from '../../../../dist/bespunky/angular-google-maps/public-api';

@NgModule({
    declarations: [GoogleMapComponent],
    imports:      [CoreModule, UniversalModule],
    exports:      [GoogleMapComponent],
    providers: [
        GoogleMapsApiService,
        GoogleMapsApiReadyPromiseProvider
    ]
})
export class GoogleMapsModule
{
    constructor(@Optional() @SkipSelf() googleMapsModule: GoogleMapsModule, private api: GoogleMapsInternalApiService)
    {
        if (googleMapsModule)
            throw new Error('GoogleMapsModule was previously loaded somewhere. Make sure there is only one place where you import it.');

        this.api.load().then(this.onApiLoaded)
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
