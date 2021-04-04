import { NgModule } from '@angular/core';

import { SuperpowersChargerService } from '@bespunky/angular-google-maps/core';
import { OverlaysDirective         } from './directive/overlays.directive';
import { OverlaysSuperpower        } from './services/overlays-superpower.service';

/**
 * Loads overlay superpowers for the overlays module and makes them available to the core module.
 *
 * @export
 * @class OverlaysSuperpowerModule
 */
@NgModule({
    declarations: [OverlaysDirective],
    exports     : [OverlaysDirective]
})
export class OverlaysSuperpowerModule
{
    constructor(charger: SuperpowersChargerService)
    {
        charger.charge(OverlaysSuperpower);
    }
}