import { ElementRef } from '@angular/core';

import { GoogleMapsNativeObjectEmittingWrapper } from '../../abstraction/base/google-maps-native-object-emitting-wrapper';
import { WrappedNativeFunctions                } from '../../abstraction/types/abstraction';
import { NativeObjectWrapper                   } from '../../decorators/native-object-wrapper.decorator';
import { OutsideAngular                        } from '../../decorators/outside-angular.decorator';
import { Delegation                            } from '../../decorators/wrapper-definition';
import { GoogleMapsApiService                  } from '../../api/google-maps-api.service';
import { ISuperpowers                          } from './superpowers/i-superpowers';
import { Defaults                              } from './types/defaults';
import { IGoogleMap                            } from './i-google-map';

export type WrappedGoogleMapFunctions = WrappedNativeFunctions<google.maps.Map, 'getMapTypeId' | 'setMapTypeId'>;

export interface GoogleMap extends WrappedGoogleMapFunctions { }

// @dynamic
@NativeObjectWrapper<google.maps.Map, GoogleMap>({
    panBy: Delegation.OutsideAngular
})
export class GoogleMap extends GoogleMapsNativeObjectEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    constructor(public readonly superpowers: ISuperpowers, protected api: GoogleMapsApiService, mapElement: ElementRef, options?: google.maps.MapOptions)
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

    // TODO:
    // 1. Implement facilitating transformations for fitBounts, panTo, panToBounds
    // 2. Add declarations for upgraded signatures to IGoogleMap

    @OutsideAngular
    fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void { this.native.fitBounds(bounds, padding); }
    
    @OutsideAngular
    panTo(position: google.maps.LatLng | google.maps.LatLngLiteral): void { this.native.panTo(position); }
    
    @OutsideAngular
    panToBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void { this.native.panToBounds(bounds, padding); }
    
    getMapType(): string | google.maps.MapTypeId { return this.native.getMapTypeId(); }

    @OutsideAngular
    setMapType(type: string | google.maps.MapTypeId): void { this.native.setMapTypeId(type); }
}
