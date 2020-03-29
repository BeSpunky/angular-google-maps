import { GoogleMapsLifecycleBase } from './google-maps-lifecycle-base';
import { IGoogleMapsDrawableOverlay } from './i-google-maps-drawable-overlay';

/**
 * Provides everything `GoogleMapsLifecycleBase` provides and also takes care of removing the overlay wrapper from the map.
 * Extend this instead of `GoogleMapsLifecycleBase` for components/directives representing drawable overlays.
 */
export abstract class GoogleMapsOverlayLifecycleBase extends GoogleMapsLifecycleBase
{
    ngOnDestroy()
    {
        const overlay = this.nativeWrapper as IGoogleMapsDrawableOverlay;

        overlay.map.removeOverlay(overlay);

        super.ngOnDestroy();
    }
}