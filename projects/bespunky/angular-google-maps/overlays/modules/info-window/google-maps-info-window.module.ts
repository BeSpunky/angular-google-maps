import { NgModule } from '@angular/core';

import { GoogleMapsInfoWindowDirective       } from './directive/google-maps-info-window.directive';

@NgModule({
    declarations: [GoogleMapsInfoWindowDirective],
    exports     : [GoogleMapsInfoWindowDirective]
})
export class GoogleMapsInfoWindowModule { }
