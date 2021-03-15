import { ElementRef, FactoryProvider } from '@angular/core';

import { configTestDefaults, ProviderTestConfig, setupFactoryProviderTest } from '../common/factory-provider-test-setup';

export interface NativeProviderTestConfig extends ProviderTestConfig
{
    element?: ElementRef;
}

export function configNativeProviderTestDefaults(config: NativeProviderTestConfig)
{
    return {
        ...configTestDefaults(config),
        element: config.element || new ElementRef({})
    };
}

export function setupNativeFactoryProviderTest(provider: FactoryProvider, config: NativeProviderTestConfig = {})
{    
    const { element, platform, providers } = configNativeProviderTestDefaults(config);
    
    return setupFactoryProviderTest(provider, {
        platform,
        providers: [
            ...providers,
            { provide: ElementRef, useValue: element }
        ]
    });
}
