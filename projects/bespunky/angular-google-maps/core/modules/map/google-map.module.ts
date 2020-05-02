import { NgModule } from '@angular/core';

import { GoogleMapComponent       } from './component/google-map.component';
import { GoogleMapFactoryProvider } from './google-map-factory.provider';

@NgModule({
    declarations: [GoogleMapComponent],
    exports     : [GoogleMapComponent],
    providers   : [GoogleMapFactoryProvider]
})
export class GoogleMapModule { }
