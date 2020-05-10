import { IGoogleMapsNativeObjectEmittingWrapper } from '../../abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { IGoogleMapsNativeObject                } from '../../abstraction/native/i-google-maps-native-object';
import { ISuperpowers                           } from './superpowers/i-superpowers';

export interface IGoogleMap<TMap extends IGoogleMapsNativeObject = google.maps.Map> extends IGoogleMapsNativeObjectEmittingWrapper<TMap>
{
    readonly superpowers: ISuperpowers;
}
