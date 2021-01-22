import { NgModule } from '@angular/core';

import { GoogleMapsPolylineDirective       } from './directive/google-maps-polyline.directive';

@NgModule({
    declarations: [GoogleMapsPolylineDirective],
    exports     : [GoogleMapsPolylineDirective]
})
export class GoogleMapsPolylineModule { }
