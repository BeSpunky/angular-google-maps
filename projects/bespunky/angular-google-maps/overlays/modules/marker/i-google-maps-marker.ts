import { Coord                            } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsDrawableOverlay       } from '../../abstraction/base/i-google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../../abstraction/native/i-google-maps-native-drawable-overlay';

export interface IGoogleMapsMarker<TMarker extends IGoogleMapsNativeDrawableOverlay = google.maps.Marker> extends IGoogleMapsDrawableOverlay<TMarker>
{
    getPosition(): google.maps.LatLngLiteral;
    setPosition(coord: Coord): void;
}
