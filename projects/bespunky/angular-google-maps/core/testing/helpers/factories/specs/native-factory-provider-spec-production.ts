import { FactoryProvider, Type                     } from '@angular/core';
import { ɵPLATFORM_BROWSER_ID, ɵPLATFORM_SERVER_ID } from '@angular/common';

import { Native, NativeInstance } from '@bespunky/angular-google-maps/core';

function itShouldBeAFactoryProviderForNativeInstance(provider: () => FactoryProvider)
{
    it('should be a `FactoryProvider` for the `NativeInstance` token', () =>
    {
        const factoryProvider = provider();
        
        expect(factoryProvider.provide   ).toBe(NativeInstance);
        expect(factoryProvider.useFactory).toBeInstanceOf(Function);
    });
}

/**
 * Produces specs for native factory providers for browser platforms.
 * See implementation for included tests.
 * 
 * @export
 * @param {() => FactoryProvider} provider A function that returns the tested provider.
 * @param {() => Native} producedNative A function that returns the value produced by the provider.
 * @param {() => jasmine.Spy} runOutsideAngular A function that returns the `runOutsideAngular` spy.
 * @param {Type<Native>} expectedNativeType The type of native object expected to be produced by the factory.
 */
export function produceBrowserNativeFactoryProviderSpecs(provider: () => FactoryProvider, producedNative: () => Native, runOutsideAngular: () => jasmine.Spy, expectedNativeType: Type<Native>)
{
    itShouldBeAFactoryProviderForNativeInstance(provider);

    it('should return the correct native type', () => expect(producedNative()).toBeInstanceOf(expectedNativeType));

    it('should create the native object outside angular', () => expect(runOutsideAngular()).toHaveBeenCalledTimes(1));
}

/**
 * Produces specs for native factory providers for non-browser platforms.
 * See implementation for included tests.
 * 
 * @export
 * @param {() => FactoryProvider} provider A function that returns the tested provider.
 * @param {() => Native} producedNative A function that returns the value produced by the provider.
 */
export function produceNonBrowserNativeFactoryProviderSpecs(provider: () => FactoryProvider, producedNative: () => Native)
{
    itShouldBeAFactoryProviderForNativeInstance(provider);
    
    it('should returns null', () => expect(producedNative()).toBeNull());
}

type AdditionalSpecDefinition = (producedNative: () => Native, provider: () => FactoryProvider, runOutsideAngular: () => jasmine.Spy) => void;

/**
 * Represents additional specs that should be run after the automated specs provided by the spec production functions in this file.
 *
 * @export
 * @interface AdditionalNativeFactoryProviderSpecs
 */
export interface AdditionalNativeFactoryProviderSpecs
{
    /**
     * (Optional) A function that creates additional specs (i.e. `it('should...')` calls) for browser platforms.
     */
    browser?   : AdditionalSpecDefinition;
    /**
     * (Optional) A function that creates additional specs (i.e. `it('should...')` calls) for non-browser platforms.
     */
    nonBrowser?: AdditionalSpecDefinition;
};

/**
 * Produces specs for native factory providers for both browser and non-browser platforms.
 *
 * @export
 * @param {(platform: any) => any} setup The function that will setup the testing environment.
 * @param {() => FactoryProvider} provider A function that returns the tested provider.
 * @param {() => Native} producedNative A function that returns the value produced by the factory.
 * @param {() => jasmine.Spy} runOutsideAngular A function that returns the `runOutsideAngular` spy.
 * @param {Type<Native>} expectedNativeType The type of native object expected to be produced by the factory.
 * @param {AdditionalNativeFactoryProviderSpecs} [additionalSpecs] (Optional) Additional specs that should be run after the automated specs provided by `produceBrowserNativeFactoryProviderSpecs()` and `produceNonBrowserNativeFactoryProviderSpecs()`.
 */
export function produceNativeFactoryProviderSpecs(
    setup             : (platform: any) => any,
    provider          : () => FactoryProvider,
    producedNative    : () => Native,
    runOutsideAngular : () => jasmine.Spy,
    expectedNativeType: Type<Native>,
    additionalSpecs?  : AdditionalNativeFactoryProviderSpecs
)
{
    describe('on browsers', () =>
    {
        beforeEach(() => setup(ɵPLATFORM_BROWSER_ID));

        produceBrowserNativeFactoryProviderSpecs(provider, producedNative, runOutsideAngular, expectedNativeType);

        if (additionalSpecs?.browser) additionalSpecs.browser(producedNative, provider, runOutsideAngular);
    });

    describe('on non-browsers', () =>
    {
        beforeEach(() => setup(ɵPLATFORM_SERVER_ID));

        produceNonBrowserNativeFactoryProviderSpecs(provider, producedNative);

        if (additionalSpecs?.nonBrowser) additionalSpecs.nonBrowser(producedNative, provider, runOutsideAngular);
    });
}
