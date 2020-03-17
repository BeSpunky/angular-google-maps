import { IGoogleMapsDrawableOverlay } from './i-google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../native/i-google-maps-native-drawable-overlay';
import { IGoogleMap } from '../../../google-map/i-google-map';
import { GoogleMapsNativeObjectWrapper } from './google-maps-native-object-wrapper';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';

export abstract class GoogleMapsDrawableOverlay extends GoogleMapsNativeObjectWrapper implements IGoogleMapsDrawableOverlay
{
    abstract readonly native: Promise<IGoogleMapsNativeDrawableOverlay>;

    constructor(protected map: IGoogleMap, protected api: GoogleMapsApiService)
    {
        super();

        if (map) this.setContainingMap(map);
    }

    public getContainingMap(): IGoogleMap
    {
        return this.map;
    }

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
