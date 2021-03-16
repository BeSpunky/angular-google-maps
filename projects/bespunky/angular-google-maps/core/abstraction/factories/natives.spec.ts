import { ElementRef, FactoryProvider } from '@angular/core';

import { MockNative, produceNativeFactoryProviderSpecs, setupNativeFactoryProviderGeneratorTest, someValue } from '@bespunky/angular-google-maps/core/testing';
import { createNativeFactoryProvider                                                                       } from '@bespunky/angular-google-maps/core';

const mockNative  = new MockNative();
const mockElement = new ElementRef({});

describe('createNativeFactoryProvider', () =>
{
    let factoryProvider  : FactoryProvider;
    let runOutsideAngular: jasmine.Spy;
    let produceNative    : jasmine.Spy;
    let producedNative   : any;

    async function setup(platform: any)
    {
        ({
            factoryProvider,
            runOutsideAngular,
            produceValue : produceNative,
            producedValue: producedNative
        } = await setupNativeFactoryProviderGeneratorTest(createNativeFactoryProvider, { platform, element: mockElement, mockValue: mockNative }));
    }

    function browser()
    {
        it('should run the `produceNative` once with the current element and the specified dependencies', () =>
        {
            expect(produceNative).toHaveBeenCalledOnceWith(mockElement, someValue);
        });
    }

    function nonBrowser()
    {
        it('should not call the `produceNative` function', () => expect(produceNative).not.toHaveBeenCalled());
    }

    produceNativeFactoryProviderSpecs(setup, () => factoryProvider, () => producedNative, () => runOutsideAngular, MockNative, { browser, nonBrowser });
});
