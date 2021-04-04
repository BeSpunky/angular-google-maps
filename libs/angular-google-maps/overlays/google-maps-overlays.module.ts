import { NgModule } from '@angular/core';

import { OverlaysSuperpowerModule   } from './superpower/overlays-superpower.module';
import { GoogleMapsMarkerModule     } from './modules/marker/google-maps-marker.module';
import { GoogleMapsPolygonModule    } from './modules/polygon/google-maps-polygon.module';
import { GoogleMapsPolylineModule   } from './modules/polyline/google-maps-polyline.module';
import { GoogleMapsCircleModule     } from './modules/circle/google-maps-circle.module';
import { GoogleMapsDataModule       } from './modules/data/google-maps-data.module';
import { GoogleMapsInfoWindowModule } from './modules/info-window/google-maps-info-window.module';

/** @ignore */
const modules = [
    OverlaysSuperpowerModule,
    GoogleMapsMarkerModule,
    GoogleMapsPolygonModule,
    GoogleMapsPolylineModule,
    GoogleMapsCircleModule,
    GoogleMapsDataModule,
    GoogleMapsInfoWindowModule,
];

/**
 * Enhances the maps module with overlay capabilities.
 *
 * @export
 * @class GoogleMapsOverlaysModule
 */
@NgModule({
    imports  : modules,
    exports  : modules
})
export class GoogleMapsOverlaysModule { }