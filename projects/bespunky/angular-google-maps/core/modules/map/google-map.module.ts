import { NgModule } from '@angular/core';

import { GoogleMapComponent  } from './component/google-map.component';
import { SuperpowersProvider } from './superpowers/superpowers.token';

@NgModule({
    declarations: [GoogleMapComponent],
    exports     : [GoogleMapComponent],
    providers   : [SuperpowersProvider]
})
export class GoogleMapModule { }
