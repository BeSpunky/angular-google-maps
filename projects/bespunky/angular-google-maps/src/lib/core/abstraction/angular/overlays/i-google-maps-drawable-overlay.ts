import { GoogleMap } from '../../../../google-map/google-map';
import { IGoogleMapsNativeObjectWrapper } from '../i-google-maps-native-object-wrapper';

export interface IGoogleMapsDrawableOverlay extends IGoogleMapsNativeObjectWrapper
{
    readonly containingMap: GoogleMap;

    addToMap(map: GoogleMap): void;
    removeFromMap(): void;
}
