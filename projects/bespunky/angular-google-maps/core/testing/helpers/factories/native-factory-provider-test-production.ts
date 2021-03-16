import { ElementRef, FactoryProvider, Type } from '@angular/core';

import { Native                                                                  } from '@bespunky/angular-google-maps/core';
import { setupNativeFactoryProviderTest, NativeProviderTestConfig                } from './setup/natives/native-factory-provider-test-setup';
import { produceNativeFactoryProviderSpecs, AdditionalNativeFactoryProviderSpecs } from './specs/native-factory-provider-spec-production';

type SetupFn = (provider: FactoryProvider, config: NativeProviderTestConfig) => Promise<{ producedValue: any, runOutsideAngular: jasmine.Spy }>;

export interface NativeFactoryProviderTest
{
    providerName      : string;
    provider          : FactoryProvider;
    setup             : SetupFn;
    expectedNativeType: Type<Native>;
    element?          : ElementRef;
    providers?        : any[],
    additionalSpecs?  : AdditionalNativeFactoryProviderSpecs
}

export function testNativeFactoryProviderCore({providerName, provider, setup, expectedNativeType, providers, element, additionalSpecs }: NativeFactoryProviderTest)
{
    describe(providerName, () =>
    {
        let producedNative   : any;
        let runOutsideAngular: jasmine.Spy;
    
        async function runSetup(platform: any)
        {
            const config: NativeProviderTestConfig = { platform, providers, element };
            
            ({ producedValue: producedNative, runOutsideAngular } = await setup(provider, config));
        }
    
        produceNativeFactoryProviderSpecs(runSetup, () => provider, () => producedNative, () => runOutsideAngular, expectedNativeType, additionalSpecs);
    });
}

export function testNativeFactoryProvider(testConfig: Omit<NativeFactoryProviderTest, 'setup'>)
{
    const config = { ...testConfig, setup: setupNativeFactoryProviderTest };

    testNativeFactoryProviderCore(config);
}