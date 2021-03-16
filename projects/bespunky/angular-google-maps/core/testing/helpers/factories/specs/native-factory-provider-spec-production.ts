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

export function produceBrowserNativeFactoryProviderSpecs(provider: () => FactoryProvider, producedNative: () => Native, runOutsideAngular: () => jasmine.Spy, expectedNativeType: Type<Native>)
{
    itShouldBeAFactoryProviderForNativeInstance(provider);

    it('should return the correct native type', () => expect(producedNative()).toBeInstanceOf(expectedNativeType));

    it('should create the native object outside angular', () => expect(runOutsideAngular()).toHaveBeenCalledTimes(1));
}

export function produceNonBrowserNativeFactoryProviderSpecs(provider: () => FactoryProvider, producedNative: () => Native)
{
    itShouldBeAFactoryProviderForNativeInstance(provider);
    
    it('should returns null', () => expect(producedNative()).toBeNull());
}

type AdditionalSpecDefinition = (producedNative: () => Native, provider: () => FactoryProvider, runOutsideAngular: () => jasmine.Spy) => void;

export interface AdditionalNativeFactoryProviderSpecs
{
    browser?   : AdditionalSpecDefinition;
    nonBrowser?: AdditionalSpecDefinition;
};

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
