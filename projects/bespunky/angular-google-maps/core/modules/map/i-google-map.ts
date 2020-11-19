import { IGoogleMapsNativeObjectEmittingWrapper } from '../../abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { WrappedNativeFunctions                 } from '../../abstraction/types/abstraction';
import { Coord, BoundsLike                      } from '../../abstraction/types/geometry.type';
import { ISuperpowers                           } from './superpowers/i-superpowers';

/** A type for the native functions of a map which should be wrapped. Used along with the extension interface for the wrapper.  */
export type WrappedGoogleMapFunctions = WrappedNativeFunctions<google.maps.Map, 'getMapTypeId' | 'setMapTypeId' | 'fitBounds' | 'panToBounds'>;

/**
 * Represents the functionality that a map wrapper should provide.
 *
 * @export
 * @interface IGoogleMap
 * @extends {IGoogleMapsNativeObjectEmittingWrapper<google.maps.Map>}
 * @extends {WrappedGoogleMapFunctions}
 */
export interface IGoogleMap extends IGoogleMapsNativeObjectEmittingWrapper<google.maps.Map>, WrappedGoogleMapFunctions
{
    /**
     * The superpowers charged for the current map instance.
     *
     * @type {ISuperpowers}
     */
    readonly superpowers: ISuperpowers;

    setCenter(center: Coord): void;

    /**
     * Calculates the bounds of the given element(s) and fits them all in the screen.
     *
     * @param {BoundsLike[]} elements The element(s) to fit.
     * @param {(number | google.maps.Padding)} [padding] (Optional) Padding to add to the calculated bounds.
     */
    fitBounds(elements: BoundsLike[], padding?: number | google.maps.Padding): void;
        
    /**
     * Calculates the bounds of the given element(s), then pans and zooms the map to fit them all in the screen.
     *
     * @param {BoundsLike[]} elements
     * @param {(number | google.maps.Padding)} [padding] (Optional) Padding to add to the calculated bounds.
     */
    panToBounds(elements: BoundsLike[], padding?: number | google.maps.Padding): void;
    
    panTo(position: Coord): void;
        
    getMapType(): string | google.maps.MapTypeId;
    
    setMapType(type: string | google.maps.MapTypeId): void;
}
