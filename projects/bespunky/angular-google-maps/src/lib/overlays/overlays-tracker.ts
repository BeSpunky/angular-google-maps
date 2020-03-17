import { IGoogleMapsMarker } from './marker/i-google-maps-marker';
import { IGoogleMapsDrawableOverlay } from '../core/abstraction/base/i-google-maps-drawable-overlay';
import { GoogleMapsMarker } from './marker/google-maps-marker';

export class OverlaysTracker
{
    public markers: IGoogleMapsMarker[];
    // TODO: Add here any new featured overlays (e.g. polygons, polylines, etc.)

    public add(overlay: IGoogleMapsDrawableOverlay)
    {
        this.detectCollection(overlay).push(overlay);
    }

    public remove(overlay: IGoogleMapsDrawableOverlay)
    {
        const collection = this.detectCollection(overlay);
        const index      = collection.indexOf(overlay);

        if (index > -1)
            collection.splice(index, 1);
    }

    private detectCollection(overlay: IGoogleMapsDrawableOverlay): IGoogleMapsDrawableOverlay[]
    {
        if (overlay instanceof GoogleMapsMarker) return this.markers;

        // TODO: Add here any new featured overlays (e.g. polygons, polylines, etc.)

        throw new Error('Overlay type not supported by OverlayTracker.');
    }
}