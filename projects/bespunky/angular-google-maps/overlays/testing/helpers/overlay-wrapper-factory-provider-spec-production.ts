import { FactoryProvider, Type } from '@angular/core';

import { produceWrapperFactoryProviderSpecs, WrapperProviderTestConfig } from '@bespunky/angular-google-maps/core/testing';
import { Wrapper                                                       } from '@bespunky/angular-google-maps/core';
import { MockNativeDrawableOverlay                                     } from '../mocks/mock-native-drawable-overlay';
import { setupOverlayWrapperFactoryProviderTest                        } from './overlay-wrapper-factory-provider-test-setup';

export function produceOverlayWrapperFactoryProviderSpecs(providerName: string, provider: FactoryProvider, expectedWrapperType: Type<Wrapper>, ...providers: any[])
{
    const mockNativeOverlay = new MockNativeDrawableOverlay();

    describe(providerName, () =>
    {
        let producedOverlay: any;
    
        async function setup(platform: any)
        {
            const config: WrapperProviderTestConfig = { platform, native: mockNativeOverlay, providers };
            
            ({ producedValue: producedOverlay } = await setupOverlayWrapperFactoryProviderTest(provider, config));
        }
    
        produceWrapperFactoryProviderSpecs(setup, () => provider, () => producedOverlay, expectedWrapperType, mockNativeOverlay);
    });
}