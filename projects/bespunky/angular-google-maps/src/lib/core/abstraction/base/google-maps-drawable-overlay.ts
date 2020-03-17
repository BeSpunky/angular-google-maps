import { IGoogleMapsDrawableOverlay } from './i-google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';
import { IGoogleMap } from '../../../google-map/i-google-map';
import { GoogleMapsNativeObjectWrapper } from './google-maps-native-object-wrapper';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { OverlayType } from './overlay-type.enum';

export abstract class GoogleMapsDrawableOverlay extends GoogleMapsNativeObjectWrapper implements IGoogleMapsDrawableOverlay
{
    public abstract readonly native: Promise<IGoogleMapsNativeDrawableOverlay>;

    private readonly type: OverlayType;

    constructor(type: OverlayType, protected map: IGoogleMap, protected api: GoogleMapsApiService)
    {
        super();

        this.type = type;

        if (map) this.setContainingMap(map);
    }

    public getType(): OverlayType
    {
        return this.type;
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
    public async setContainingMap(map: IGoogleMap)
    {
        this.map = map;

        // Wait for the map object to create, then for the drawable to create, then set the map to the drawable
        this.api.runOutsideAngular(async () =>
        {
            const nativeMap      = await map.native;
            const nativeDrawable = await this.native;

            nativeDrawable.setMap(nativeMap);
        });
    }

    /**
     * Removes the overlay from the specified map. If possible, prefer using the `GoogleMap.removeOverlay()` method instead.
     * If not possible, it is the responsability of the caller to remove the overlay from the `OverlayTracker` in the `GoogleMap.overlays` object.
     * Otherwise, inconsistencies and unexpected behaviours might occur.
     */
    public async removeFromMap()
    {
        this.map = null;

        this.api.runOutsideAngular(async () =>
        {
            const nativeDrawable = await this.native;

            nativeDrawable.setMap(null);
        });
    }
}
