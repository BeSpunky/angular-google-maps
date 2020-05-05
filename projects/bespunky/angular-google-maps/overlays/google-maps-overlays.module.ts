import { NgModule } from '@angular/core';

import { GoogleMapWithOverlaysModule } from './modules/map/google-map-with-overlays.module';
import { GoogleMapsMarkerModule      } from './modules/marker/google-maps-marker.module';
import { GoogleMapsPolygonModule     } from './modules/polygon/google-maps-polygon.module';
import { GoogleMapsDataModule        } from './modules/data/google-maps-data.module';

const modules = [
    GoogleMapWithOverlaysModule, // Given that GoogleMapsWithOverlaysModule is imported AFTER the GoogleMapsModule, this will override the default map provider
    GoogleMapsMarkerModule,
    GoogleMapsPolygonModule,
    GoogleMapsDataModule,
];

@NgModule({
    imports: modules,
    exports: modules
})
export class GoogleMapsOverlaysModule { }