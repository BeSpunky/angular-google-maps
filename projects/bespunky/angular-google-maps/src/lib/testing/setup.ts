/**
 * Provides util functions to quicker setup of tests.
 */

import { DebugElement, ElementRef, Type } from '@angular/core';
import { TestModuleMetadata, TestBed, ComponentFixture } from '@angular/core/testing';

import { GoogleMapsModule } from '../google-maps.module';
import { GoogleMapsConfig } from '../core/config/google-maps-config';
import { GoogleMapsApiLoader } from '../core/loaders/google-maps-api-loader';
import { NoOpGoogleMapsApiLoader } from '../core/loaders/no-op-google-maps-api-loader';
import { GoogleMapsApiService } from '../core/api/google-maps-api.service';
import { GoogleMapsInternalApiService } from '../core/api/google-maps-internal-api.service';

/** The default dummy config to use when loading the `GoogleMapsModule` for testing. */
export const defaultTestApiConfig: GoogleMapsConfig = {
    apiUrl: 'dummyurl'
};

/**
 * Creates a `TestModuleMetadeta` object that can be passed into `TestBed.configureTestingModule()` in order to
 * import the `GoogleMapsModule` and allow DI without actually downloading the API from google.
 * This changes the default `GoogleMapsApiLoader` provider to the `NoOpGoogleMapsApiLoader`.
 *
 * @export
 * @param [config] (Optional) The module configuration to use when creating the module. Default is `defaultTestApiConfig`
 * @returns A TestBed-ready module configuration.
 */
export function createGoogleMapsTestModuleMetadata(config?: GoogleMapsConfig): TestModuleMetadata
{
    return {
        imports: [GoogleMapsModule.forRoot(config || defaultTestApiConfig)],
        providers: [
            // Replace the script loader service so google api script will not be downloaded
            { provide: GoogleMapsApiLoader, useClass: NoOpGoogleMapsApiLoader }
        ]
    };
}

/**
 * Creates a jasmine spy on the `runOutsideAngular()` method of the api which fakes its execution.
 * The fake implementation skips actually running the code outside of angular and proceeds with executing
 * it directly (when the api is ready to use).
 *
 * @export
 * @param {GoogleMapsApiService} api The api instance to spy on.
 * @returns {jasmine.Spy} A jasmine spy which can be used to count calls to `api.runOutsideAngular()`.
 */
export function fakeTheRunOutsideAngularMethod(api: GoogleMapsApiService): jasmine.Spy
{
    return spyOn(api, 'runOutsideAngular').and.callFake((fn: () => void) => api.whenReady.then(fn));
}

/**
 * Provides the structure supported for options to pass into the `configureGoogleMapsTestingModule()` function.
 *
 * @export
 * @interface GoogleMapsTestingModuleConfigOptions
 * @template TComponent
 */
export interface IGoogleMapsTestingModuleConfigOptions<TComponent = any>
{
    /** (Optional) Custom configuration for the Google Maps API. */
    moduleConfig?: GoogleMapsConfig,
    /**
     * (Optional) The type of component being tested. If specified, will declare the component, compile it, and extract
     * the fixture, component, debugElement, and the native element objects. */
    componentType?: Type<TComponent>,
    /** (Optional) A function used to apply additional changes to the module definition before creating the TestBed. */
    customize?: (moduleDef: TestModuleMetadata) => void;
    /** (Optional) Configures the automation of jasmine spies. */
    spies?: {
        /** `true` to fake the execution of `api.runOutsideAngular()` (@see `fakeTheRunOutsideAngularMethod()`); `false` to spy and call through. */
        fakeRunOutsideAngular?: boolean
    }
}

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
    let fixture: ComponentFixture<TComponent>;
    let component: TComponent;
    let debugElement: DebugElement;
    let element: ElementRef;

    // Create the basic testing configuration
    const moduleConfig = createGoogleMapsTestModuleMetadata(options?.moduleConfig);
    // Get the type of the component being compiled, if there is one
    const componentType = options?.componentType;

    // If there is a component to compile, declare it
    if (componentType)
        moduleConfig.declarations = [options.componentType];

    // If there are any additional customizations to be done to the module definition, run them
    if (options?.customize)
        options.customize(moduleConfig);
    
    // Create the TestBed
    const testBed = TestBed.configureTestingModule(moduleConfig);
    
    // If a component is being tested, compile it and retrieve its relevant instances
    if (componentType)
    {
        testBed.compileComponents();
        
        fixture = TestBed.createComponent(componentType);

        component    = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element      = debugElement.nativeElement;
    }

    // Retrieve useful services and tools
    const api         = TestBed.inject(GoogleMapsApiService);
    const internalApi = TestBed.inject(GoogleMapsInternalApiService);

    const fakeRunOutsideAngular = options?.spies?.fakeRunOutsideAngular !== false; // Forced equality with `false` as `undefined` is also possible
    const runOutsideAngular = fakeRunOutsideAngular ? fakeTheRunOutsideAngularMethod(api) : spyOn(api, 'runOutsideAngular').and.callThrough();

    // Return all extracted services and objects for easier use
    return { fixture, component, debugElement, element, api, internalApi, spies: { runOutsideAngular } };
}