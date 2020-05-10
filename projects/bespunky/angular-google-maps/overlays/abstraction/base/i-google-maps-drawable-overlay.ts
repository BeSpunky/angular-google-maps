import { IGoogleMapsNativeObjectEmittingWrapper, IGoogleMap } from '@bespunky/angular-google-maps/core';
import { IGoogleMapsNativeDrawableOverlay                   } from '../native/i-google-maps-native-drawable-overlay';
import { OverlayType                                        } from './overlay-type.enum';

export interface IGoogleMapsDrawableOverlay<TNative extends IGoogleMapsNativeDrawableOverlay>
         extends IGoogleMapsNativeObjectEmittingWrapper<TNative>
{
    readonly map: IGoogleMap;
    /** Useful when reflection is complex or not possible. */
    readonly type: OverlayType;

    /**
     * Assigns the overlay to the specified map. If possible, prefer using the appropriate `GoogleMap.createXXX()` method instead.
     * If not possible, it is the responsability of the caller to add the overlay to the `OverlayTracker` in the `GoogleMap.overlays` object.
     * Otherwise, inconsistencies and unexpected behaviours might occur.
     *
     * @param {IGoogleMap} map The map to dispaly the overlay on.
     */
    attach(map: IGoogleMap): void;
    /**
     * Removes the overlay from the specified map. If possible, prefer using the `GoogleMap.removeOverlay()` method instead.
     * If not possible, it is the responsability of the caller to remove the overlay from the `OverlayTracker` in the `GoogleMap.overlays` object.
     * Otherwise, inconsistencies and unexpected behaviours might occur.
     */
    detach(): void;
}
