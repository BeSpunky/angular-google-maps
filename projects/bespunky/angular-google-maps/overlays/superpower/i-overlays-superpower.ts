import { BoundsLike, CoordPath, ISuperpower } from '@bespunky/angular-google-maps/core';
import { DrawableOverlay               } from '../abstraction/types/abstraction';
import { IGoogleMapsMarker             } from '../modules/marker/i-google-maps-marker';
import { IGoogleMapsPolygon            } from '../modules/polygon/i-google-maps-polygon';
import { IGoogleMapsCircle             } from '../modules/circle/i-google-maps-circle';
import { IGoogleMapsData               } from '../modules/data/i-google-maps-data';

export interface IOverlaysSuperpower extends ISuperpower
{
    createMarker    (position: BoundsLike, options?: google.maps.ReadonlyMarkerOptions)      : IGoogleMapsMarker;
    createPolygon   (path: CoordPath, options?: google.maps.PolygonOptions)                  : IGoogleMapsPolygon;
    createCircle    (center: BoundsLike, radius: number, options?: google.maps.CircleOptions): IGoogleMapsCircle;
    createDataLayer (options?: google.maps.Data.DataOptions)                                 : IGoogleMapsData;
    removeOverlay<TOverlay extends DrawableOverlay>(overlay: TOverlay)                       : void;
}
