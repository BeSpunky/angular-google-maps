import { ElementRef } from '@angular/core';

import { GoogleMapsNativeObjectEmittingWrapper } from '../../abstraction/base/google-maps-native-object-emitting-wrapper';
import { WrappedNativeFunctions                } from '../../abstraction/types/abstraction';
import { Coord, BoundsLike                     } from '../../abstraction/types/geometry.type';
import { NativeObjectWrapper                   } from '../../decorators/native-object-wrapper.decorator';
import { OutsideAngular                        } from '../../decorators/outside-angular.decorator';
import { Delegation                            } from '../../decorators/wrapper-definition';
import { GoogleMapsApiService                  } from '../../api/google-maps-api.service';
import { ISuperpowers                          } from './superpowers/i-superpowers';
import { Defaults                              } from './types/defaults';
import { IGoogleMap                            } from './i-google-map';

export type WrappedGoogleMapFunctions = WrappedNativeFunctions<google.maps.Map, 'getMapTypeId' | 'setMapTypeId' | 'fitBounds' | 'panToBounds'>;

export interface GoogleMap extends WrappedGoogleMapFunctions { }

// @dynamic
@NativeObjectWrapper<google.maps.Map, GoogleMap>({
    panBy: Delegation.OutsideAngular
})
export class GoogleMap extends GoogleMapsNativeObjectEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    constructor(
        /** The superpowers loaded for this map instance. Any lazy loaded superpowers will automatically load here as well. */
        public readonly superpowers: ISuperpowers,
        protected api: GoogleMapsApiService,
        mapElement: ElementRef,
        options?: google.maps.MapOptions
    )
    {
        super(api, mapElement, options);

        superpowers.attachToMap(this);
    }

    protected createNativeObject(mapElement: ElementRef, options?: google.maps.MapOptions): google.maps.Map
    {
        options = Object.assign({}, {
            center: Defaults.Center,
            zoom  : Defaults.ZoomLevel,
        }, options);
        
        return new google.maps.Map(mapElement.nativeElement, options);
    }

    @OutsideAngular
    public setCenter(center: Coord)
    {
        this.native.setCenter(this.api.geometry.toLiteralCoord(center));
    }

    @OutsideAngular
    public fitBounds(...elements: BoundsLike[]): void
    {
        this.fitBoundsWithPadding(0, ...elements);
    }

    @OutsideAngular
    public fitBoundsWithPadding(padding: number | google.maps.Padding, ...elements: BoundsLike[]): void
    {
        this.native.fitBounds(this.api.geometry.defineBounds(...elements), padding);
    }
    
    @OutsideAngular
    public panTo(position: Coord): void
    {
        this.native.panTo(this.api.geometry.toLiteralCoord(position));
    }
    
    @OutsideAngular
    public panToBounds(...elements: BoundsLike[]): void
    {
        this.panToBoundsWithPadding(0, ...elements);
    }
  
    @OutsideAngular
    public panToBoundsWithPadding(padding: number | google.maps.Padding, ...elements: BoundsLike[]): void
    {
        this.native.panToBounds(this.api.geometry.defineBounds(...elements), padding);
    }
    
    public getMapType(): string | google.maps.MapTypeId { return this.native.getMapTypeId(); }

    @OutsideAngular
    public setMapType(type: string | google.maps.MapTypeId): void { this.native.setMapTypeId(type); }
}
