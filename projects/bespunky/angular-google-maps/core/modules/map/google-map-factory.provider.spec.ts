import { TestBed          } from '@angular/core/testing';
import { ElementRef       } from '@angular/core';
import { UniversalService } from '@bespunky/angular-zen/universal';

import { configureGoogleMapsTestingModule                                                                        } from '@bespunky/angular-google-maps/testing';
import { itShouldCreateWrapper                                                                                   } from '@bespunky/angular-google-maps/core/testing';
import { WrapperInstance, GoogleMapFactoryProvider, GoogleMap, SuperpowersService, NativeGoogleMapFactoryProvider } from '@bespunky/angular-google-maps/core';

describe('GoogleMapFactoryProvider', () =>
{
    itShouldCreateWrapper(GoogleMapFactoryProvider, GoogleMap, SuperpowersService, NativeGoogleMapFactoryProvider);

    it('should return null when used in non-browser platforms', async () =>
    {
        const element = new ElementRef({});

        await configureGoogleMapsTestingModule({
            customize: def => def.providers = [
                { provide: UniversalService, useValue: new UniversalService('non-browser-dummy-id') },
                { provide: ElementRef, useValue: element },
                SuperpowersService,
                NativeGoogleMapFactoryProvider,
                GoogleMapFactoryProvider
            ]
        });

        const wrapper = TestBed.inject(WrapperInstance);

        expect(wrapper).toBeNull();
    });
});