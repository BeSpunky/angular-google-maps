import { GoogleMapsNativeObjectEmittingWrapper } from './google-maps-native-object-emitting-wrapper';
import { IGoogleMapsDrawableOverlay } from './i-google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';
import { IGoogleMap } from '../../../google-map/i-google-map';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { OverlayType } from './overlay-type.enum';

export abstract class GoogleMapsDrawableOverlay<TNative extends IGoogleMapsNativeDrawableOverlay>
                extends GoogleMapsNativeObjectEmittingWrapper<TNative>
                implements IGoogleMapsDrawableOverlay<TNative>
{
    constructor(api: GoogleMapsApiService, public map: IGoogleMap, public readonly type: OverlayType, ...nativeArgs: any[])
    {
        super(api, ...nativeArgs);

        this.attach(map);
    }

    /**
     * Assigns the overlay to the specified map. If possible, prefer using the appropriate `GoogleMap.createXXX()` method instead.
     * If not possible, it is the responsability of the caller to add the overlay to the `OverlayTracker` in the `GoogleMap.overlays` object.
     * Otherwise, inconsistencies and unexpected behaviours might occur.
     *
     * @param {IGoogleMap} map The map to dispaly the overlay on.
     */
    public attach(map: IGoogleMap): void
    {
        this.map = map;

        this.api.runOutsideAngular(() => this.native.setMap(map.native));
    }

    /**
     * Removes the overlay from the map it is attached to. If possible, prefer using the `GoogleMap.removeOverlay()` method instead.
     * If not possible, it is the responsability of the caller to remove the overlay from the `OverlayTracker` in the `GoogleMap.overlays` object.
     * Otherwise, inconsistencies and unexpected behaviours might occur.
     */
    public detach(): void
    {
        this.attach(null);
    }
}
