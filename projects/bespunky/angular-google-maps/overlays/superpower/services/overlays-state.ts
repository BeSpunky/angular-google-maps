import { IGoogleMapsMarker  } from '../../modules/marker/i-google-maps-marker';
import { IGoogleMapsPolygon } from '../../modules/polygon/i-google-maps-polygon';
import { IGoogleMapsData    } from '../../modules/data/i-google-maps-data';

/**
 * Represents a snapshot of the map's overlays after changes happened.
 * @see OverlaysTracker.changes observable
 */
export class OverlaysState
{
    constructor(
        /** `true` if this is the first change (tracker was just created); otherwise `false`. */
        public readonly first: boolean,
        /** All current markers on the map. */
        public readonly markers   : IGoogleMapsMarker [] = [],
        /** All current polygons on the map. */
        public readonly polygons  : IGoogleMapsPolygon[] = [],
        /** All current data layers on the map. */
        public readonly dataLayers: IGoogleMapsData   [] = []
    ) { }

    /**
     * `true` if no overlays exist on the map; otherwise `false`.
     */
    public get empty(): boolean
    {
        return !(this.markers.length || this.polygons.length || this.dataLayers.length);
    }
}
