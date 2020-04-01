import { OverlayType } from '../core/abstraction/base/overlay-type.enum';
import { IGoogleMapsDrawableOverlay } from '../core/abstraction/base/i-google-maps-drawable-overlay';
import { IGoogleMapsMarker } from './marker/i-google-maps-marker';
import { IGoogleMapsData } from './data/i-google-maps-data';
import { IGoogleMapsNativeDrawableOverlay } from '../core/abstraction/native/i-google-maps-native-drawable-overlay';

export class OverlaysTracker
{
    public markers: IGoogleMapsMarker[] = [];
    public dataLayers: IGoogleMapsData[] = [];

    private map = {
        [OverlayType.Marker]: this.markers,
        [OverlayType.Data]: this.dataLayers
        // TODO: Add here any new supported overlay type collection
    };

    public add(overlay: IGoogleMapsDrawableOverlay<IGoogleMapsNativeDrawableOverlay>)
    {
        this.detectCollection(overlay).push(overlay);
    }

    public remove(overlay: IGoogleMapsDrawableOverlay<IGoogleMapsNativeDrawableOverlay>)
    {
        const collection = this.detectCollection(overlay);
        const index      = collection.indexOf(overlay);

        if (index > -1)
            collection.splice(index, 1);
    }

    private detectCollection(overlay: IGoogleMapsDrawableOverlay<IGoogleMapsNativeDrawableOverlay>): IGoogleMapsDrawableOverlay<IGoogleMapsNativeDrawableOverlay>[]
    {
        const collection = this.map[overlay.type];

        if (collection) return collection;

        throw new Error('Overlay type not supported by OverlayTracker.');
    }
}