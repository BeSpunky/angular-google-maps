import { FactoryProvider, InjectionToken } from '@angular/core';

import { MockNative, MockWrapper, produceWrapperFactoryProviderSpecs, setupWrapperFactoryProviderGeneratorTest, someValue } from '@bespunky/angular-google-maps/core/testing';
import { createWrapperFactoryProvider, GoogleMapsApiService, Wrapper, WrapperInstance                                              } from '@bespunky/angular-google-maps/core';

const mockNative  = new MockNative();
const mockWrapper = new MockWrapper(mockNative);

describe('createWrapperFactoryProvider', () =>
{
    let api            : GoogleMapsApiService;
    let factoryProvider: FactoryProvider;
    let wrapperToken   : InjectionToken<Wrapper>;
    let produceWrapper : jasmine.Spy;
    let producedWrapper: any;

    async function setup(platform: any)
    {
        ({
            api,
            factoryProvider,
            token        : wrapperToken,
            produceValue : produceWrapper,
            producedValue: producedWrapper
        } = await setupWrapperFactoryProviderGeneratorTest(createWrapperFactoryProvider, { platform, mockValue: mockWrapper }));
    }

    function browser()
    {
        it('should call the `produceWrapper` function once with the api, native object and the specified dependencies', () =>
        {
            expect(produceWrapper).toHaveBeenCalledOnceWith(api, mockNative, someValue);
        });
    }

    function nonBrowser()
    {
        it('should not call the `produceWrapper` function', () => expect(produceWrapper).not.toHaveBeenCalled());
    }

    produceWrapperFactoryProviderSpecs(setup, () => factoryProvider, () => producedWrapper, () => wrapperToken, MockWrapper, mockNative, { browser, nonBrowser });
});
