import { GoogleMapsNativeObjectEmittingWrapper } from './google-maps-native-object-emitting-wrapper';
import { IGoogleMapsDrawableOverlay } from './i-google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';
import { IGoogleMap } from '../../../google-map/i-google-map';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { OverlayType } from './overlay-type.enum';

export abstract class GoogleMapsDrawableOverlay<TNative extends IGoogleMapsNativeDrawableOverlay>
                extends GoogleMapsNativeObjectEmittingWrapper<TNative>
                implements IGoogleMapsDrawableOverlay
{
    constructor(public readonly type: OverlayType, protected map: IGoogleMap, protected api: GoogleMapsApiService)
    {
        super(api);

        if (map) this.setContainingMap(map);
    }

    public getContainingMap(): IGoogleMap
    {
        return this.map;
    }

    /**
     * Assigns the overlay to the specified map. If possible, prefer using the appropriate `GoogleMap.createXXX()` method instead.
     * If not possible, it is the responsability of the caller to add the overlay to the `OverlayTracker` in the `GoogleMap.overlays` object.
     * Otherwise, inconsistencies and unexpected behaviours might occur.
     *
     * @param {IGoogleMap} map The map to dispaly the overlay on.
     */
    public setContainingMap(map: IGoogleMap): Promise<void>
    {
        this.map = map;

        // Wait for the map object to create, then for the drawable to create, then set the map to the drawable
        return this.api.runOutsideAngular(() => map.native.then((nativeMap: google.maps.Map) => this.nativeObject.setMap(nativeMap)));
    }

    /**
     * Removes the overlay from the specified map. If possible, prefer using the `GoogleMap.removeOverlay()` method instead.
     * If not possible, it is the responsability of the caller to remove the overlay from the `OverlayTracker` in the `GoogleMap.overlays` object.
     * Otherwise, inconsistencies and unexpected behaviours might occur.
     */
    public removeFromMap(): Promise<void>
    {
        this.map = null;

        return this.api.runOutsideAngular(() => this.nativeObject.setMap(null));
    }
}
