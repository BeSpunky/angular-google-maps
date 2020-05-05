import { MockGoogleMap                                                                                   } from '@bespunky/angular-google-maps/core/testing';
import { Coord, CoordPath                                                                                } from '@bespunky/angular-google-maps/core';
import { IGoogleMapWithOverlays, IGoogleMapsMarker, IGoogleMapsPolygon, IGoogleMapsData, DrawableOverlay } from '@bespunky/angular-google-maps/overlays';

export class MockGoogleMapWithOverlays extends MockGoogleMap implements IGoogleMapWithOverlays
{
    createMarker(position: Coord, options?: google.maps.ReadonlyMarkerOptions): IGoogleMapsMarker
    {
        throw new Error("Method not implemented.");
    }
    createPolygon(path: CoordPath, options?: google.maps.PolygonOptions): IGoogleMapsPolygon
    {
        throw new Error("Method not implemented.");
    }
    createDataLayer(options?: google.maps.Data.DataOptions): IGoogleMapsData
    {
        throw new Error("Method not implemented.");
    }
    removeOverlay<TOverlay extends DrawableOverlay>(overlay: TOverlay): void
    {
        throw new Error("Method not implemented.");
    }
}