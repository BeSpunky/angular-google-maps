import { TestBed                                                  } from '@angular/core/testing';
import { ɵPLATFORM_BROWSER_ID, ɵPLATFORM_SERVER_ID                } from '@angular/common';
import { ElementRef, FactoryProvider, InjectionToken, PLATFORM_ID } from '@angular/core';

import { configureGoogleMapsTestingModule                                                    } from '@bespunky/angular-google-maps/testing';
import { createWrapperFactoryProvider, GoogleMapsApiService, NativeInstance, WrapperInstance } from '@bespunky/angular-google-maps/core';

// A dummy provider to use in the `deps` array
const SomeToken   = new InjectionToken<any>('SomeToken');
const someValue   = 123;
// A dummy element to provide to the factory
const someElement = new ElementRef(null);
const mockNative  = { value: 'dummy native' };
// The object that will be used as the instantiated wrapper
const mockWrapper = { native: mockNative };

describe('createWrapperFactoryProvider', () =>
{
    let produceWrapper: jasmine.Spy;
    let wrapperFactory: FactoryProvider;
    let api           : GoogleMapsApiService;
    let wrapper       : any;
    
    async function setup(platform: any)
    {
        produceWrapper = jasmine.createSpy('produceWrapper').and.returnValue(mockWrapper);
        wrapperFactory = createWrapperFactoryProvider(produceWrapper, [SomeToken]);

        ({ api } = await configureGoogleMapsTestingModule({
            customize: def => def.providers = [
                wrapperFactory,
                { provide: ElementRef, useValue: someElement },
                // Add a dummy provider to use in the `deps` array
                { provide: SomeToken, useValue: someValue },
                { provide: PLATFORM_ID, useValue: platform },
                { provide: NativeInstance, useValue: mockNative }
            ]
        }));

        wrapper = TestBed.inject(WrapperInstance);
    }

    describe('on browsers', () =>
    {
        beforeEach(() => setup(ɵPLATFORM_BROWSER_ID));

        it('should create an Angular `FactoryProvider` for the `WrapperInstance` token', () =>
        {
            expect(wrapperFactory.provide).toBe(WrapperInstance);
            expect(wrapperFactory.useFactory).toBeInstanceOf(Function);
        });

        it('should provide a factory which runs the `produceWrapper` once with the api service, the native object, and the specified dependencies', () => expect(produceWrapper).toHaveBeenCalledOnceWith(api, mockNative, someValue));
    });

    describe('on non-browsers', () =>
    {
        beforeEach(() => setup(ɵPLATFORM_SERVER_ID));

        it('should create an Angular `FactoryProvider` for the `WrapperInstance` token', () =>
        {
            expect(wrapperFactory.provide).toBe(WrapperInstance);
            expect(wrapperFactory.useFactory).toBeInstanceOf(Function);
        });

        it('should provide a factory which returns null when running on non-browser platforms', () => expect(wrapper).toBeNull());
    });
});
