import { NgModule } from '@angular/core';

import { GoogleMapsPolygonDirective       } from './directive/google-maps-polygon.directive';

@NgModule({
    declarations: [GoogleMapsPolygonDirective],
    exports     : [GoogleMapsPolygonDirective]
})
export class GoogleMapsPolygonModule { }
