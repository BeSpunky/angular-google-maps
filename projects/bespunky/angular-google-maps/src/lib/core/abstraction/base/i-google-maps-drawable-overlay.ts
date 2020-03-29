import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';
import { IGoogleMap } from '../../../google-map/i-google-map';
import { OverlayType } from './overlay-type.enum';

export interface IGoogleMapsDrawableOverlay extends IGoogleMapsNativeObjectEmittingWrapper
{
    readonly map: IGoogleMap;
    /** Useful when reflection is complex or not possible. */
    readonly type: OverlayType;

    /**
     * Retrieves the map this overlay is assigned to.
     *
     * @returns {IGoogleMap} The map this overlay is assigned to. `null` if the overlay is not assigned to any map.
     */
    getContainingMap(): IGoogleMap;
    /**
     * Assigns the overlay to the specified map. If possible, prefer using the appropriate `GoogleMap.createXXX()` method instead.
     * If not possible, it is the responsability of the caller to add the overlay to the `OverlayTracker` in the `GoogleMap.overlays` object.
     * Otherwise, inconsistencies and unexpected behaviours might occur.
     *
     * @param {IGoogleMap} map The map to dispaly the overlay on.
     */
    setContainingMap(map: IGoogleMap): void;
    /**
     * Removes the overlay from the specified map. If possible, prefer using the `GoogleMap.removeOverlay()` method instead.
     * If not possible, it is the responsability of the caller to remove the overlay from the `OverlayTracker` in the `GoogleMap.overlays` object.
     * Otherwise, inconsistencies and unexpected behaviours might occur.
     */
    removeFromMap(): void;
}
