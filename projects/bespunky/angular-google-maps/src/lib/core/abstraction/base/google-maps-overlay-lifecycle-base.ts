import { GoogleMapsLifecycleBase } from './google-maps-lifecycle-base';
import { IGoogleMapsDrawableOverlay } from './i-google-maps-drawable-overlay';

/**
 * Provides everything `GoogleMapsLifecycleBase` provides and also takes care of removing the overlay wrapper from the map.
 * Extend this instead of `GoogleMapsLifecycleBase` for components/directives representing drawable overlays.
 */
export abstract class GoogleMapsOverlayLifecycleBase<TWrapper extends IGoogleMapsDrawableOverlay>
                extends GoogleMapsLifecycleBase<TWrapper>
{
    ngOnDestroy()
    {
        if (!this.wrapper) return;

        this.wrapper.map.removeOverlay(this.wrapper);
    }
}