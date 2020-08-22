import { IGoogleMapsNativeObjectEmittingWrapper } from '../../abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { Coord, BoundsLike                      } from '../../abstraction/types/geometry.type';
import { ISuperpowers                           } from './superpowers/i-superpowers';

export interface IGoogleMap extends IGoogleMapsNativeObjectEmittingWrapper<google.maps.Map>
{
    readonly superpowers: ISuperpowers;

    setCenter(center: Coord): void;

    fitBounds(elements: BoundsLike[], padding?: number | google.maps.Padding): void;
        
    panToBounds(elements: BoundsLike[], padding?: number | google.maps.Padding): void;
    
    panTo(position: Coord): void;
        
    getMapType(): string | google.maps.MapTypeId;
    
    setMapType(type: string | google.maps.MapTypeId): void;
}
