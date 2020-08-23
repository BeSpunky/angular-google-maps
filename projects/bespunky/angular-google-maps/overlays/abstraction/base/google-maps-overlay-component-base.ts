import { Directive, OnInit       } from '@angular/core';
import { GoogleMapsComponentBase } from '@bespunky/angular-google-maps/core';

import { DrawableOverlay    } from '../types/abstraction';
import { OverlaysSuperpower } from '../../superpower/services/overlays-superpower.service';

/**
 * Provides everything `GoogleMapsComponentBase` provides and also takes care of adding and removing the overlay wrapper from the map and the overlays tracker.
 * Extend this instead of `GoogleMapsComponentBase` for components/directives representing drawable overlays.
 */
@Directive()
export abstract class GoogleMapsOverlayComponentBase<TWrapper extends DrawableOverlay>
              extends GoogleMapsComponentBase<TWrapper>
           implements OnInit
{
    ngOnInit()
    {
        // The map is attached to the overlay on overlay construction time. However, the overlay wrapper doesn't share the responsability of tracking.
        // Tracking is done by overlay directives or by manual use of the superpowers, and so the directive only reports to the tracker that an overlay
        // was added.
        this.wrapper.map.superpowers.use(OverlaysSuperpower).tracker.add(this.wrapper);
    }

    ngOnDestroy()
    {
        this.wrapper.map.superpowers.use(OverlaysSuperpower).removeOverlay(this.wrapper);
    }
}