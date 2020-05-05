import { NgModule } from "@angular/core";

import { OverlaysDirective          } from './directive/overlays.directive';
import { OverlaysSuperpowerProvider } from './overlays-superpower.provider';

@NgModule({
    declarations: [OverlaysDirective],
    exports     : [OverlaysDirective],
    providers   : [OverlaysSuperpowerProvider]
})
export class OverlaysSuperpowerModule { }