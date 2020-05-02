/**
 * Provides util functions to quicker setup of tests for the async package.
 */

import { TestModuleMetadata} from '@angular/core/testing';

import { GoogleMapsApiLoader, NoOpGoogleMapsApiLoader } from '@bespunky/angular-google-maps/core';
import { GoogleMapsModule, GoogleMapsConfig           } from '@bespunky/angular-google-maps/async';
import
{
    IGoogleMapsTestingModuleConfigOptions as IGoogleMapsSyncTestingModuleConfigOptions,
    configureGoogleMapsTestingModule      as configureGoogleMapsSyncTestingModule
} from '@bespunky/angular-google-maps/core/testing';

/**
 * Creates a `TestModuleMetadeta` object that can be passed into `TestBed.configureTestingModule()` in order to
 * import the `GoogleMapsModule` **from the @bespunky/angular-google-maps/async package**, and allow DI without actually downloading the API from google.
 * This changes the default `GoogleMapsApiLoader` provider to the `NoOpGoogleMapsApiLoader`.
 *
 * @export
 * @param [config] (Optional) The module configuration to use when creating the module. Default is `defaultTestApiConfig`
 * @returns A TestBed-ready module configuration.
 */
export function createGoogleMapsTestModuleMetadata(config?: GoogleMapsConfig): TestModuleMetadata
{
    return {
        imports: [GoogleMapsModule.forRootAsync(config || defaultTestApiConfig)],
        providers: [
            // Replace the script loader service so google api script will not be downloaded
            { provide: GoogleMapsApiLoader, useClass: NoOpGoogleMapsApiLoader }
        ]
    };
}

/**
 * Provides the structure supported for options to pass into the `configureGoogleMapsTestingModule()` function.
 *
 * @export
 * @interface GoogleMapsTestingModuleConfigOptions
 * @template TComponent
 */
export interface IGoogleMapsTestingModuleConfigOptions<TComponent = any> extends IGoogleMapsSyncTestingModuleConfigOptions<TComponent>
{
    /** (Optional) Custom configuration for the Google Maps API. Ignored when `async` if `false`.  */
    moduleConfig?: GoogleMapsConfig
}

/** The default dummy config to use when loading the `GoogleMapsModule` for testing. */
export const defaultTestApiConfig: GoogleMapsConfig = {
    apiUrl: { key: 'testing-key' }
};

const defaultModuleConfigOptions: IGoogleMapsTestingModuleConfigOptions = {
    moduleConfig: defaultTestApiConfig
};

/**
 * Configures a basic testing module with common definitions for Google Maps components and extracts useful tools and services.
 * This should allow faster setup without the redundancy of declarations and extractions of services.
 * After calling this function, the caller can simply deconstruct the tools and use them.
 * 
 * @example let { api, component } = createGoogleMapsTestingModule({ componentType: GoogleMapsComponent });
 * @export
 * @template TComponent The type of the component being tested (if there is a component).
 * @param {IGoogleMapsTestingModuleConfigOptions} [options] (Optional) The options for the configuring the test module.
 * @returns The created tools and services, ready to use.
 */
export function configureGoogleMapsTestingModule<TComponent>(options?: IGoogleMapsTestingModuleConfigOptions)
{
    options = Object.assign({ createTestModuleMetadata: () => createGoogleMapsTestModuleMetadata(options.moduleConfig) }, defaultModuleConfigOptions, options);

    return configureGoogleMapsSyncTestingModule<TComponent>(options);
}