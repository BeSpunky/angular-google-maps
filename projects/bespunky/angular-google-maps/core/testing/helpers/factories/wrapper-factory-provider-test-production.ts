import { FactoryProvider, Type } from '@angular/core';

import { Native, Wrapper                                                           } from '@bespunky/angular-google-maps/core';
import { setupWrapperFactoryProviderTest, WrapperProviderTestConfig                } from './setup/wrappers/wrapper-factory-provider-test-setup';
import { produceWrapperFactoryProviderSpecs, AdditionalWrapperFactoryProviderSpecs } from './specs/wrapper-factory-provider-spec-production';

type SetupFn = (provider: FactoryProvider, config: WrapperProviderTestConfig) => Promise<{ producedValue: any }>;

export interface WrapperFactoryProviderTest
{
    providerName       : string;
    provider           : FactoryProvider;
    setup              : SetupFn;
    expectedWrapperType: Type<Wrapper>;
    mockNative         : Native;
    providers?         : any[];
    additionalSpecs?   : AdditionalWrapperFactoryProviderSpecs;
}

export function testWrapperFactoryProviderCore({providerName, provider, setup, expectedWrapperType, mockNative, providers, additionalSpecs }: WrapperFactoryProviderTest)
{
    describe(providerName, () =>
    {
        let producedWrapper: any;
    
        async function runSetup(platform: any)
        {
            const config: WrapperProviderTestConfig = { platform, native: mockNative, providers };
            
            ({ producedValue: producedWrapper } = await setup(provider, config));
        }
    
        produceWrapperFactoryProviderSpecs(runSetup, () => provider, () => producedWrapper, expectedWrapperType, mockNative, additionalSpecs);
    });
}

export function testWrapperFactoryProvider(testConfig: Omit<WrapperFactoryProviderTest, 'setup'>)
{
    const config = { ...testConfig, setup: setupWrapperFactoryProviderTest };

    testWrapperFactoryProviderCore(config);
}