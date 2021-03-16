import { FactoryProvider } from '@angular/core';

import { NativeInstance                                                   } from '@bespunky/angular-google-maps/core';
import { configTestDefaults, ProviderTestConfig, setupFactoryProviderTest } from '../common/factory-provider-test-setup';

/**
 * Represents the basic configuration for a factory provider test setup.
 *
 * @export
 * @interface WrapperProviderTestConfig
 * @extends {ProviderTestConfig}
 */
export interface WrapperProviderTestConfig extends ProviderTestConfig
{
    /**
     * (Optional) The native object to use as the value of the `NativeInstance` token.
     * This will be passed-in to the wrapper factory. Default is `{ value: 'native value' }`.
     */
    native?: any;
}

/**
 * Applies default values for unspecified properties of the config object.
 *
 * @export
 * @param {WrapperProviderTestConfig} config The configuration to which to apply default values.
 * @returns A full config object with default values for properties that were not specified.
 */
export function configWrapperProviderTestDefaults(config: WrapperProviderTestConfig)
{
    return {
        ...configTestDefaults(config),
        native: config.native || { value: 'native value' },
    };
}

/**
 * Prepares the testing environment for a **wrapper** factory provider test. This will:
 * 1. Apply default values to the specified config.
 * 2. Add the native object from the config as a provider to `NativeInstance` (because wrapper factories need it).
 * 3. Setup the testing environment for a factory provider test using `setupFactoryProviderTest()`.
 *
 * @export
 * @param {FactoryProvider} provider The factory provider which will be tested.
 * @param {WrapperProviderTestConfig} [config={}] (Optional) The configuration for the test. See `WrapperProviderTestConfig` for defaults. 
 * @returns The instance of the api service, the spy for runOutsideAngular, the factory function and the value it produced after injection.
 */
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