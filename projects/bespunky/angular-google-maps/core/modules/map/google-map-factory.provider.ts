import { ElementRef, FactoryProvider } from '@angular/core';
import { DocumentRef                 } from '@bespunky/angular-zen/core';
import { UniversalService            } from '@bespunky/angular-zen/universal';

import { createAndAppendMapElement } from '@bespunky/angular-google-maps/_internal'
import { WrapperFactory            } from '../../abstraction/tokens/wrapper-factory.token';
import { GoogleMapsApiService      } from '../../api/google-maps-api.service';
import { SuperpowersService        } from './superpowers/superpowers.service';
import { GoogleMap                 } from './google-map';

/**
 * Produces a factory that can be used to create a new map wrapper.
 *
 * @export
 * @param {SuperpowersService} superpowers The instance of the superpowers management service for the new map.
 * @param {GoogleMapsApiService} api The instance of the api service.
 * @param {DocumentRef} document The reference to the native document.
 * @param {UniversalService} universal The instance of the universal service.
 * @returns {(element: ElementRef, options?: google.maps.MapOptions) => GoogleMap} A factory function to use for creating a new map wrapper over the specified element.
 */
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

/** Provides the factory used to create a map wrapper for the `WrapperFactory` token. */
export const GoogleMapFactoryProvider: FactoryProvider = {
    provide   : WrapperFactory,
    useFactory: NativeMapWrapperFactoryProvider,
    deps      : [SuperpowersService, GoogleMapsApiService, DocumentRef, UniversalService]
}