import { IGoogleMapsMarker, IGoogleMapsPolygon, IGoogleMapsData } from '@bespunky/angular-google-maps/overlays';

/**
 * Represents a snapshot of the map's overlays after changes happened.
 * @see OverlaysTracker.changes observable
 */
export class OverlaysState
{
    constructor(
        public markers   : IGoogleMapsMarker [] = [],
        public polygons  : IGoogleMapsPolygon[] = [],
        public dataLayers: IGoogleMapsData   [] = []
    ) { }

    /**
     * `true` if no overlays exist on the map; otherwise `false`.
     */
    public get empty(): boolean
    {
        return !(this.markers.length || this.polygons.length || this.dataLayers.length);
    }
}
