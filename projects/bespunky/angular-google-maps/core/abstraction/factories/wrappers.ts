import { FactoryProvider                 } from '@angular/core';
import { UniversalService                } from '@bespunky/angular-zen/universal';

import { GoogleMapsApiService            } from '../../api/google-maps-api.service';
import { NativeOf, Wrapper               } from '../types/abstraction';
import { NativeInstance, WrapperInstance } from './tokens';

type WrapperFactory<TWrapper extends Wrapper> = (api: GoogleMapsApiService, native: NativeOf<TWrapper>, ...deps: any[]) => TWrapper;

// Called by code 
function createWrapperFactory<TWrapper extends Wrapper>(produceWrapper: WrapperFactory<TWrapper>)
{
    // Called by Angular's Dependency Injector
    return (api: GoogleMapsApiService, universal: UniversalService, native: NativeOf<TWrapper>, ...deps: any[]) =>
    {
        // TODO: Test with Angular Universal app and see if this doesn't break the chain of contained directives
        if (!universal.isPlatformBrowser) return null;
            
        return produceWrapper(api, native, ...deps);
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
