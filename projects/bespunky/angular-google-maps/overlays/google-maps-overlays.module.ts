import { NgModule, Optional, SkipSelf, ModuleWithProviders } from "@angular/core";
import { GoogleMapWithOverlaysModule } from './modules/map/google-map-with-overlays.module';
import { GoogleMapsMarkerModule      } from './modules/marker/google-maps-marker.module';
import { GoogleMapsPolygonModule     } from './modules/polygon/google-maps-polygon.module';
import { GoogleMapsDataModule        } from './modules/data/google-maps-data.module';
import { GoogleMapsFeatureModule     } from './modules/data/feature/google-maps-feature.module';

const modules = [
    GoogleMapWithOverlaysModule, // Given that GoogleMapsWithOverlaysModule is imported AFTER the GoogleMapsModule, this will override the default map provider
    GoogleMapsMarkerModule,
    GoogleMapsPolygonModule,
    GoogleMapsDataModule,
    GoogleMapsFeatureModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class GoogleMapsOverlaysModule
{
    constructor(@Optional() @SkipSelf() overlaysModule: GoogleMapsOverlaysModule)
    {
        if (overlaysModule)
            throw new Error('GoogleMapsOverlaysModule was previously loaded somewhere. Make sure there is only one place where you import it.');
    }

    // Not really needed. Only implemented the design pattern to remind the user to only import once.
    static forRoot(): ModuleWithProviders<GoogleMapsOverlaysModule>
    {
        return { ngModule : GoogleMapsOverlaysModule };
    }
}