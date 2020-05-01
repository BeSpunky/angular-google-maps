import { NgModule } from '@angular/core';

import { GoogleMapsMarkerDirective       } from './directive/google-maps-marker.directive';
import { GoogleMapsMarkerFactoryProvider } from './google-maps-marker-factory.provider';

@NgModule({
    declarations: [GoogleMapsMarkerDirective],
    exports     : [GoogleMapsMarkerDirective],
    providers   : [GoogleMapsMarkerFactoryProvider]
})
export class GoogleMapsMarkerModule { }
