import { IGoogleMap, Coord, NativeObjectWrapper, WrappedNativeFunctions, GeometryTransformService } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsMarker, OverlayType                                                           } from '@bespunky/angular-google-maps/overlays';
import { MockDrawableOverlay                                                                      } from '../mock-drawable-overlay';

export type WrappedMarkerFunctions = WrappedNativeFunctions<google.maps.Marker, 'getPosition' | 'setPosition' | 'addListener' | 'bindTo' | 'unbind' | 'unbindAll' | 'notify' | 'getMap' | 'setMap' | 'get' | 'set'>;

export interface MockMarker extends WrappedMarkerFunctions { }

// @dynamic
@NativeObjectWrapper<google.maps.Marker, MockMarker>()
export class MockMarker extends MockDrawableOverlay<google.maps.Marker> implements IGoogleMapsMarker
{
    private geometry = new GeometryTransformService();

    constructor(map: IGoogleMap, native?: google.maps.Marker)
    {
        super(map, native || new google.maps.Marker());

        this.type = OverlayType.Marker;
    }
    
    getBounds(): google.maps.LatLngBounds
    {
        return this.geometry.defineCoordBounds(this.native.getPosition());
    }

    getPosition(): google.maps.LatLngLiteral
    {
        return this.native.getPosition().toJSON();
    }

    setPosition(coord: Coord): void
    {
        return this.native.setPosition(this.geometry.toLiteralCoord(coord));
    }
}