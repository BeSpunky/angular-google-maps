import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';
import { IGoogleMap } from '../../../google-map/i-google-map';
import { OverlayType } from './overlay-type.enum';

export interface IGoogleMapsDrawableOverlay extends IGoogleMapsNativeObjectEmittingWrapper
{
    /** Useful when reflection is complex or not possible. */
    readonly type: OverlayType;
    
    getContainingMap(): IGoogleMap;
    setContainingMap(map: IGoogleMap): void;

    removeFromMap(): void;
}
