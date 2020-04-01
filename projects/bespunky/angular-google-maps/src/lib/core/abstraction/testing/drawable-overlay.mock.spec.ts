import { GoogleMapsDrawableOverlay } from '../base/google-maps-drawable-overlay';import { MockNativeDrawableOverlay } from './native-overlay.mock.spec';import { GoogleMapsApiService } from '../../../../public-api';import { IGoogleMap } from '../../../google-map/i-google-map';import { OverlayType } from '../base/overlay-type.enum';

export class MockDrawableOverlay extends GoogleMapsDrawableOverlay<MockNativeDrawableOverlay>
{
    constructor(protected api: GoogleMapsApiService, public map: IGoogleMap, mockNativeOverlay: MockNativeDrawableOverlay)
    {
        super(api, map, OverlayType.Marker, mockNativeOverlay);
    }

    protected createNativeObject(mockNativeOverlay): MockNativeDrawableOverlay
    {
        return mockNativeOverlay;
    }
}