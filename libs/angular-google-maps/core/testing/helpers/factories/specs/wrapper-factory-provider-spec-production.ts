import { ɵPLATFORM_BROWSER_ID, ɵPLATFORM_SERVER_ID } from '@angular/common';
import { FactoryProvider, InjectionToken, Type     } from '@angular/core';

import { Wrapper } from '@bespunky/angular-google-maps/core';

function itShouldBeAFactoryProviderForWrapperToken(provider: () => FactoryProvider, expectedToken: () => InjectionToken<Wrapper>)
{
    it('should be a `FactoryProvider` for the expected token', () =>
    {
        const factoryProvider = provider();
        
        expect(factoryProvider.provide   ).toBe(expectedToken());
        expect(factoryProvider.useFactory).toBeInstanceOf(Function);
    });
}

/**
 * Produces specs for wrapper factory providers for browser platforms.
 * See implementation for included tests.
 *
 * @export
 * @param {() => FactoryProvider} provider A function that returns the tested provider.
 * @param {() => Wrapper} producedWrapper A function that returns the value produced by the provider.
 * @param {Type<Wrapper>} expectedWrapperType The type of wrapper object expected to be produced by the factory.
 * @param {*} expectedNative The native object expected to be wrapped in the produced wrapper object.
 */
export function produceBrowserWrapperFactoryProviderSpecs(provider: () => FactoryProvider, producedWrapper: () => Wrapper, expectedToken: () => InjectionToken<Wrapper>, expectedWrapperType: Type<Wrapper>,  expectedNative: any)
{
    itShouldBeAFactoryProviderForWrapperToken(provider, expectedToken);

    it('should return the correct wrapper type', () => expect(producedWrapper()).toBeInstanceOf(expectedWrapperType));

    it('should wrap the native object provided by `NativeInstance`', () => expect(producedWrapper().native).toBe(expectedNative));
}

/**
 * Produces specs for wrapper factory providers for non-browser platforms.
 * See implementation for included tests.
 *
 * @export
 * @param {() => FactoryProvider} provider A function that returns the tested provider.
 * @param {() => Wrapper} producedWrapper A function that returns the value produced by the provider.
 */
export function produceNonBrowserWrapperFactoryProviderSpecs(provider: () => FactoryProvider, producedWrapper: () => Wrapper, expectedToken: () => InjectionToken<Wrapper>)
{
    itShouldBeAFactoryProviderForWrapperToken(provider, expectedToken);
    
    it('should returns null', () => expect(producedWrapper()).toBeNull());
}

type AdditionalSpecDefinition = (producedNative: () => Wrapper, provider: () => FactoryProvider) => void;

/**
 * Represents additional specs that should be run after the automated specs provided by the spec production functions in this file.
 *
 * @export
 * @interface AdditionalWrapperFactoryProviderSpecs
 */
export interface AdditionalWrapperFactoryProviderSpecs
{
    /**
     * (Optional) A function that creates additional specs (i.e. `it('should...')` calls) for browser platforms.
     */
    browser?: AdditionalSpecDefinition;
    /**
     * (Optional) A function that creates additional specs (i.e. `it('should...')` calls) for non-browser platforms.
     */
    nonBrowser?: AdditionalSpecDefinition;
};

/**
 * Produces specs for wrapper factory providers for both browser and non-browser platforms.
 *
 * @export
 * @param {(platform: any) => any} setup The function that will setup the testing environment.
 * @param {() => FactoryProvider} provider A function that returns the tested provider.
 * @param {() => Wrapper} producedWrapper A function that returns the value produced by the provider.
 * @param {Type<Wrapper>} expectedWrapperType The type of wrapper object expected to be produced by the factory.
 * @param {*} expectedNative The native object expected to be wrapped in the produced wrapper object.
 * @param {AdditionalWrapperFactoryProviderSpecs} [additionalSpecs] (Optional) Additional specs that should be run after the automated specs provided by `produceBrowserWrapperFactoryProviderSpecs()` and `produceNonBrowserWrapperFactoryProviderSpecs()`.
 */
export function produceWrapperFactoryProviderSpecs(
    setup              : (platform: any) => any,
    provider           : () => FactoryProvider,
    producedWrapper    : () => Wrapper,
    expectedToken      : () => InjectionToken<Wrapper>,
    expectedWrapperType: Type<Wrapper>,
    expectedNative     : any,
    additionalSpecs?   : AdditionalWrapperFactoryProviderSpecs
)
{
    describe('on browsers', () =>
    {
        beforeEach(() => setup(ɵPLATFORM_BROWSER_ID));

        produceBrowserWrapperFactoryProviderSpecs(provider, producedWrapper, expectedToken, expectedWrapperType, expectedNative);

        if (additionalSpecs?.browser) additionalSpecs.browser(producedWrapper, provider);
    });

    describe('on non-browsers', () =>
    {
        beforeEach(() => setup(ɵPLATFORM_SERVER_ID));

        produceNonBrowserWrapperFactoryProviderSpecs(provider, producedWrapper, expectedToken);

        if (additionalSpecs?.nonBrowser) additionalSpecs.nonBrowser(producedWrapper, provider);
    });
}
