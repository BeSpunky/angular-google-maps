import { Injectable } from '@angular/core';

import { GoogleMapModule, Superpower, GoogleMapsApiService, Coord, CoordPath  } from '@bespunky/angular-google-maps/core';
import { DrawableOverlay     } from '../../abstraction/types/abstraction';
import { GoogleMapsMarker    } from '../../modules/marker/google-maps-marker';
import { GoogleMapsPolygon   } from '../../modules/polygon/google-maps-polygon';
import { GoogleMapsData      } from '../../modules/data/google-maps-data';
import { OverlaysTracker     } from './overlays-tracker';
import { IOverlaysSuperpower } from '../i-overlays-superpower';

@Injectable({
    providedIn: GoogleMapModule
})
export class OverlaysSuperpower extends Superpower implements IOverlaysSuperpower
{
    public readonly type = OverlaysSuperpower;
    
    constructor(public tracker: OverlaysTracker, private api: GoogleMapsApiService)
    {
        super();
    }
    
    public createMarker(position: Coord, options?: google.maps.ReadonlyMarkerOptions): GoogleMapsMarker
    {
        options = Object.assign({}, options, { position: this.api.geometry.toLiteralCoord(position) });
        
        // Marker creation will cause rendering. Run outside...
        return this.createOverlay(() => new GoogleMapsMarker(this.api, this.map, options));
    }
    
    public createPolygon(path: CoordPath, options?: google.maps.PolygonOptions): GoogleMapsPolygon
    {
        options = Object.assign({}, options, { paths: this.api.geometry.toLiteralMultiPath(path) });

        return this.createOverlay(() => new GoogleMapsPolygon(this.api, this.map, options));
    }

    public createDataLayer(options?: google.maps.Data.DataOptions): GoogleMapsData
    {
        return this.createOverlay(() => new GoogleMapsData(this.api, this.map, options));
    }

    // TODO: Add here create methods for any new featured overlay type (e.g. polygons, polylines, etc.)

    private createOverlay<TOverlay extends DrawableOverlay>(createObject: () => TOverlay): TOverlay
    {
        // Overlay creation will cause rendering. Run outside...
        const overlay = this.api.runOutsideAngular(createObject);

        this.tracker.add(overlay);

        return overlay;
    }

    public removeOverlay<TOverlay extends DrawableOverlay>(overlay: TOverlay): void
    {
        // Overlay removal will cause rendering. Run outside...
        this.api.runOutsideAngular(() => overlay.detach());

        this.tracker.remove(overlay);
    }
}
