import { ElementRef, FactoryProvider } from '@angular/core';

import { WrapperFactory } from '../core/abstraction/tokens/wrapper-factory.token';
import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { GoogleMap } from './google-map';

export function NativeMapWrapperFactoryProvider(api: GoogleMapsApiService, element: ElementRef)
{    
    return function NativeMapWrapperFactory(options?: google.maps.MapOptions)
    {
        const mapElement = (element.nativeElement as HTMLElement).querySelector('.google-map');
    
        if (!mapElement) throw new Error('[NativeMaprWrapperFactory] Map element not found in template. Did you add a div.google-map element?');

        return new GoogleMap(api, new ElementRef(mapElement), options);
    };
}

export const GoogleMapFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeMapWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, ElementRef]
}