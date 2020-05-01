import { NgModule } from '@angular/core';

import { GoogleMapsDataDirective       } from './directive/google-maps-data.directive';
import { GoogleMapsDataFactoryProvider } from './google-maps-data-factory.provider';

@NgModule({
    declarations: [GoogleMapsDataDirective],
    exports     : [GoogleMapsDataDirective],
    providers   : [GoogleMapsDataFactoryProvider]
})
export class GoogleMapsDataModule { }
