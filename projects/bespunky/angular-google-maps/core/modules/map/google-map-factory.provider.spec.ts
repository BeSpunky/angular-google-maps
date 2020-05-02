import { ElementRef } from '@angular/core';

import { GoogleMapFactoryProvider } from './google-map-factory.provider';
import { GoogleMap } from './google-map';
import { itShouldCreateWrapper } from '../overlays/testing/wrapper-factory-provider-test-setup.spec';
import { configureGoogleMapsTestingModule } from '../../testing/helpers/setup.spec';
import { TestBed } from '@angular/core/testing';
import { UniversalService } from '@bespunky/angular-zen';
import { WrapperFactory } from '../core/abstraction/tokens/wrapper-factory.token';

describe('GoogleMapFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapFactoryProvider, GoogleMap);

    it('should return null when used in non-browser platforms', async () =>
    {
        await configureGoogleMapsTestingModule({
            customize: def =>
            {
                def.providers.push({ provide: UniversalService, useValue: new UniversalService('non-browser-dummy-id') });
                def.providers.push({ provide: ElementRef, useValue: new ElementRef({}) });
                def.providers.push(GoogleMapFactoryProvider);
            }
        });

        const createWrapper = TestBed.inject(WrapperFactory);

        expect(createWrapper()).toBeNull();
    });
});