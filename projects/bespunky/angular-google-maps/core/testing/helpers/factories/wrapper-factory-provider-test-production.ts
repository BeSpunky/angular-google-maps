import { FactoryProvider, Type } from '@angular/core';

import { Native, Wrapper                                                           } from '@bespunky/angular-google-maps/core';
import { setupWrapperFactoryProviderTest, WrapperProviderTestConfig                } from './setup/wrappers/wrapper-factory-provider-test-setup';
import { produceWrapperFactoryProviderSpecs, AdditionalWrapperFactoryProviderSpecs } from './specs/wrapper-factory-provider-spec-production';

type SetupFn = (provider: FactoryProvider, config: WrapperProviderTestConfig) => Promise<{ producedValue: any }>;

/**
 * The configuration for a wrapper factory provider test.
 *
 * @export
 * @interface WrapperFactoryProviderTest
 */
export interface WrapperFactoryProviderTest
{
    /** The name of the provider being tested. This will be shown in the test spec. */
    providerName       : string;
    /** The provider being tested. */
    provider           : FactoryProvider;
    /** The function that will setup the testing environment. */
    setup              : SetupFn;
    /** The type of the wrapper object expected to be produced by the factory. */
    expectedWrapperType: Type<Wrapper>;
    /**
     * (Optional) The value that will be returned by the **simulated** `produceValue` function passed
     * to the generator function. Meaning, when the factory returns, this will be the value it produces.
     */
    mockNative         : Native;
    /** (Optional) Any providers needed for the test in addition to the ones created by setup function. */
    providers?         : any[];
    /** (Optional) Additional specs that should be run after the automated specs provided by `produceBrowserWrapperFactoryProviderSpecs()` and `produceNonBrowserWrapperFactoryProviderSpecs()`. */
    additionalSpecs?   : AdditionalWrapperFactoryProviderSpecs;
}

/**
 * Performs setup and spec production for wrapper factory providers.
 * 
 * How:
 * Creates a testing section with the provider name using `describe()`, sets up the testing environment using the provided setup function
 * and produces native factory provider specs using the `produceWrapperFactoryProviderSpecs()` function.
 *
 * @export
 * @param {WrapperFactoryProviderTest} config The configuration for the test.
 */
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

/**
 * Performs setup and spec production for wrapper factory providers using the default `setupWrapperFactoryProviderTest()` as a setup function.
 * 
 * How:
 * Creates a testing section with the provider name using `describe()`, sets up the testing environment using the default setup function
 * and produces wrapper factory provider specs using the `produceWrapperFactoryProviderSpecs()` function.
 *
 * @export
 * @param {Omit<WrapperFactoryProviderTest, 'setup'>} testConfig The configuration for the test.
 */
export function testWrapperFactoryProvider(testConfig: Omit<WrapperFactoryProviderTest, 'setup'>)
{
    const config = { ...testConfig, setup: setupWrapperFactoryProviderTest };

    testWrapperFactoryProviderCore(config);
}