import { FactoryProvider, ElementRef } from '@angular/core';
import { UniversalService            } from '@bespunky/angular-zen/universal';

import { GoogleMapsApiService        } from '../../api/google-maps-api.service';
import { Native                      } from '../types/abstraction';
import { NativeInstance              } from './tokens';

type NativeFactory <TNative  extends Native>  = (element: ElementRef, ...deps: any[]) => TNative;

// Called by code 
function createNativeFactory<TNative extends Native>(produceNative: NativeFactory<TNative>)
{
    // Called by Angular's Dependency Injector
    return (api: GoogleMapsApiService, universal: UniversalService, element: ElementRef, ...deps: any[]) =>
    {
        // TODO: Test with Angular Universal app and see if this doesn't break the chain of contained directives
        if (!universal.isPlatformBrowser) return null;

        return api.runOutsideAngular(() => produceNative(element, ...deps));
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
