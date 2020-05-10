import { CoordPath                        } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay       } from '../../abstraction/base/i-google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../../abstraction/native/i-google-maps-native-drawable-overlay';

export interface IGoogleMapsPolygon<TPolygon extends IGoogleMapsNativeDrawableOverlay = google.maps.Polygon> extends IGoogleMapsDrawableOverlay<TPolygon>
{
    getPath(): google.maps.LatLngLiteral[][];
    setPath(coords: CoordPath): void;

    // Options delegators
    setClickable     (clickable: boolean)                  : void;
    setFillColor     (color: string)                       : void;
    setFillOpacity   (opacity: number)                     : void;
    setStrokeColor   (color: string)                       : void;
    setStrokeOpacity (opacity: number)                     : void;
    setStrokePosition(position: google.maps.StrokePosition): void;
    setStrokeWeight  (weight: number)                      : void;
    setZIndex        (zIndex: number)                      : void;
    setGeodesic      (geodesic: boolean)                   : void;
}
