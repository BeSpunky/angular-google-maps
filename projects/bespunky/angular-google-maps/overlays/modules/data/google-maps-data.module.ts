import { NgModule } from '@angular/core';

import { GoogleMapsDataDirective       } from './directive/google-maps-data.directive';
import { GoogleMapsFeatureModule       } from './feature/google-maps-feature.module';

@NgModule({
    declarations: [GoogleMapsDataDirective],
    imports     : [GoogleMapsFeatureModule],
    exports     : [GoogleMapsDataDirective, GoogleMapsFeatureModule]
})
export class GoogleMapsDataModule { }
