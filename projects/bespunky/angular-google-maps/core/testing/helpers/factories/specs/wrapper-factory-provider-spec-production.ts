import { ɵPLATFORM_BROWSER_ID, ɵPLATFORM_SERVER_ID } from '@angular/common';
import { FactoryProvider, Type                     } from '@angular/core';

import { Wrapper, WrapperInstance } from '@bespunky/angular-google-maps/core';

function itShouldBeAFactoryProviderForWrapperInstance(provider: () => FactoryProvider)
{
    it('should be a `FactoryProvider` for the `WrapperInstance` token', () =>
    {
        const factoryProvider = provider();
        
        expect(factoryProvider.provide   ).toBe(WrapperInstance);
        expect(factoryProvider.useFactory).toBeInstanceOf(Function);
    });
}

export function produceBrowserWrapperFactoryProviderSpecs(provider: () => FactoryProvider, producedWrapper: () => Wrapper, expectedWrapperType: Type<Wrapper>,  expectedNative: any)
{
    itShouldBeAFactoryProviderForWrapperInstance(provider);

    it('should return the correct wrapper type', () => expect(producedWrapper()).toBeInstanceOf(expectedWrapperType));

    it('should wrap the native object provided by `NativeInstance`', () => expect(producedWrapper().native).toBe(expectedNative));
}

export function produceNonBrowserWrapperFactoryProviderSpecs(provider: () => FactoryProvider, producedWrapper: () => Wrapper)
{
    itShouldBeAFactoryProviderForWrapperInstance(provider);
    
    it('should returns null', () => expect(producedWrapper()).toBeNull());
}

type AdditionalSpecDefinition = (producedNative: () => Wrapper, provider: () => FactoryProvider) => void;

export interface AdditionalWrapperFactoryProviderSpecs
{
    browser?   : AdditionalSpecDefinition;
    nonBrowser?: AdditionalSpecDefinition;
};

export function produceWrapperFactoryProviderSpecs(
    setup              : (platform: any) => any,
    provider           : () => FactoryProvider,
    producedWrapper    : () => Wrapper,
    expectedWrapperType: Type<Wrapper>,
    expectedNative     : any,
    additionalSpecs?   : AdditionalWrapperFactoryProviderSpecs
)
{
    describe('on browsers', () =>
    {
        beforeEach(() => setup(ɵPLATFORM_BROWSER_ID));

        produceBrowserWrapperFactoryProviderSpecs(provider, producedWrapper, expectedWrapperType, expectedNative);

        if (additionalSpecs?.browser) additionalSpecs.browser(producedWrapper, provider);
    });

    describe('on non-browsers', () =>
    {
        beforeEach(() => setup(ɵPLATFORM_SERVER_ID));

        produceNonBrowserWrapperFactoryProviderSpecs(provider, producedWrapper);

        if (additionalSpecs?.nonBrowser) additionalSpecs.nonBrowser(producedWrapper, provider);
    });
}
