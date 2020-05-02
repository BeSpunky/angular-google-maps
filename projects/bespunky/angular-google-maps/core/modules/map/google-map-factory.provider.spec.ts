import { TestBed          } from '@angular/core/testing';
import { ElementRef       } from '@angular/core';
import { UniversalService } from '@bespunky/angular-zen';

import { configureGoogleMapsTestingModule, itShouldCreateWrapper } from '@bespunky/angular-google-maps/core/testing';
import { WrapperFactory, GoogleMapFactoryProvider, GoogleMap     } from '@bespunky/angular-google-maps/core';

describe('GoogleMapFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapFactoryProvider, GoogleMap);

    it('should return null when used in non-browser platforms', async () =>
    {
        const element = new ElementRef({});

        await configureGoogleMapsTestingModule({
            customize: def =>
            {
                def.providers.push({ provide: UniversalService, useValue: new UniversalService('non-browser-dummy-id') });
                def.providers.push({ provide: ElementRef, useValue: element });
                def.providers.push(GoogleMapFactoryProvider);
            }
        });

        const createWrapper = TestBed.inject(WrapperFactory);

        expect(createWrapper(element)).toBeNull();
    });
});