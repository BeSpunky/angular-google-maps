import { GoogleMapsLifecycleBase } from './google-maps-lifecycle-base';
import { DrawableOverlay } from '../types/drawable-overlay.type';

/**
 * Provides everything `GoogleMapsLifecycleBase` provides and also takes care of removing the overlay wrapper from the map.
 * Extend this instead of `GoogleMapsLifecycleBase` for components/directives representing drawable overlays.
 */
export abstract class GoogleMapsOverlayLifecycleBase<TWrapper extends DrawableOverlay>
                extends GoogleMapsLifecycleBase<TWrapper>
{
    ngOnDestroy()
    {
        this.wrapper.map.removeOverlay(this.wrapper);
    }
}