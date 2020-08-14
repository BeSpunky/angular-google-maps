import { Directive               } from '@angular/core';
import { GoogleMapsComponentBase } from '@bespunky/angular-google-maps/core';

import { DrawableOverlay    } from '../types/abstraction';
import { OverlaysSuperpower } from '../../superpower/services/overlays-superpower.service';

/**
 * Provides everything `GoogleMapsComponentBase` provides and also takes care of removing the overlay wrapper from the map.
 * Extend this instead of `GoogleMapsComponentBase` for components/directives representing drawable overlays.
 */
@Directive()
export abstract class GoogleMapsOverlayComponentBase<TWrapper extends DrawableOverlay>
                extends GoogleMapsComponentBase<TWrapper>
{
    ngOnDestroy()
    {
        this.wrapper.map.superpowers.use(OverlaysSuperpower).removeOverlay(this.wrapper);
    }
}