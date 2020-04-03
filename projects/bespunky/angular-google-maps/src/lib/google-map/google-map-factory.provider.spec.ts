import { ElementRef } from '@angular/core';

import { GoogleMapFactoryProvider } from './google-map-factory.provider';
import { GoogleMap } from './google-map';
import { itShouldCreateWrapper } from '../overlays/testing/wrapper-factory-provider-test-setup.spec';

describe('GoogleMapFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapFactoryProvider, GoogleMap, {
        provide: ElementRef,
        useValue: new ElementRef(document.createElement('div'))
    });
});