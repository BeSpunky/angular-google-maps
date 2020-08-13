import { NgModule } from '@angular/core';

import { OverlaysSuperpowerModule } from './superpower/overlays-superpower.module';
import { GoogleMapsMarkerModule   } from './modules/marker/google-maps-marker.module';
import { GoogleMapsPolygonModule  } from './modules/polygon/google-maps-polygon.module';
import { GoogleMapsDataModule     } from './modules/data/google-maps-data.module';

const modules = [
    OverlaysSuperpowerModule,
    GoogleMapsMarkerModule,
    GoogleMapsPolygonModule,
    GoogleMapsDataModule,
];

@NgModule({
    imports  : modules,
    exports  : modules
})
export class GoogleMapsOverlaysModule { }