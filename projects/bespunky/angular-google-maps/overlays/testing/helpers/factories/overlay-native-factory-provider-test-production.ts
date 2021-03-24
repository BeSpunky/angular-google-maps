import { NativeFactoryProviderTest, setupNativeFactoryProviderTest, testNativeFactoryProviderCore } from '@bespunky/angular-google-maps/core/testing';

/**
 * Performs setup and spec production for native **overlay** factory providers using the default `setupNativeFactoryProviderTest()` as a setup function.
 * 
 * How:
 * Creates a testing section with the provider name using `describe()`, sets up the testing environment using the default setup function
 * and produces native factory provider specs using the `produceNativeFactoryProviderSpecs()` function.
 *
 * @export
 * @param {Omit<NativeFactoryProviderTest, 'setup'>} testConfig The configuration for the test.
 */
export function testOverlayNativeFactoryProvider(testConfig: Omit<NativeFactoryProviderTest, 'setup'>)
{
    const config = { ...testConfig, setup: setupNativeFactoryProviderTest };

    testNativeFactoryProviderCore(config);
}