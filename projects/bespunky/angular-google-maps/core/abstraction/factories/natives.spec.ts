import { TestBed                                                  } from '@angular/core/testing';
import { ɵPLATFORM_BROWSER_ID, ɵPLATFORM_SERVER_ID                } from '@angular/common';
import { ElementRef, FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core';

import { configureGoogleMapsTestingModule            } from '@bespunky/angular-google-maps/testing';
import { createNativeFactoryProvider, NativeInstance } from '@bespunky/angular-google-maps/core';

// A dummy provider to use in the `deps` array
const SomeToken = new InjectionToken<any>('SomeToken');
const someValue = 123;
// A dummy element to provide to the factory
const someElement = new ElementRef(null);
// 
const mockNative = { value: 'dummy native' };

describe('createNativeFactoryProvider', () =>
{
    let runOutsideAngular: jasmine.Spy;
    let produceNative    : jasmine.Spy;
    let nativeFactory    : FactoryProvider;
    let native           : any;
    
    async function setup(platform: any)
    {
        produceNative = jasmine.createSpy('produceNative').and.returnValue(mockNative);
        nativeFactory = createNativeFactoryProvider(produceNative, [SomeToken]);

        ({ spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule({
            customize: def => def.providers = [
                nativeFactory,
                { provide: ElementRef, useValue: someElement },
                // Add a dummy provider to use in the `deps` array
                { provide: SomeToken, useValue: someValue },
                { provide: PLATFORM_ID, useValue: platform }
            ]
        }));

        native = TestBed.inject(NativeInstance);
    }

    describe('on browsers', () =>
    {
        beforeEach(() => setup(ɵPLATFORM_BROWSER_ID));

        it('should create an Angular `FactoryProvider` for the `NativeInstance` token', () =>
        {
            expect(nativeFactory.provide).toBe(NativeInstance);
            expect(nativeFactory.useFactory).toBeInstanceOf(Function);
        });

        it('should provide a factory which creates the native object outside angular', () => expect(runOutsideAngular).toHaveBeenCalledTimes(1));

        it('should provide a factory which runs the `produceNative` once with the current element and the specified dependencies', () => expect(produceNative).toHaveBeenCalledOnceWith(someElement, someValue));
    });

    describe('on non-browsers', () =>
    {
        beforeEach(() => setup(ɵPLATFORM_SERVER_ID));

        it('should create an Angular `FactoryProvider` for the `NativeInstance` token', () =>
        {
            expect(nativeFactory.provide).toBe(NativeInstance);
            expect(nativeFactory.useFactory).toBeInstanceOf(Function);
        });

        it('should provide a factory which returns null when running on non-browser platforms', () => expect(native).toBeNull());
    });
});
