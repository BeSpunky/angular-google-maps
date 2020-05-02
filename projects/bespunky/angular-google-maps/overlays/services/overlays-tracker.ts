import { OverlayType        } from '../abstraction/base/overlay-type.enum';
import { DrawableOverlay    } from '../abstraction/types/abstraction';
import { IGoogleMapsMarker  } from '../modules/marker/i-google-maps-marker';
import { IGoogleMapsPolygon } from '../modules/polygon/i-google-maps-polygon';
import { IGoogleMapsData    } from '../modules/data/i-google-maps-data';

export class OverlaysTracker
{
    public markers   : IGoogleMapsMarker [] = [];
    public polygons  : IGoogleMapsPolygon[] = [];
    public dataLayers: IGoogleMapsData   [] = [];

    private map = {
        [OverlayType.Marker ]: this.markers,
        [OverlayType.Polygon]: this.polygons,
        [OverlayType.Data   ]: this.dataLayers,
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