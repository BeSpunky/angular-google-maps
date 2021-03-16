import { NativeInstance                                                                           } from '@bespunky/angular-google-maps/core';
import { MockNative                                                                               } from '../../../../mocks/mock-native';
import { MockWrapper                                                                              } from '../../../../mocks/mock-wrapper';
import { FactoryProviderGenerator, ProviderGeneratorTestConfig, setupFactoryProviderGeneratorTest } from '../common/factory-provider-generator-test-setup';
import { configTestDefaults                                                                       } from '../common/factory-provider-test-setup';

/**
 * The configuration for a wrapper provider generator function.
 *
 * @export
 * @interface WrapperProviderGeneratorTestConfig
 * @extends {ProviderGeneratorTestConfig}
 */
export interface WrapperProviderGeneratorTestConfig extends ProviderGeneratorTestConfig
{
    /**
     * (Optional) The value that will be returned by the **simulated** `produceValue` function passed
     * to the generator function. Meaning, when the factory returns, this will be the value it produces.
     * Default is `new MockWrapper(new MockNative())`.
     */
    mockValue?: { native: any };
}

/**
 * Applies default values for unspecified properties of the config object.
 * This also overrides the default value defined for `ProviderGeneratorTestConfig.mockValue` with a new `MockWrapper` object.
 *
 * @export
 * @param {WrapperProviderGeneratorTestConfig} config The configuration to which to apply default values.
 * @returns A full config object with default values for properties that were not specified.
 */
export function configWrapperProviderGeneratorTestDefaults(config: WrapperProviderGeneratorTestConfig)
{
    return {
        ...configTestDefaults(config),
        mockValue: config.mockValue || new MockWrapper(new MockNative()),
    };
}

/**
 * Prepares the testing environment for a factory provider **generator** test. This will
 * 1. Apply default values to the specified config.
 * 2. Add a provider for the `NativeInstance` token using the native element wrapped in the wrapper from the config so it can be injected into native factories.
 * 3. Setup the testing environment using `setupFactoryProviderGeneratorTest()`.
 *
 * @export
 * @param {FactoryProviderGenerator} createWrapperFactoryProvider The wrapper factory provider generator which will be tested.
 * @param {WrapperProviderGeneratorTestConfig} [config={}] (Optional) The configuration for the test. See `WrapperProviderGeneratorTestConfig` for defaults. 
 * @returns The instance of the api service, the spy for runOutsideAngular, the generated factory function, the value it produced after injection, and the original mockValue provided in the configuration.
 */
export function setupWrapperFactoryProviderGeneratorTest(createWrapperFactoryProvider: FactoryProviderGenerator, config: WrapperProviderGeneratorTestConfig = {})
{
    config = configWrapperProviderGeneratorTestDefaults(config);

    config.providers.push({ provide: NativeInstance, useValue: config.mockValue.native });

    return setupFactoryProviderGeneratorTest(createWrapperFactoryProvider, config);
}