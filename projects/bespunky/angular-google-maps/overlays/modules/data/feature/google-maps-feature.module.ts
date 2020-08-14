import { NgModule } from '@angular/core';

import { GoogleMapsFeatureDirective       } from './directive/google-maps-feature.directive';

@NgModule({
    declarations: [GoogleMapsFeatureDirective],
    exports     : [GoogleMapsFeatureDirective]
})
export class GoogleMapsFeatureModule { }
