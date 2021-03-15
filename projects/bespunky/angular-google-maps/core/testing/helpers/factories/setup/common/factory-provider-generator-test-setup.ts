import { InjectionToken } from '@angular/core';

import { configTestDefaults, ProviderTestConfig, setupFactoryProviderTest } from './factory-provider-test-setup';

export type FactoryProviderGenerator = (produceValue: jasmine.Spy, ...deps: any[]) => any;

// A dummy provider to use in the `deps` array
export const SomeToken = new InjectionToken<any>('SomeToken');
export const someValue = 123;

export interface ProviderGeneratorTestConfig extends ProviderTestConfig
{
    mockValue?: any;
}

function configProviderGeneratorTestDefaults(config: ProviderGeneratorTestConfig)
{
    return {
        ...configTestDefaults(config),
        mockValue: config.mockValue || 'produced value',
    };
}

export async function setupFactoryProviderGeneratorTest(createProvider: FactoryProviderGenerator, config: ProviderGeneratorTestConfig = {})
{
    const { mockValue, providers } = configProviderGeneratorTestDefaults(config);

    const produceValue    = jasmine.createSpy('produceValue').and.returnValue(mockValue);
    const factoryProvider = createProvider(produceValue, [SomeToken]);
    
    // Add a dummy provider to use as a proof that the `deps` array in the provider generator function works
    config.providers = [...providers, { provide: SomeToken, useValue: someValue }];

    const { api, runOutsideAngular, factory, producedValue } = await setupFactoryProviderTest(factoryProvider, config);

    return { api, runOutsideAngular, produceValue, factoryProvider, factory, producedValue, mockValue };
}