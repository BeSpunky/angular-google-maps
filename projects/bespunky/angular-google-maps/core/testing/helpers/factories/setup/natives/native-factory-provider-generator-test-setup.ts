import { ElementRef } from '@angular/core';

import { Native, NativeInstance                                                                   } from '@bespunky/angular-google-maps/core';
import { MockNative                                                                               } from '../../../../mocks/mock-native';
import { FactoryProviderGenerator, ProviderGeneratorTestConfig, setupFactoryProviderGeneratorTest } from '../common/factory-provider-generator-test-setup';
import { configTestDefaults                                                                       } from '../common/factory-provider-test-setup';

/**
 * The configuration for a provider generator function.
 *
 * @export
 * @interface NativeProviderGeneratorTestConfig
 * @extends {ProviderGeneratorTestConfig}
 */
export interface NativeProviderGeneratorTestConfig extends ProviderGeneratorTestConfig<Native>
{
    /**
     * (Optional) The element to use when providing injecting `ElementRef`. Default is `new ElementRef({})`.
     * Define a value for this when you need to either:
     * - Make sure the element that was used by the factory is the one you provided.
     * - Use the element in a test to dig up some information.
     */
    element?: ElementRef;
}

/**
 * Applies default values for unspecified properties of the config object.
 * This also overrides the default value defined for `ProviderGeneratorTestConfig.mockValue` with a new `MockNative` object.
 * 
 * @export
 * @param {NativeProviderGeneratorTestConfig} config The configuration to which to apply default values.
 * @returns A full config object with default values for properties that were not specified.
 */
export function configNativeProviderGeneratorTestDefaults(config: NativeProviderGeneratorTestConfig): Required<NativeProviderGeneratorTestConfig>
{
    return {
        ...configTestDefaults(config),
        token    : config.token     || NativeInstance,
        mockValue: config.mockValue || new MockNative(),
        element  : config.element   || new ElementRef({}),
        deps     : config.deps      || []
    };
}

/**
 * Prepares the testing environment for a factory provider **generator** test. This will
 * 1. Apply default values to the specified config.
 * 2. Add the element from the config as a provider so it can be injected into native factories.
 * 3. Setup the testing environment using `setupFactoryProviderGeneratorTest()`.
 * 
 * @export
 * @param {FactoryProviderGenerator} createNativeFactoryProvider The native factory provider generator which will be tested.
 * @param {NativeProviderGeneratorTestConfig} [config={}] (Optional) The configuration for the test. See `NativeProviderGeneratorTestConfig` for defaults. 
 * @returns The instance of the api service, the spy for runOutsideAngular, the generated factory function, the value it produced after injection, and the original mockValue provided in the configuration.
 */
export function setupNativeFactoryProviderGeneratorTest(createNativeFactoryProvider: FactoryProviderGenerator, config: NativeProviderGeneratorTestConfig = {})
{
    config = configNativeProviderGeneratorTestDefaults(config);

    // If the current element should be injected, add a provider for it
    if (config.element)
        config.providers.unshift({ provide: ElementRef, useValue: config.element });

    return setupFactoryProviderGeneratorTest(createNativeFactoryProvider, config);
}
