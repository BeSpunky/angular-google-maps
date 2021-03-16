import { WrapperFactoryProviderTest, testWrapperFactoryProviderCore } from '@bespunky/angular-google-maps/core/testing';
import { MockNativeDrawableOverlay                                  } from '../../mocks/mock-native-drawable-overlay';
import { setupOverlayWrapperFactoryProviderTest                     } from './setup/overlay-wrapper-factory-provider-test-setup';

/**
 *
 *
 * @export
 * @param {(Omit<WrapperFactoryProviderTest, 'setup' | 'mockNative'>)} testConfig
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