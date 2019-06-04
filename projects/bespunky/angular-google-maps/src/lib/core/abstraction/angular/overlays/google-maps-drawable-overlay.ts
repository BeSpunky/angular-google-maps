import { GoogleMap } from '../../../../google-map/google-map';
import { IGoogleMapsDrawableOverlay } from './i-google-maps-drawable-overlay';
import { IGoogleMapsNativeDrawableOverlay } from '../../native/overlays/i-google-maps-native-drawable-overlay';
import { GoogleMapsNativeObjectWrapper } from '../google-maps-native-object-wrapper';

export abstract class GoogleMapsDrawableOverlay extends GoogleMapsNativeObjectWrapper implements IGoogleMapsDrawableOverlay
{
    abstract readonly native: Promise<IGoogleMapsNativeDrawableOverlay>;

    constructor(protected map: GoogleMap)
    {
        super();

        if (map) this.addToMap(map);
    }

    public get containingMap(): GoogleMap
    {
        return this.map;
    }

    public addToMap(map: GoogleMap)
    {
        // Wait for the map object to create, then for the marker to create, then set the map to the marker
        map.native.then((nativeMap) => this.native.then(nativeMarker => nativeMarker.setMap(nativeMap)));

        this.map = map;
    }

    public removeFromMap()
    {
        this.native.then(nativeMarker => nativeMarker.setMap(null));

        this.map = null;
    }
}
