import { FactoryProvider  } from '@angular/core';
import { UniversalService } from '@bespunky/angular-zen/universal';

import { GoogleMapsApiService   } from '../../api/google-maps-api.service';
import { Native                 } from '../types/abstraction';
import { FactoryGeneratorConfig } from './common';
import { NativeInstance         } from './tokens';

type NativeFactory<TNative  extends Native> = (...deps: any[]) => TNative;

/**
 * Creates the factory that will be used in the provider created by `createNativeFactoryProvider`.
 * See `createNativeFactoryProvider` for more details.
 *
 * @template TNative The type of native object generated by the factory.
 * @param {NativeFactory<TNative>} produceNative The function that will create the native object. Receives the dependencies specified in `deps` when configuring the generator.
 * @returns A factory that receives the `GoogleMapsApiService`, `UniversalService`, and any additional dependencies, then returns a new native object on browsers and `null` on non-browsers.
 */
function createNativeFactory<TNative extends Native>(produceNative: NativeFactory<TNative>)
{
    // Called by Angular's Dependency Injector
    return (api: GoogleMapsApiService, universal: UniversalService, ...deps: any[]) =>
    {
        // TODO: Test with Angular Universal app and see if this doesn't break the chain of contained directives
        if (!universal.isPlatformBrowser) return null;

        return api.runOutsideAngular(() => produceNative(...deps));
    };
}

/**
 * Defines the configuration for a function that generates a `FactoryProvider` for native objects.
 *
 * @export
 * @interface NativeFactoryGeneratorConfig
 * @extends {FactoryGeneratorConfig<Native>}
 */
export interface NativeFactoryGeneratorConfig extends FactoryGeneratorConfig<Native> { }

/**
 * Applies default values for undefined values in the config object.
 *
 * @export
 * @param {NativeFactoryGeneratorConfig} config The optional config.
 * @returns {Required<NativeFactoryGeneratorConfig>} The filled config.
 */
export function configNativeFactoryProviderGeneratorDefaults(config: NativeFactoryGeneratorConfig): Required<NativeFactoryGeneratorConfig>
{
    return {
        token: config.token || NativeInstance,
        deps : config.deps  || []
    };
}

/**
 * Creates a factory provider for the a natve object injection token.
 * The factory runs the specified function and passes the specified dependencies to it.
 * The function will be run outside Angular.
 *
 * By default, the generator will create the factory provider for the `NativeInstance` token.
 * To change this behavior, specify the appropriate token in the config argument.
 * 
 * Note: The factory will detect non-browser platforms and return `null` instead of calling the function.
 *  
 * @export
 * @template TNative The type of native object generated by the factory.
 * @param {NativeFactory<TNative>} produceNative The function that will create the native object. Receives the dependencies specified in `deps`.
 * @param {NativeFactoryGeneratorConfig} [config={}] (Optional) A configuration object for the generator.
 * @returns {FactoryProvider} A `FactoryProvider` object for the specified token.
 */
export function createNativeFactoryProvider<TNative extends Native>(produceNative: NativeFactory<TNative>, config: NativeFactoryGeneratorConfig = {}): FactoryProvider
{
    const { token, deps } = configNativeFactoryProviderGeneratorDefaults(config);

    return {
        provide   : token,
        useFactory: createNativeFactory(produceNative),
        deps      : [GoogleMapsApiService, UniversalService, ...deps]
    };
}