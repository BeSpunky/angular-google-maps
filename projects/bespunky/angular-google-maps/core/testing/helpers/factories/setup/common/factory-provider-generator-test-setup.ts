import { InjectionToken, Provider } from '@angular/core';

import { configTestDefaults, ProviderTestConfig, setupFactoryProviderTest } from './factory-provider-test-setup';

/** Represents a function that creates a factory provider,  */
export type FactoryProviderGenerator = (produceValue: jasmine.Spy, ...deps: any[]) => any;

/** A dummy token to use for testing that the `deps` array is passed correctly. */
export const SomeToken = new InjectionToken<any>('SomeToken');
/** A dummy value that will be provided and resolved for `SomeToken` when testing factory generators.  */
export const someValue = 123;
/** A dummy provider to use for testing that the `deps` array is passed correcly. */
export const SomeProvider: Provider = { provide: SomeToken, useValue: someValue };

/**
 * The configuration for a provider generator function.
 *
 * @export
 * @interface ProviderGeneratorTestConfig
 * @extends {ProviderTestConfig}
 */
export interface ProviderGeneratorTestConfig extends ProviderTestConfig
{
    /**
     * (Optional) The value that will be returned by the **simulated** `produceValue` function passed
     * to the generator function. Meaning, when the factory returns, this will be the value it produces.
     * Default is `'produced value'`.
     */
    mockValue?: any;
}

/**
 * Applies default values for unspecified properties of the config object.
 *
 * @export
 * @param {ProviderGeneratorTestConfig} config The configuration to which to apply default values.
 * @returns A full config object with default values for properties that were not specified.
 */
function configProviderGeneratorTestDefaults(config: ProviderGeneratorTestConfig)
{
    return {
        ...configTestDefaults(config),
        mockValue: config.mockValue || 'produced value',
    };
}

/**
 * Prepares the testing environment for a factory provider **generator** test. This will:
 * 1. Apply default values to the specified config.
 * 2. Simulate the `produceValue` using a spy that returns the value in `config.mockValue`.
 * 3. Create the provider using the generator and the simulated `produceValue` function.
 * 4. Add `SomeProvider` as an additional provider passed to the `produceValue` function through its `deps` argument.
 * 5. Setup the testing environment using the `setupFactoryProviderTest()` function.
 * 
 * @export
 * @param {FactoryProviderGenerator} createProvider The factory provider generator which will be tested.
 * @param {ProviderGeneratorTestConfig} [config={}] (Optional) The configuration for the test. See `ProviderGeneratorTestConfig` for defaults. 
 * @returns The instance of the api service, the spy for `runOutsideAngular`, the generated factory function, the value it produced after injection, and the original `mockValue` provided in the configuration.
 */
export async function setupFactoryProviderGeneratorTest(createProvider: FactoryProviderGenerator, config: ProviderGeneratorTestConfig = {})
{
    const { mockValue, providers } = configProviderGeneratorTestDefaults(config);

    const produceValue    = jasmine.createSpy('produceValue').and.returnValue(mockValue);
    const factoryProvider = createProvider(produceValue, [SomeToken]);
    
    // Add a dummy provider to use as a proof that the `deps` array in the provider generator function works
    config.providers = [...providers, SomeProvider];

    const { api, runOutsideAngular, factory, producedValue } = await setupFactoryProviderTest(factoryProvider, config);

    return { api, runOutsideAngular, produceValue, factoryProvider, factory, producedValue, mockValue };
}