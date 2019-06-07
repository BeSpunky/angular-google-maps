import { IGoogleMapsNativeObjectWrapper } from '../i-google-maps-native-object-wrapper';
import { IGoogleMap } from '../../../../google-map/i-google-map';

export interface IGoogleMapsDrawableOverlay extends IGoogleMapsNativeObjectWrapper
{
    readonly containingMap: IGoogleMap;

    addToMap(map: IGoogleMap): void;
    removeFromMap(): void;
}
