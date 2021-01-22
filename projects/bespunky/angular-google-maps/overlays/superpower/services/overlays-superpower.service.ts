import { Injectable } from '@angular/core';

import { GoogleMapModule, Superpower, GoogleMapsApiService, BoundsLike, CoordPath } from '@bespunky/angular-google-maps/core';
import { DrawableOverlay     } from '../../abstraction/types/abstraction';
import { GoogleMapsMarker    } from '../../modules/marker/google-maps-marker';
import { GoogleMapsPolygon   } from '../../modules/polygon/google-maps-polygon';
import { GoogleMapsPolyline  } from '../../modules/polyline/google-maps-polyline';
import { GoogleMapsCircle    } from '../../modules/circle/google-maps-circle';
import { GoogleMapsData      } from '../../modules/data/google-maps-data';
import { IOverlaysSuperpower } from '../i-overlays-superpower';
import { OverlaysTracker     } from './overlays-tracker';

/**
 * Automates and facilitates tracking of overlays on the map and provide quick overlay creation methods.
 *
 * @export
 * @class OverlaysSuperpower
 * @extends {Superpower}
 * @implements {IOverlaysSuperpower}
 */
@Injectable({
    providedIn: GoogleMapModule
})
export class OverlaysSuperpower extends Superpower implements IOverlaysSuperpower
{    
    /**
     * Creates an instance of OverlaysSuperpower.
     * 
     * @param {OverlaysTracker} tracker The tracker following the presence of overlays on the map.
     * @param {GoogleMapsApiService} api The instance of the maps api service.
     */
    constructor(public tracker: OverlaysTracker, private api: GoogleMapsApiService)
    {
        super();
    }
    
    /**
     * Creates a marker with the specified properties and adds it to the map.
     *
     * @param {BoundsLike} position The position at which the marker should be added.
     * @param {google.maps.ReadonlyMarkerOptions} [options] (Optional) Any native options to assign to the marker.
     * @returns {GoogleMapsMarker} The wrapper object created for the new marker.
     */
    public createMarker(position: BoundsLike, options?: google.maps.ReadonlyMarkerOptions): GoogleMapsMarker
    {
        options = Object.assign({}, options, { position: this.api.geometry.centerOf(position) });
        
        // Marker creation will cause rendering. Run outside...
        return this.createOverlay(() => new GoogleMapsMarker(this.api, this.map, options));
    }
    
    /**
     * Creates a polygon with the specified properties and adds it to the map.
     *
     * @param {CoordPath} path The path describing the polygon coordinates.
     * @param {google.maps.PolygonOptions} [options] (Optional) Any native options to assign to the polygon.
     * @returns {GoogleMapsPolygon} The wrapper object created for the new polygon.
     */
    public createPolygon(path: CoordPath, options?: google.maps.PolygonOptions): GoogleMapsPolygon
    {
        options = Object.assign({}, options, { paths: this.api.geometry.toLiteralMultiPath(path) });

        return this.createOverlay(() => new GoogleMapsPolygon(this.api, this.map, options));
    }
    
    /**
     * Creates a polyline with the specified properties and adds it to the map.
     *
     * @param {Path} path The path describing the polyline coordinates.
     * @param {google.maps.PolylineOptions} [options] (Optional) Any native options to assign to the polyline.
     * @returns {GoogleMapsPolyline} The wrapper object created for the new polyline.
     */
    public createPolyline(path: CoordPath, options?: google.maps.PolylineOptions): GoogleMapsPolyline
    {
        options = Object.assign({}, options, { path: this.api.geometry.toLiteralMultiPath(path)[0] });

        return this.createOverlay(() => new GoogleMapsPolyline(this.api, this.map, options));
    }
    
    /**
     * Creates a polygon with the specified properties and adds it to the map.
     *
     * @param {BoundsLike} center The center of the circle.
     * @param {number} radius The radius in meters on the Earth's surface.
     * @param {google.maps.CircleOptions} [options] (Optional) Any native options to assign to the circle.
     * @returns {GoogleMapsCircle} The wrapper object created for the new circle.
     */
    public createCircle(center: BoundsLike, radius: number, options?: google.maps.CircleOptions): GoogleMapsCircle
    {
        options = Object.assign({}, options, { center: this.api.geometry.centerOf(center), radius });

        return this.createOverlay(() => new GoogleMapsCircle(this.api, this.map, options));
    }

    /**
     * Creates a data layer with the specified properties and adds it to the map.
     *
     * @param {google.maps.Data.DataOptions} [options] (Optional) Any native options to assign to the data layer.
     * @returns {GoogleMapsData} The wrapper object created for the new data layer.
     */
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

    /**
     * Removes the specified overlay from the map.
     *
     * @template TOverlay The type of overlay being removed.
     * @param {TOverlay} overlay The wrapper of the overlay to remove.
     */
    public removeOverlay<TOverlay extends DrawableOverlay>(overlay: TOverlay): void
    {
        // Overlay removal will cause rendering. Run outside...
        this.api.runOutsideAngular(() => overlay.detach());

        this.tracker.remove(overlay);
    }
}
