import { MockEmittingWrapper                                                                               } from '@bespunky/angular-google-maps/core/testing';
import { IGoogleMapsNativeDrawableOverlay, IGoogleMapsDrawableOverlay, IGoogleMapWithOverlays, OverlayType } from '@bespunky/angular-google-maps/overlays'

export class MockDrawableOverlay<TNative extends IGoogleMapsNativeDrawableOverlay>
     extends MockEmittingWrapper<TNative> implements IGoogleMapsDrawableOverlay<TNative>
{
    map : IGoogleMapWithOverlays;
    type: OverlayType;

    constructor(map: IGoogleMapWithOverlays, public native: TNative)
    {
        super(native);
        
        this.attach(map);
    }

    attach(map: IGoogleMapWithOverlays): void
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