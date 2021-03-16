import { WrapperFactoryProviderTest, testWrapperFactoryProviderCore } from '@bespunky/angular-google-maps/core/testing';
import { MockNativeDrawableOverlay                                  } from '../../mocks/mock-native-drawable-overlay';
import { setupOverlayWrapperFactoryProviderTest                     } from './setup/overlay-wrapper-factory-provider-test-setup';

/**
 * Performs setup and spec production for an **overlay** wrapper factory providers using the default `setupOverlayWrapperFactoryProviderTest()` as a setup function.
 * Also adds a `MockNativeDrawableOverlay` as the native injected into the wrapper.
 * 
 * How:
 * Creates a testing section with the provider name using `describe()`, sets up the testing environment using the default setup function
 * and produces native factory provider specs using the `produceWrapperFactoryProviderSpecs()` function.
 *
 * @export
 * @param {(Omit<WrapperFactoryProviderTest, 'setup' | 'mockNative'>)} testConfig The configuration for the test.
 */
export function testOverlayWrapperFactoryProvider(testConfig: Omit<WrapperFactoryProviderTest, 'setup' | 'mockNative'>)
{
    const config = {
        ...testConfig,
        setup     : setupOverlayWrapperFactoryProviderTest,
        mockNative: new MockNativeDrawableOverlay()
    };

    testWrapperFactoryProviderCore(config);
}