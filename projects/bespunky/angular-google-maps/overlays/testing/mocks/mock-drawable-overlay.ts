import { MockEmittingWrapper                                                       } from '@bespunky/angular-google-maps/core/testing';
import { IGoogleMap                                                                } from '@bespunky/angular-google-maps/core'
import { IGoogleMapsNativeDrawableOverlay, IGoogleMapsDrawableOverlay, OverlayType } from '@bespunky/angular-google-maps/overlays'

export class MockDrawableOverlay<TNative extends IGoogleMapsNativeDrawableOverlay>
     extends MockEmittingWrapper<TNative> implements IGoogleMapsDrawableOverlay<TNative>
{
    map : IGoogleMap;
    type: OverlayType;

    constructor(map: IGoogleMap, public native: TNative)
    {
        super(native);
        
        this.attach(map);
    }

    attach(map: IGoogleMap): void
    {
        this.map = map;

        this.native.setMap(map.native);
    }

    detach(): void
    {
        this.map = null;

        this.native.setMap(null);
    }
}