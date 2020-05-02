import { TestBed          } from '@angular/core/testing';
import { ElementRef       } from '@angular/core';
import { UniversalService } from '@bespunky/angular-zen';

import { configureGoogleMapsTestingModule                            } from '@bespunky/angular-google-maps/testing';
import { itShouldCreateWrapper                                       } from '@bespunky/angular-google-maps/core/testing';
import { WrapperFactory                                              } from '@bespunky/angular-google-maps/core';
import { GoogleMapWithOverlaysFactoryProvider, GoogleMapWithOverlays } from '@bespunky/angular-google-maps/overlays';

describe('GoogleMapWithOverlaysFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapWithOverlaysFactoryProvider, GoogleMapWithOverlays);

    it('should return null when used in non-browser platforms', async () =>
    {
        const element = new ElementRef({});

        await configureGoogleMapsTestingModule({
            customize: def =>
            {
                def.providers.push({ provide: UniversalService, useValue: new UniversalService('non-browser-dummy-id') });
                def.providers.push({ provide: ElementRef, useValue: element });
                def.providers.push(GoogleMapWithOverlaysFactoryProvider);
            }
        });

        const createWrapper = TestBed.inject(WrapperFactory);

        expect(createWrapper(element)).toBeNull();
    });
});