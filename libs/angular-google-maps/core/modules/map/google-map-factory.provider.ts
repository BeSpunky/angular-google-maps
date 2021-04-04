import { ElementRef  } from '@angular/core';
import { DocumentRef } from '@bespunky/angular-zen/core';

import { createAndAppendMapElement    } from '@bespunky/angular-google-maps/_internal'
import { createNativeFactoryProvider  } from '../../abstraction/factories/natives';
import { createWrapperFactoryProvider } from '../../abstraction/factories/wrappers';
import { SuperpowersService           } from './superpowers/superpowers.service';
import { Defaults                     } from './types/defaults';
import { GoogleMap                    } from './google-map';

/** Provides the factory used to create a native map object for the `NativeInstance` token. */
export const NativeGoogleMapFactoryProvider = createNativeFactoryProvider((element, document: DocumentRef) =>
{
    const { nativeElement: mapElement } = createAndAppendMapElement(element, document);

    const options: google.maps.MapOptions = {
        center: Defaults.Center,
        zoom  : Defaults.ZoomLevel
    };

    return new google.maps.Map(mapElement, options);
}, { deps: [ElementRef, DocumentRef] });

/** Provides the factory used to create a map wrapper for the `WrapperInstance` token. */
export const GoogleMapFactoryProvider = createWrapperFactoryProvider<GoogleMap>((api, native, superpowers: SuperpowersService) =>
{
    return new GoogleMap(superpowers, api, native);
}, { deps: [SuperpowersService] });