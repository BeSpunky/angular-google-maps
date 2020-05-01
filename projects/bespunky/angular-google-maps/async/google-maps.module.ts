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
import { GoogleMapsModule as SyncGoogleMapsModule } from '@bespunky/angular-google-maps/core';

// Import and re-export the core google maps module so it does all the work
@NgModule({
    declarations: [SafeDirective],
    exports:      [SafeDirective, SyncGoogleMapsModule]
})
export class GoogleMapsModule extends SyncGoogleMapsModule
{
    static forRoot(config: GoogleMapsConfig): ModuleWithProviders<GoogleMapsModule>
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
}
