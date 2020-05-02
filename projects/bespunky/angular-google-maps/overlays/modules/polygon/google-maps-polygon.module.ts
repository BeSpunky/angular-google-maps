import { NgModule } from '@angular/core';

import { GoogleMapsPolygonDirective       } from './directive/google-maps-polygon.directive';
import { GoogleMapsPolygonFactoryProvider } from './google-maps-polygon-factory.provider';

@NgModule({
    declarations: [GoogleMapsPolygonDirective],
    exports     : [GoogleMapsPolygonDirective],
    providers   : [GoogleMapsPolygonFactoryProvider]
})
export class GoogleMapsPolygonModule { }
