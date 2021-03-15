import { NativeInstance                                                                           } from '@bespunky/angular-google-maps/core';
import { MockNative                                                                               } from '../../../../mocks/mock-native';
import { MockWrapper                                                                              } from '../../../../mocks/mock-wrapper';
import { FactoryProviderGenerator, ProviderGeneratorTestConfig, setupFactoryProviderGeneratorTest } from '../common/factory-provider-generator-test-setup';
import { configTestDefaults                                                                       } from '../common/factory-provider-test-setup';

export interface WrapperProviderGeneratorTestConfig extends ProviderGeneratorTestConfig
{
    mockValue?: { native: any };
}

export function configWrapperProviderGeneratorTestDefaults(config: WrapperProviderGeneratorTestConfig)
{
    return {
        ...configTestDefaults(config),
        mockValue: config.mockValue || new MockWrapper(new MockNative()),
    };
}

export function setupWrapperFactoryProviderGeneratorTest(createWrapperFactoryProvider: FactoryProviderGenerator, config: WrapperProviderGeneratorTestConfig = {})
{
    config = configWrapperProviderGeneratorTestDefaults(config);

    config.providers.push({ provide: NativeInstance, useValue: config.mockValue.native });

    return setupFactoryProviderGeneratorTest(createWrapperFactoryProvider, config);
}