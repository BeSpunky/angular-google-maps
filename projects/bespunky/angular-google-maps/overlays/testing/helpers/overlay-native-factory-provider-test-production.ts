import { NativeFactoryProviderTest, setupNativeFactoryProviderTest, testNativeFactoryProviderCore } from '@bespunky/angular-google-maps/core/testing';

export function testOverlayNativeFactoryProvider(testConfig: Omit<NativeFactoryProviderTest, 'setup'>)
{
    const config = { ...testConfig, setup: setupNativeFactoryProviderTest };

    testNativeFactoryProviderCore(config);
}