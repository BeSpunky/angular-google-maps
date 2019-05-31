import { NgModule } from '@angular/core';
import { ZenModule } from '@bespunky/angular-zen';

import { AngularGoogleMapsComponent } from './angular-google-maps.component';

@NgModule({
    declarations: [AngularGoogleMapsComponent],
    imports: [
        ZenModule
    ],
    exports: [AngularGoogleMapsComponent]
})
export class AngularGoogleMapsModule { }
