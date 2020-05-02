import { ElementRef } from '@angular/core';

import { GoogleMapsNativeObjectEmittingWrapper } from '../../abstraction/base/google-maps-native-object-emitting-wrapper';
import { NativeObjectWrapper                   } from '../../decorators/native-object-wrapper.decorator';
import { Wrap                                  } from '../../decorators/wrap.decorator';
import { OutsideAngular                        } from '../../decorators/outside-angular.decorator';
import { GoogleMapsApiService                  } from '../../api/google-maps-api.service';
import { Defaults                              } from './types/defaults';
import { ZoomLevel                             } from './types/zoom-level.enum';
import { IGoogleMap                            } from './i-google-map';

// @dynamic
@NativeObjectWrapper
export class GoogleMap extends GoogleMapsNativeObjectEmittingWrapper<google.maps.Map> implements IGoogleMap
{
    constructor(protected api: GoogleMapsApiService, mapElement: ElementRef, options?: google.maps.MapOptions)
    {
        super(api, mapElement, options);
    }

    protected createNativeObject(mapElement: ElementRef, options?: google.maps.MapOptions): google.maps.Map
    {
        options = Object.assign({}, {
            center: Defaults.Center,
            zoom  : Defaults.ZoomLevel,
        }, options);

        return new google.maps.Map(mapElement.nativeElement, options);
    }

    // TODO: Implement facilitating transformations for fitBounts, panTo, panToBounds
    @Wrap() @OutsideAngular
    fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void { }
    
    @Wrap() @OutsideAngular
    panTo(position: google.maps.LatLng | google.maps.LatLngLiteral): void { }
    
    @Wrap() @OutsideAngular
    panToBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding):void { }
    

    @Wrap() @OutsideAngular
    panBy(x: number, y: number): void { }

    @Wrap() @OutsideAngular
    setOptions(options: google.maps.MapOptions): void { }

    @Wrap()
    getBounds(): google.maps.LatLngBounds { return void 0; }

    @Wrap()
    getCenter(): google.maps.LatLng { return void 0; }

    @Wrap() @OutsideAngular
    setCenter(latLng: google.maps.LatLng | google.maps.LatLngLiteral): void { }

    @Wrap()
    getClickableIcons(): boolean { return void 0; }

    @Wrap() @OutsideAngular
    setClickableIcons(clickable: boolean): void { }

    @Wrap()
    getHeading(): number { return void 0; }

    @Wrap() @OutsideAngular
    setHeading(heading: number): void { }

    @Wrap('getMapTypeId')
    getMapType(): string | google.maps.MapTypeId { return void 0; }

    @Wrap('setMapTypeId') @OutsideAngular
    setMapType(type: string | google.maps.MapTypeId): void { }

    @Wrap()
    getProjection(): google.maps.Projection { return void 0; }

    @Wrap()
    getStreetView(): google.maps.StreetViewPanorama { return void 0; }

    @Wrap() @OutsideAngular
    setStreetView(panorama: google.maps.StreetViewPanorama): void { }

    @Wrap()
    getTilt(): number { return void 0; }

    @Wrap() @OutsideAngular
    setTilt(tilt: number): void { }

    @Wrap()
    getZoom(): number { return void 0; }

    @Wrap() @OutsideAngular
    setZoom(zoomLevel: ZoomLevel | number): void { }
}
