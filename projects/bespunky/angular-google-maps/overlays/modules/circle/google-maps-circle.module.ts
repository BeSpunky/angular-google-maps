import { NgModule } from '@angular/core';

import { GoogleMapsCircleDirective } from './directive/google-maps-circle.directive';

@NgModule({
    declarations: [GoogleMapsCircleDirective],
    exports     : [GoogleMapsCircleDirective]
})
export class GoogleMapsCircleModule { }
