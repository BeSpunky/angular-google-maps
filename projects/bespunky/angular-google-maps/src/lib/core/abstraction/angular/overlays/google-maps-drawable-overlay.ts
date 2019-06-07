import { GoogleMap } from '../../../../google-map/google-map';
import { IGoogleMapsDrawableOverlay } from './i-google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../../native/overlays/i-google-maps-native-drawable-overlay';
import { GoogleMapsNativeObjectWrapper } from '../google-maps-native-object-wrapper';
import { IGoogleMap } from '../../../../google-map/i-google-map';

export abstract class GoogleMapsDrawableOverlay extends GoogleMapsNativeObjectWrapper implements IGoogleMapsDrawableOverlay
{
    abstract readonly native: Promise<IGoogleMapsNativeDrawableOverlay>;

    constructor(protected map: IGoogleMap)
    {
        super();

        if (map) this.addToMap(map);
    }

    public get containingMap(): IGoogleMap
    {
        return this.map;
    }

    public addToMap(map: IGoogleMap)
    {
        // Wait for the map object to create, then for the drawable to create, then set the map to the drawable
        map.native.then((nativeMap) => this.native.then(nativeDrawable => nativeDrawable.setMap(nativeMap)));

        this.map = map;
    }

    public removeFromMap()
    {
        this.native.then(nativeDrawable => nativeDrawable.setMap(null));

        this.map = null;
    }
}
