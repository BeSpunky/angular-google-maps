import { BoundsLike, CoordPath, ISuperpower } from '@bespunky/angular-google-maps/core';
import { DrawableOverlay                    } from '../abstraction/types/abstraction';
import { IGoogleMapsMarker                  } from '../modules/marker/i-google-maps-marker';
import { IGoogleMapsPolygon                 } from '../modules/polygon/i-google-maps-polygon';
import { IGoogleMapsCircle                  } from '../modules/circle/i-google-maps-circle';
import { IGoogleMapsData                    } from '../modules/data/i-google-maps-data';

/**
 * Represents the functionality that an overlays superpower should provide.
 *
 * @export
 * @interface IOverlaysSuperpower
 * @extends {ISuperpower}
 */
export interface IOverlaysSuperpower extends ISuperpower
{
    /**
     * Creates a marker with the specified properties and adds it to the map.
     *
     * @param {BoundsLike} position The position at which the marker should be added.
     * @param {google.maps.MarkerOptions} [options] (Optional) Any native options to assign to the marker.
     * @returns {GoogleMapsMarker} The wrapper object created for the new marker.
     */
    createMarker    (position: BoundsLike, options?: google.maps.MarkerOptions)              : IGoogleMapsMarker;
    /**
     * Creates a polygon with the specified properties and adds it to the map.
     *
     * @param {CoordPath} path The path describing the polygon coordinates.
     * @param {google.maps.PolygonOptions} [options] (Optional) Any native options to assign to the polygon.
     * @returns {GoogleMapsPolygon} The wrapper object created for the new polygon.
     */
    createPolygon   (path: CoordPath, options?: google.maps.PolygonOptions)                  : IGoogleMapsPolygon;
    /**
     * Creates a polygon with the specified properties and adds it to the map.
     *
     * @param {BoundsLike} center The center of the circle.
     * @param {number} radius The radius in meters on the Earth's surface.
     * @param {google.maps.CircleOptions} [options] (Optional) Any native options to assign to the circle.
     * @returns {GoogleMapsCircle} The wrapper object created for the new circle.
     */
    createCircle    (center: BoundsLike, radius: number, options?: google.maps.CircleOptions): IGoogleMapsCircle;
    /**
     * Creates a data layer with the specified properties and adds it to the map.
     *
     * @param {google.maps.Data.DataOptions} [options] (Optional) Any native options to assign to the data layer.
     * @returns {GoogleMapsData} The wrapper object created for the new data layer.
     */
    createDataLayer (options?: google.maps.Data.DataOptions)                                 : IGoogleMapsData;
    /**
     * Removes the specified overlay from the map.
     *
     * @template TOverlay The type of overlay being removed.
     * @param {TOverlay} overlay The wrapper of the overlay to remove.
     */
    removeOverlay<TOverlay extends DrawableOverlay>(overlay: TOverlay)                       : void;
}
