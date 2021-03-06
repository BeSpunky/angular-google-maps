import { GoogleMapsNativeObjectEmittingWrapper } from '../../abstraction/base/google-maps-native-object-emitting-wrapper';
import { Coord, BoundsLike                     } from '../../abstraction/types/geometry.type';
import { NativeObjectWrapper                   } from '../../decorators/native-object-wrapper.decorator';
import { OutsideAngular                        } from '../../decorators/outside-angular.decorator';
import { Delegation                            } from '../../decorators/wrapper-definition';
import { GoogleMapsApiService                  } from '../../api/google-maps-api.service';
import { ISuperpowers                          } from './superpowers/i-superpowers';
import { IGoogleMap, WrappedGoogleMapFunctions } from './i-google-map';

/** Extends intellisense for `GoogleMapsMap` with native map functions. */
export interface GoogleMap extends WrappedGoogleMapFunctions { }

/**
 * The angular-ready wrapper for the native `google.maps.Map` class.
 *
 * @export
 * @class GoogleMap
 * @extends {GoogleMapsNativeObjectEmittingWrapper<google.maps.Map>}
 * @implements {IGoogleMap}
 */
// @dynamic
@NativeObjectWrapper<GoogleMap>({
    panBy: Delegation.OutsideAngular
})
export class GoogleMap extends GoogleMapsNativeObjectEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    constructor(
        /** The superpowers loaded for this map instance. Any lazy loaded superpowers will automatically load here as well. */
        public readonly superpowers: ISuperpowers,
                        api        : GoogleMapsApiService,
                        native     : google.maps.Map
    )
    {
        super(api, native);

        superpowers.attachToMap(this);
    }

    @OutsideAngular
    public setCenter(center: Coord)
    {
        this.native.setCenter(this.api.geometry.toLiteralCoord(center));
    }

    @OutsideAngular
    public fitBounds(elements: BoundsLike[], padding?: number | google.maps.Padding): void
    {
        this.native.fitBounds(this.api.geometry.defineBounds(...elements), padding);
    }
    
    @OutsideAngular
    public panToBounds(elements: BoundsLike[], padding?: number | google.maps.Padding): void
    {
        this.native.panToBounds(this.api.geometry.defineBounds(...elements), padding);
    }
    
    @OutsideAngular
    public panTo(position: Coord): void
    {
        this.native.panTo(this.api.geometry.toLiteralCoord(position));
    }
    
    public getMapType(): string | google.maps.MapTypeId { return this.native.getMapTypeId(); }

    @OutsideAngular
    public setMapType(type: string | google.maps.MapTypeId): void { this.native.setMapTypeId(type); }
}
