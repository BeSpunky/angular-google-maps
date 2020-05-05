import { NgModule } from '@angular/core';

import { GoogleMapsMarkerModule      } from './modules/marker/google-maps-marker.module';
import { GoogleMapsPolygonModule     } from './modules/polygon/google-maps-polygon.module';
import { GoogleMapsDataModule        } from './modules/data/google-maps-data.module';
import { OverlaysSuperpowerProvider  } from './superpower/overlays-superpower.provider';

const modules = [
    GoogleMapsMarkerModule,
    GoogleMapsPolygonModule,
    GoogleMapsDataModule,
];

@NgModule({
    imports  : modules,
    exports  : modules,
    providers: [OverlaysSuperpowerProvider]
})
export class GoogleMapsOverlaysModule { }