import { ElementRef, FactoryProvider   } from '@angular/core';
import { DocumentRef, UniversalService } from '@bespunky/angular-zen';

import { createAndAppendMapElement                       } from '@bespunky/angular-google-maps/_internal';
import { GoogleMapsApiService, WrapperFactory, GoogleMap } from '@bespunky/angular-google-maps/core';
import { GoogleMapWithOverlays } from './google-map-with-overlays';

export function NativeMapWithOverlaysWrapperFactoryProvider(api: GoogleMapsApiService, document: DocumentRef, universal: UniversalService): (element: ElementRef, options?: google.maps.MapOptions) => GoogleMap
{    
    if (universal.isPlatformBrowser)
        return function NativeMapWithOverlaysWrapperFactory(element: ElementRef, options?: google.maps.MapOptions): GoogleMap
        {
            const mapElement = createAndAppendMapElement(element, document);

            return new GoogleMapWithOverlays(api, mapElement, options);
        };
    
    // TODO: Test with Angular Universal app and see if this doesn't break the chain of contained directives
    return function NullNativeMapWrapperFactory() { return null; };
}

export const GoogleMapWithOverlaysFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeMapWithOverlaysWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, DocumentRef, UniversalService]
}