import { IGoogleMap, Coord, CoordPath } from '@bespunky/angular-google-maps/core';
import { DrawableOverlay    } from '../../abstraction/types/abstraction';
import { IGoogleMapsMarker  } from '../marker/i-google-maps-marker';
import { IGoogleMapsPolygon } from '../polygon/i-google-maps-polygon';
import { IGoogleMapsData    } from '../data/i-google-maps-data';

export interface IGoogleMapWithOverlays extends IGoogleMap
{
    createMarker    (position: Coord, options?: google.maps.ReadonlyMarkerOptions): IGoogleMapsMarker;
    createPolygon   (path: CoordPath, options?: google.maps.ReadonlyMarkerOptions): IGoogleMapsPolygon;
    createDataLayer (options?: google.maps.Data.DataOptions)                      : IGoogleMapsData;
    removeOverlay<TOverlay extends DrawableOverlay>(overlay: TOverlay)            : void;
}
