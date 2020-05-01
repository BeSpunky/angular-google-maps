import { ElementRef, FactoryProvider } from '@angular/core';
import { DocumentRef      } from '@bespunky/angular-zen/core';
import { UniversalService } from '@bespunky/angular-zen/universal';

import { createAndAppendMapElement } from '@bespunky/angular-google-maps/_internal'
import { WrapperFactory } from '../../abstraction/tokens/wrapper-factory.token';
import { GoogleMapsApiService } from '../../api/google-maps-api.service';
import { GoogleMap } from './google-map';

export function NativeMapWrapperFactoryProvider(api: GoogleMapsApiService, document: DocumentRef, universal: UniversalService): (element: ElementRef, options?: google.maps.MapOptions) => GoogleMap
{    
    return function NativeMapWrapperFactory(element: ElementRef, options?: google.maps.MapOptions): GoogleMap
    {
        const mapElement = createAndAppendMapElement(element, document, universal);

        return new GoogleMap(api, new ElementRef(mapElement), options);
    };
}

export const GoogleMapFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeMapWrapperFactoryProvider,
    deps      : [GoogleMapsApiService, DocumentRef, UniversalService]
}