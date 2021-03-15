import { FactoryProvider } from '@angular/core';

import { NativeInstance                                                   } from '@bespunky/angular-google-maps/core';
import { configTestDefaults, ProviderTestConfig, setupFactoryProviderTest } from '../common/factory-provider-test-setup';

export interface WrapperProviderTestConfig extends ProviderTestConfig
{
    native?: any;
}

export function configWrapperProviderTestDefaults(config: WrapperProviderTestConfig)
{
    return {
        ...configTestDefaults(config),
        native: config.native || { value: 'native value' },
    };
}

export function setupWrapperFactoryProviderTest(provider: FactoryProvider, config: WrapperProviderTestConfig = {})
{    
    const { native, platform, providers } = configWrapperProviderTestDefaults(config);
    
    return setupFactoryProviderTest(provider, {
        platform,
        providers: [
            ...providers,
            { provide: NativeInstance, useValue: native }
        ]
    });
}