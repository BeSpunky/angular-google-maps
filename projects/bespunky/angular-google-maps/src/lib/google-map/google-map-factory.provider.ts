import { ElementRef, FactoryProvider } from '@angular/core';
import { DocumentRef, UniversalService } from '@bespunky/angular-zen';

import { WrapperFactory } from '../core/abstraction/tokens/wrapper-factory.token';
import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { GoogleMap } from './google-map';

export function NativeMapWrapperFactoryProvider(api: GoogleMapsApiService, element: ElementRef, documentRef: DocumentRef, universal: UniversalService)
{    
    return function NativeMapWrapperFactory(options?: google.maps.MapOptions)
    {
        if (!universal.isPlatformBrowser) return null; // TODO: Test with Angular Universal app and see if this doesn't break the chain of contained directives

        // Create a container div for the map
        const mapElement = documentRef.nativeDocument.createElement('div');
        // Mark it with a class for external css styling
        mapElement.className = 'google-map';
        
        // Add it to the current component template
        element.nativeElement.appendChild(mapElement);

        return new GoogleMap(api, new ElementRef(mapElement), options);
    };
}

export const GoogleMapFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeMapWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, ElementRef, DocumentRef, UniversalService]
}