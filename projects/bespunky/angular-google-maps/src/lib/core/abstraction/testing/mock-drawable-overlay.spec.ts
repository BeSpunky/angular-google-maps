import { MockEmittingWrapper } from './mock-emitting-wrapper.spec';
import { IGoogleMapsDrawableOverlay } from '../base/i-google-maps-drawable-overlay';
import { MockNativeDrawableOverlay } from './mock-native-drawable-overlay.spec';
import { IGoogleMap } from '../../../google-map/i-google-map';
import { OverlayType } from '../base/overlay-type.enum';

export class MockDrawableOverlay extends MockEmittingWrapper<MockNativeDrawableOverlay> implements IGoogleMapsDrawableOverlay<MockNativeDrawableOverlay>
{
    map: IGoogleMap;
    type: OverlayType;

    constructor(map: IGoogleMap, native: MockNativeDrawableOverlay)
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