import { ElementRef } from '@angular/core';

import { MockNative                                                                               } from '../../../../mocks/mock-native';
import { FactoryProviderGenerator, ProviderGeneratorTestConfig, setupFactoryProviderGeneratorTest } from '../common/factory-provider-generator-test-setup';
import { configTestDefaults                                                                       } from '../common/factory-provider-test-setup';

export interface NativeProviderGeneratorTestConfig extends ProviderGeneratorTestConfig
{
    element?: ElementRef;
}

export function configNativeProviderGeneratorTestDefaults(config: NativeProviderGeneratorTestConfig)
{
    return {
        ...configTestDefaults(config),
        mockValue: config.mockValue || new MockNative(),
        element  : config.element   || new ElementRef({})
    };
}

export function setupNativeFactoryProviderGeneratorTest(createNativeFactoryProvider: FactoryProviderGenerator, config: NativeProviderGeneratorTestConfig = {})
{
    config = configNativeProviderGeneratorTestDefaults(config);

    config.providers.push({ provide: ElementRef, useValue: config.element });

    return setupFactoryProviderGeneratorTest(createNativeFactoryProvider, config);
}
