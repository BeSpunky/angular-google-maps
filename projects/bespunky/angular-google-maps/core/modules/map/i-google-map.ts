import { IGoogleMapsNativeObjectEmittingWrapper } from '../../abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { Coord                                  } from '../../abstraction/types/geometry.type';
import { ISuperpowers                           } from './superpowers/i-superpowers';

export interface IGoogleMap extends IGoogleMapsNativeObjectEmittingWrapper<google.maps.Map>
{
    readonly superpowers: ISuperpowers;

    setCenter(center: Coord): void;
}
