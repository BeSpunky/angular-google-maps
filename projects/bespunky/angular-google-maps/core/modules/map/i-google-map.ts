import { IGoogleMapsNativeObjectEmittingWrapper } from '../../abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { WrappedNativeFunctions                 } from '../../abstraction/types/abstraction';
import { Coord, BoundsLike                      } from '../../abstraction/types/geometry.type';
import { ISuperpowers                           } from './superpowers/i-superpowers';

export type WrappedGoogleMapFunctions = WrappedNativeFunctions<google.maps.Map, 'getMapTypeId' | 'setMapTypeId' | 'fitBounds' | 'panToBounds'>;

export interface IGoogleMap extends IGoogleMapsNativeObjectEmittingWrapper<google.maps.Map>, WrappedGoogleMapFunctions
{
    readonly superpowers: ISuperpowers;

    setCenter(center: Coord): void;

    fitBounds(elements: BoundsLike[], padding?: number | google.maps.Padding): void;
        
    panToBounds(elements: BoundsLike[], padding?: number | google.maps.Padding): void;
    
    panTo(position: Coord): void;
        
    getMapType(): string | google.maps.MapTypeId;
    
    setMapType(type: string | google.maps.MapTypeId): void;
}
