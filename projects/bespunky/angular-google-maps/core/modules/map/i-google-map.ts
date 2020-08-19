import { IGoogleMapsNativeObjectEmittingWrapper } from '../../abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { Coord, BoundsLike                      } from '../../abstraction/types/geometry.type';
import { ISuperpowers                           } from './superpowers/i-superpowers';

export interface IGoogleMap extends IGoogleMapsNativeObjectEmittingWrapper<google.maps.Map>
{
    readonly superpowers: ISuperpowers;

    setCenter(center: Coord): void;

    fitBounds(...elements: BoundsLike[]): void;
    
    fitBoundsWithPadding(padding: number | google.maps.Padding, ...elements: BoundsLike[]): void;
    
    panTo(position: Coord): void;
    
    panToBounds(...elements: BoundsLike[]): void;
    
    panToBoundsWithPadding(padding: number | google.maps.Padding, ...elements: BoundsLike[]): void;
    
    getMapType(): string | google.maps.MapTypeId;
    
    setMapType(type: string | google.maps.MapTypeId): void;
}
