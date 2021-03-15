import { TestBed                                } from '@angular/core/testing';
import { Provider, PLATFORM_ID, FactoryProvider } from '@angular/core';
import { ɵPLATFORM_BROWSER_ID                   } from '@angular/common';

import { configureGoogleMapsTestingModule } from '@bespunky/angular-google-maps/testing';

export interface ProviderTestConfig
{
    platform? : any;
    providers?: Provider[];
}

export function configTestDefaults(config: ProviderTestConfig)
{
    return {
        platform : config.platform  || ɵPLATFORM_BROWSER_ID,
        providers: config.providers || []
    };
}

export async function setupFactoryProviderTest(testedProvider: FactoryProvider, config: ProviderTestConfig = {})
{
    const factory                 = testedProvider.useFactory;
    const { platform, providers } = configTestDefaults(config);
    
    providers.push(
        { provide: PLATFORM_ID, useValue: platform  },
        testedProvider,
    );

    const { api, spies: { runOutsideAngular } } = await configureGoogleMapsTestingModule({
        customize: def => def.providers = providers
    });

    const producedValue = TestBed.inject(testedProvider.provide);

    return { api, runOutsideAngular, factory, producedValue };
}
