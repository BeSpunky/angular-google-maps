import { GoogleMap, Coord } from '@bespunky/angular-google-maps/core';
import { IGoogleMapWithOverlays } from './i-google-map-with-overlays';
import { DrawableOverlay        } from '../../abstraction/types/abstraction';
import { OverlaysTracker        } from '../../services/overlays-tracker';
import { GoogleMapsMarker       } from '../marker/google-maps-marker';
import { GoogleMapsPolygon      } from '../polygon/google-maps-polygon';
import { GoogleMapsData         } from '../data/google-maps-data';

export class GoogleMapWithOverlays extends GoogleMap implements IGoogleMapWithOverlays
{
    public readonly overlays = new OverlaysTracker();
    
    public createMarker(position: Coord, options?: google.maps.ReadonlyMarkerOptions): GoogleMapsMarker
    {
        options = Object.assign({}, options, { position: this.api.geometry.toLiteralCoord(position) });
        
        // Marker creation will cause rendering. Run outside...
        return this.createOverlay(() => new GoogleMapsMarker(this.api, this, options));
    }
    
    public createPolygon(path: CoordPath, options?: google.maps.PolygonOptions): GoogleMapsPolygon
    {
        options = Object.assign({}, options, { paths: this.api.geometry.toLiteralMultiPath(path) });

        return this.createOverlay(() => new GoogleMapsPolygon(this.api, this, options));
    }

    public createDataLayer(options?: google.maps.Data.DataOptions): GoogleMapsData
    {
        return this.createOverlay(() => new GoogleMapsData(this.api, this, options));
    }

    // TODO: Add here create methods for any new featured overlay type (e.g. polygons, polylines, etc.)

    private createOverlay<TOverlay extends DrawableOverlay>(createObject: () => TOverlay): TOverlay
    {
        // Overlay creation will cause rendering. Run outside...
        const overlay = this.api.runOutsideAngular(createObject);

        this.overlays.add(overlay);

        return overlay;
    }

    public removeOverlay<TOverlay extends DrawableOverlay>(overlay: TOverlay): void
    {
        // Overlay removal will cause rendering. Run outside...
        this.api.runOutsideAngular(() => overlay.detach());

        this.overlays.remove(overlay);
    }
}
