import 'reflect-metadata'; // Imported once here. No need to import in other places.

import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { ZenModule, UniversalModule } from '@bespunky/angular-zen';

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

export const exported = [
    GoogleMapComponent,
    GoogleMapsMarkerDirective,
    GoogleMapsDataDirective,
    GoogleMapsFeatureDirective,
    GoogleMapsPolygonDirective,
    SafeDirective
];

@NgModule({
    declarations: exported,
    imports:      [ZenModule, UniversalModule.forRoot()],
    exports:      exported
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
