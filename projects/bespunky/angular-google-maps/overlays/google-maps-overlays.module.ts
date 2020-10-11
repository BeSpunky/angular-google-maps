import { NgModule } from '@angular/core';

import { OverlaysSuperpowerModule   } from './superpower/overlays-superpower.module';
import { GoogleMapsMarkerModule     } from './modules/marker/google-maps-marker.module';
import { GoogleMapsPolygonModule    } from './modules/polygon/google-maps-polygon.module';
import { GoogleMapsCircleModule     } from './modules/circle/google-maps-circle.module';
import { GoogleMapsDataModule       } from './modules/data/google-maps-data.module';
import { GoogleMapsInfoWindowModule } from './modules/info-window/google-maps-info-window.module';

const modules = [
    OverlaysSuperpowerModule,
    GoogleMapsMarkerModule,
    GoogleMapsPolygonModule,
    GoogleMapsCircleModule,
    GoogleMapsDataModule,
    GoogleMapsInfoWindowModule,
];

@NgModule({
    imports  : modules,
    exports  : modules
})
export class GoogleMapsOverlaysModule { }