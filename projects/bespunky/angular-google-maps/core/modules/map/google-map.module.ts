import { NgModule } from '@angular/core';

import { GoogleMapComponent       } from './component/google-map.component';

@NgModule({
    declarations: [GoogleMapComponent],
    exports     : [GoogleMapComponent]
})
export class GoogleMapModule { }
