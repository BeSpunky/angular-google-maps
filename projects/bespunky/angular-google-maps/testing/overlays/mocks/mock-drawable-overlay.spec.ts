import { MockEmittingWrapper } from '../../../src/lib/core/abstraction/testing/mock-emitting-wrapper.spec';
import { IGoogleMapsDrawableOverlay } from '../../../overlays/abstraction/base/i-google-maps-drawable-overlay';
import { IGoogleMap } from '../../../src/lib/google-map/i-google-map';
import { OverlayType } from '../../../overlays/abstraction/base/overlay-type.enum';
import { IGoogleMapsNativeDrawableOverlay } from '../../../overlays/abstraction/native/i-google-maps-native-drawable-overlay';

export class MockDrawableOverlay<TNative extends IGoogleMapsNativeDrawableOverlay>
     extends MockEmittingWrapper<TNative> implements IGoogleMapsDrawableOverlay<TNative>
{
    map: IGoogleMap;
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