import { NgModule } from '@angular/core';

import { GoogleMapsMarkerDirective       } from './directive/google-maps-marker.directive';

@NgModule({
    declarations: [GoogleMapsMarkerDirective],
    exports     : [GoogleMapsMarkerDirective]
})
export class GoogleMapsMarkerModule { }
