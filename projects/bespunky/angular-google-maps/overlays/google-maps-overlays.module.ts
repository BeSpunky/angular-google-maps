import { NgModule, Optional, SkipSelf, ModuleWithProviders } from "@angular/core";
import { GoogleMapsMarkerDirective            } from './modules/marker/directive/google-maps-marker.directive';
import { GoogleMapsPolygonDirective           } from './modules/polygon/directive/google-maps-polygon.directive';
import { GoogleMapsDataDirective              } from './modules/data/directive/google-maps-data.directive';
import { GoogleMapsFeatureDirective           } from './modules/data/feature/directive/google-maps-feature.directive';
import { GoogleMapWithOverlaysFactoryProvider } from './modules/google-map/google-map-with-overlays-factory.provider';
import { GoogleMapsMarkerFactoryProvider      } from './modules/marker/google-maps-marker-factory.provider';
import { GoogleMapsPolygonFactoryProvider     } from './modules/polygon/google-maps-polygon-factory.provider';
import { GoogleMapsDataFactoryProvider        } from './modules/data/google-maps-data-factory.provider';
import { GoogleMapsFeatureFactoryProvider     } from './modules/data/feature/google-maps-feature-factory.provider';

const components = [
    GoogleMapsMarkerDirective,
    GoogleMapsPolygonDirective,
    GoogleMapsDataDirective,
    GoogleMapsFeatureDirective
];

@NgModule({
    declarations: components,
    exports     : components
})
export class GoogleMapsOverlaysModule
{
    constructor(@Optional() @SkipSelf() overlaysModule: GoogleMapsOverlaysModule)
    {
        if (overlaysModule)
            throw new Error('GoogleMapsOverlaysModule was previously loaded somewhere. Make sure there is only one place where you import it.');
    }

    static forRoot(): ModuleWithProviders<GoogleMapsOverlaysModule>
    {
        return {
            ngModule : GoogleMapsOverlaysModule,
            providers: [
                GoogleMapWithOverlaysFactoryProvider, // Given that GoogleMapsOverlaysModule is imported AFTER GoogleMapsModule, this will override the map provider from the core package
                GoogleMapsMarkerFactoryProvider,
                GoogleMapsPolygonFactoryProvider,
                GoogleMapsDataFactoryProvider,
                GoogleMapsFeatureFactoryProvider
            ]
        };
    }}