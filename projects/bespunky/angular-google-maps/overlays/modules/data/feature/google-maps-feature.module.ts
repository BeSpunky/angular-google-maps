import { NgModule } from '@angular/core';

import { GoogleMapsFeatureDirective       } from './directive/google-maps-feature.directive';
import { GoogleMapsFeatureFactoryProvider } from './google-maps-feature-factory.provider';

@NgModule({
    declarations: [GoogleMapsFeatureDirective],
    exports     : [GoogleMapsFeatureDirective],
    providers   : [GoogleMapsFeatureFactoryProvider]
})
export class GoogleMapsFeatureModule { }
