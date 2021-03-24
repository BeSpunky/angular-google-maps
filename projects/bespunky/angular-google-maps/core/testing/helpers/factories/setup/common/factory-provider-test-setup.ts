import { TestBed                                } from '@angular/core/testing';
import { Provider, PLATFORM_ID, FactoryProvider } from '@angular/core';
import { ɵPLATFORM_BROWSER_ID                   } from '@angular/common';

import { configureGoogleMapsTestingModule } from '@bespunky/angular-google-maps/testing';

/**
 * Represents the basic configuration for a factory provider test setup.
 *
 * @export
 * @interface ProviderTestConfig
 */
export interface ProviderTestConfig
{
    /** (Optional) The platform on which the test should run. Default is ɵPLATFORM_BROWSER_ID. */
    platform? : any;
    /** (Optional) Any providers needed for the test in addition to the ones created by setup function. */
    providers?: Provider[];
}

/**
 * Applies default values for unspecified properties of the config object.
 *
 * @export
 * @param {ProviderTestConfig} config The configuration to which to apply default values.
 * @returns A full config object with default values for properties that were not specified.
 */
export function configTestDefaults(config: ProviderTestConfig): Required<ProviderTestConfig>
{
    return {
        platform : config.platform  || ɵPLATFORM_BROWSER_ID,
        providers: config.providers || []
    };
}

/**
 * Prepares the testing environment for a factory provider test. This will:
 * 1. Apply default values to the specified config.
 * 2. Add the tested provider and a PLATFORM_ID provider, then configure a testing module using `configureGoogleMapsTestingModule()`.
 * 3. Inject the provider to extract the value produced by the factory.
 * 
 * @export
 * @param {FactoryProvider} testedProvider The factory provider which will be tested.
 * @param {ProviderTestConfig} [config={}] (Optional) The configuration for the test. See `ProviderTestConfig` for defaults. 
 * @returns The instance of the api service, the spy for `runOutsideAngular`, the factory function and the value it produced after injection.
 */
export async function setupFactoryProviderTest(testedProvider: FactoryProvider, config: ProviderTestConfig = {})
{
    const factory                 = testedProvider.useFactory;
    const { platform, providers } = configTestDefaults(config);
    
    const { api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule({
        customize: def => def.providers.push(
            { provide: PLATFORM_ID, useValue: platform },
            testedProvider,
            ...providers
        )
    });

    const producedValue = TestBed.inject(testedProvider.provide);

    return { api, runOutsideAngular, factory, producedValue };
}