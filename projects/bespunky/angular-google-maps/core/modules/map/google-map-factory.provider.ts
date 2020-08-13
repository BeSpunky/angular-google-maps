import { ElementRef, FactoryProvider } from '@angular/core';
import { DocumentRef                 } from '@bespunky/angular-zen/core';
import { UniversalService            } from '@bespunky/angular-zen/universal';

import { createAndAppendMapElement } from '@bespunky/angular-google-maps/_internal'
import { WrapperFactory            } from '../../abstraction/tokens/wrapper-factory.token';
import { GoogleMapsApiService      } from '../../api/google-maps-api.service';
import { SuperpowersService        } from './superpowers/superpowers.service';
import { GoogleMap                 } from './google-map';

export function NativeMapWrapperFactoryProvider(superpowers: SuperpowersService, api: GoogleMapsApiService, document: DocumentRef, universal: UniversalService): (element: ElementRef, options?: google.maps.MapOptions) => GoogleMap
{
    if (universal.isPlatformBrowser)
        return function NativeMapWithOverlaysWrapperFactory(element: ElementRef, options?: google.maps.MapOptions): GoogleMap
        {
            const mapElement = createAndAppendMapElement(element, document);

            return new GoogleMap(superpowers, api, mapElement, options);
        };
    
    // TODO: Test with Angular Universal app and see if this doesn't break the chain of contained directives
    return function NullNativeMapWrapperFactory() { return null; };
}

export const GoogleMapFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeMapWrapperFactoryProvider,
    deps      : [SuperpowersService, GoogleMapsApiService, DocumentRef, UniversalService]
}