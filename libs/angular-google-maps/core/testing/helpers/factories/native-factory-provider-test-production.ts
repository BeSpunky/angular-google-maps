import { ElementRef, FactoryProvider, InjectionToken, Type } from '@angular/core';

import { Native, NativeInstance                                                                  } from '@bespunky/angular-google-maps/core';
import { setupNativeFactoryProviderTest, NativeProviderTestConfig                } from './setup/natives/native-factory-provider-test-setup';
import { produceNativeFactoryProviderSpecs, AdditionalNativeFactoryProviderSpecs } from './specs/native-factory-provider-spec-production';

type SetupFn = (provider: FactoryProvider, config: NativeProviderTestConfig) => Promise<{ producedValue: any, runOutsideAngular: jest.SpyInstance }>;

/**
 * The configuration for a native factory provider test.
 *
 * @export
 * @interface NativeFactoryProviderTest
 */
export interface NativeFactoryProviderTest
{
    /** The name of the provider being tested. This will be shown in the test spec. */
    providerName      : string;
    /** The provider being tested. */
    provider          : FactoryProvider;
    /** The function that will setup the testing environment. */
    setup             : SetupFn;
    expectedToken?    : InjectionToken<Native>;
    /** The type of the native object expected to be produced by the factory. */
    expectedNativeType: Type<Native>;
    /**
     * (Optional) The element to use when providing injecting `ElementRef`. Default is `new ElementRef({})`.
     * Define a value for this when you need to either:
     * - Make sure the element that was used by the factory is the one you provided.
     * - Use the element in a test to dig up some information.
     */
    element?          : ElementRef;
    /** (Optional) Any providers needed for the test in addition to the ones created by setup function. */
    providers?        : any[],
    /** (Optional) Additional specs that should be run after the automated specs provided by `produceBrowserNativeFactoryProviderSpecs()` and `produceNonBrowserNativeFactoryProviderSpecs()`. */
    additionalSpecs?  : AdditionalNativeFactoryProviderSpecs
}

/**
 * Performs setup and spec production for native factory providers.
 * 
 * How:
 * Creates a testing section with the provider name using `describe()`, sets up the testing environment using the provided setup function
 * and produces native factory provider specs using the `produceNativeFactoryProviderSpecs()` function.
 *
 * @export
 * @param {NativeFactoryProviderTest} config The configuration for the test.
 */
export function testNativeFactoryProviderCore({providerName, provider, setup, expectedToken, expectedNativeType, providers, element, additionalSpecs }: NativeFactoryProviderTest)
{
    describe(providerName, () =>
    {
        let producedNative   : any;
        let runOutsideAngular: jest.SpyInstance;
    
        async function runSetup(platform: any)
        {
            const config: NativeProviderTestConfig = { platform, providers, element };
            
            ({ producedValue: producedNative, runOutsideAngular } = await setup(provider, config));
        }

        expectedToken = expectedToken || NativeInstance;
    
        produceNativeFactoryProviderSpecs(runSetup, () => provider, () => producedNative, () => runOutsideAngular, () => expectedToken, expectedNativeType, additionalSpecs);
    });
}

/**
 * Performs setup and spec production for native factory providers using the default `setupNativeFactoryProviderTest()` as a setup function.
 * 
 * How:
 * Creates a testing section with the provider name using `describe()`, sets up the testing environment using the default setup function
 * and produces native factory provider specs using the `produceNativeFactoryProviderSpecs()` function.
 *
 * @export
 * @param {Omit<NativeFactoryProviderTest, 'setup'>} testConfig The configuration for the test.
 */
export function testNativeFactoryProvider(testConfig: Omit<NativeFactoryProviderTest, 'setup'>)
{
    const config = { ...testConfig, setup: setupNativeFactoryProviderTest };

    testNativeFactoryProviderCore(config);
}