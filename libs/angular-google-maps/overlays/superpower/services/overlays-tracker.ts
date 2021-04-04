import { BehaviorSubject } from 'rxjs';
import { Injectable      } from '@angular/core';

import { GoogleMapModule     } from '@bespunky/angular-google-maps/core';
import { OverlayType         } from '../../abstraction/base/overlay-type.enum';
import { DrawableOverlay     } from '../../abstraction/types/abstraction';
import { IGoogleMapsMarker   } from '../../modules/marker/i-google-maps-marker';
import { IGoogleMapsPolygon  } from '../../modules/polygon/i-google-maps-polygon';
import { IGoogleMapsPolyline } from '../../modules/polyline/i-google-maps-polyline';
import { IGoogleMapsCircle   } from '../../modules/circle/i-google-maps-circle';
import { IGoogleMapsData     } from '../../modules/data/i-google-maps-data';
import { OverlaysState       } from './overlays-state';

/**
 * Tracks the overlays added to and removed from the map for easy access.
 */
@Injectable({
    providedIn: GoogleMapModule
})
export class OverlaysTracker
{
    public readonly markers   : IGoogleMapsMarker  [] = [];
    public readonly polygons  : IGoogleMapsPolygon [] = [];
    public readonly polylines : IGoogleMapsPolyline[] = [];
    public readonly circles   : IGoogleMapsCircle  [] = [];
    public readonly dataLayers: IGoogleMapsData    [] = [];
    
    /**
     * Emits an `OverlaysState` object every time an overlay is added or removed from the map.
     */
    public readonly changes: BehaviorSubject<OverlaysState> = new BehaviorSubject(this.state(true));

    private map = {
        [OverlayType.Marker  ]: this.markers,
        [OverlayType.Polygon ]: this.polygons,
        [OverlayType.Polyline]: this.polylines,
        [OverlayType.Circle  ]: this.circles,
        [OverlayType.Data    ]: this.dataLayers,
        // TODO: Add here any new supported overlay type collection
    };

    /**
     * Registers an added overlay.
     *
     * @param {DrawableOverlay} overlay The overlay that was added to the map.
     */
    public add(overlay: DrawableOverlay)
    {
        this.detectCollection(overlay).push(overlay);

        this.reportChanges();
    }

    /**
     * Registers a removed overlay.
     *
     * @param {DrawableOverlay} overlay The overlay that was removed from the map.
     */
    public remove(overlay: DrawableOverlay)
    {
        const collection = this.detectCollection(overlay);
        const index      = collection.indexOf(overlay);

        if (index > -1)
        {
            collection.splice(index, 1);

            this.reportChanges();
        }
    }

    private detectCollection(overlay: DrawableOverlay): DrawableOverlay[]
    {
        const collection = this.map[overlay.type];

        if (collection) return collection;

        throw new Error('Overlay type not supported by OverlayTracker.');
    }

    private state(first: boolean = false): OverlaysState
    {
        // Duplicate the array so the state won't reference the tracker's collections
        return new OverlaysState(first, [...this.markers], [...this.polygons], [...this.polylines], [...this.dataLayers]);
    }

    // TODO: This may cost in performance when working with large collections. Perform tests and consider refactoring to allow tracking code to complete
    // immediately without having to create a state and report for each single overlay added or removed.
    private reportChanges(): void
    {
        this.changes.next(this.state());
    }
}