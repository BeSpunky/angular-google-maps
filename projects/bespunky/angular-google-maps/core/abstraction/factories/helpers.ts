import { FactoryProvider, ElementRef    } from '@angular/core';
import { UniversalService               } from '@bespunky/angular-zen/universal';

import { GoogleMapsApiService            } from '../../api/google-maps-api.service';
import { Native, NativeOf, Wrapper       } from '../types/abstraction';
import { NativeInstance, WrapperInstance } from './tokens';

type NativeFactory <TNative  extends Native>  = (element: ElementRef, ...deps: any[]) => TNative;
type WrapperFactory<TWrapper extends Wrapper> = (api: GoogleMapsApiService, native: NativeOf<TWrapper>, ...deps: any[]) => TWrapper;

// Called by code 
export function createNativeFactory<TNative extends Native>(produceNative: NativeFactory<TNative>)
{
    // Called by Angular's Dependency Injector
    return (api: GoogleMapsApiService, universal: UniversalService, element: ElementRef, ...deps: any[]) =>
    {
        // TODO: Test with Angular Universal app and see if this doesn't break the chain of contained directives
        if (!universal.isPlatformBrowser) return null;

        return api.runOutsideAngular(() => produceNative(element, ...deps));
    };
}

// Called by code 
export function createWrapperFactory<TWrapper extends Wrapper>(produceWrapper: WrapperFactory<TWrapper>)
{
    // Called by Angular's Dependency Injector
    return (api: GoogleMapsApiService, universal: UniversalService, native: NativeOf<TWrapper>, ...deps: any[]) =>
    {
        // TODO: Test with Angular Universal app and see if this doesn't break the chain of contained directives
        if (!universal.isPlatformBrowser) return null;
            
        return produceWrapper(api, native, ...deps);
    };
}

export function createNativeFactoryProvider<TNative extends Native>(produceNative: NativeFactory<TNative>, deps: any[] = []): FactoryProvider
{
    return {
        provide   : NativeInstance,
        useFactory: createNativeFactory(produceNative),
        deps      : [GoogleMapsApiService, UniversalService, ElementRef, ...deps]
    };
}

export function createWrapperFactoryProvider<TWrapper extends Wrapper>(produceWrapper: WrapperFactory<TWrapper>, deps: any[] = []): FactoryProvider
{
    return {
        provide   : WrapperInstance,
        useFactory: createWrapperFactory(produceWrapper),
        deps      : [GoogleMapsApiService, UniversalService, NativeInstance, ...deps]
    };
}
