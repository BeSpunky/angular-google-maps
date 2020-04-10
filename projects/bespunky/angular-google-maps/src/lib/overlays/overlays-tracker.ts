import { OverlayType } from '../core/abstraction/base/overlay-type.enum';
import { IGoogleMapsMarker } from './marker/i-google-maps-marker';
import { IGoogleMapsData } from './data/i-google-maps-data';
import { DrawableOverlay } from '../core/abstraction/types/abstraction';
import { IGoogleMapsPolygon } from './polygon/i-google-maps-polygon';

export class OverlaysTracker
{
    public markers   : IGoogleMapsMarker [] = [];
    public polygons  : IGoogleMapsPolygon[] = [];
    public dataLayers: IGoogleMapsData   [] = [];

    private map = {
        [OverlayType.Marker] : this.markers,
        [OverlayType.Polygon]: this.polygons,
        [OverlayType.Data]   : this.dataLayers,
        // TODO: Add here any new supported overlay type collection
    };

    public add(overlay: DrawableOverlay)
    {
        this.detectCollection(overlay).push(overlay);
    }

    public remove(overlay: DrawableOverlay)
    {
        const collection = this.detectCollection(overlay);
        const index      = collection.indexOf(overlay);

        if (index > -1)
            collection.splice(index, 1);
    }

    private detectCollection(overlay: DrawableOverlay): DrawableOverlay[]
    {
        const collection = this.map[overlay.type];

        if (collection) return collection;

        throw new Error('Overlay type not supported by OverlayTracker.');
    }
}