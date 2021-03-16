import { ElementRef, FactoryProvider } from '@angular/core';

import { configTestDefaults, ProviderTestConfig, setupFactoryProviderTest } from '../common/factory-provider-test-setup';

/**
 * Represents the basic configuration for a factory provider test setup.
 *
 * @export
 * @interface NativeProviderTestConfig
 * @extends {ProviderTestConfig}
 */
export interface NativeProviderTestConfig extends ProviderTestConfig
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
 *
 * @export
 * @param {NativeProviderTestConfig} config The configuration to which to apply default values.
 * @returns A full config object with default values for properties that were not specified.
 */
export function configNativeProviderTestDefaults(config: NativeProviderTestConfig)
{
    return {
        ...configTestDefaults(config),
        element: config.element || new ElementRef({})
    };
}

/**
 * Prepares the testing environment for a **native** factory provider test. This will:
 * 1. Apply default values to the specified config.
 * 2. Add the element from the config to the providers (because native factories need it).
 * 3. Setup the testing environment for a factory provider test using `setupFactoryProviderTest()`.
 * 
 * @export
 * @param {FactoryProvider} provider The factory provider which will be tested.
 * @param {NativeProviderTestConfig} [config={}] (Optional) The configuration for the test. See `NativeProviderTestConfig` for defaults. 
 * @returns The instance of the api service, the spy for runOutsideAngular, the factory function and the value it produced after injection.
 */
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
