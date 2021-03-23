import { FactoryProvider, InjectionToken } from '@angular/core';

import { MockNative, produceNativeFactoryProviderSpecs, setupNativeFactoryProviderGeneratorTest, someValue } from '@bespunky/angular-google-maps/core/testing';
import { createNativeFactoryProvider, Native, NativeInstance                                                       } from '@bespunky/angular-google-maps/core';

const mockNative  = new MockNative();

describe('createNativeFactoryProvider', () =>
{
    let factoryProvider  : FactoryProvider;
    let runOutsideAngular: jasmine.Spy;
    let nativeToken      : InjectionToken<Native>;
    let produceNative    : jasmine.Spy;
    let producedNative   : any;

    async function setup(platform: any)
    {
        ({
            factoryProvider,
            runOutsideAngular,
            token        : nativeToken,
            produceValue : produceNative,
            producedValue: producedNative
        } = await setupNativeFactoryProviderGeneratorTest(createNativeFactoryProvider, { platform, mockValue: mockNative }));
    }

    function browser()
    {
        it('should run the `produceNative` once with the specified dependencies', () =>
        {
            expect(produceNative).toHaveBeenCalledOnceWith(someValue);
        });
    }

    function nonBrowser()
    {
        it('should not call the `produceNative` function', () => expect(produceNative).not.toHaveBeenCalled());
    }

    produceNativeFactoryProviderSpecs(setup, () => factoryProvider, () => producedNative, () => runOutsideAngular, () => nativeToken, MockNative, { browser, nonBrowser });
});
