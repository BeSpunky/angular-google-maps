/**
 * Provides util functions to quicker setup of tests.
 */

import { DebugElement, ElementRef, Type } from '@angular/core';
import { TestModuleMetadata, TestBed, ComponentFixture } from '@angular/core/testing';

import { GoogleMapsModule as GoogleMapsSyncModule, GoogleMapsApiLoader, NoOpGoogleMapsApiLoader, GoogleMapsInternalApiService, GoogleMapsApiService, } from '@bespunky/angular-google-maps/core';
import { GoogleMapsModule as GoogleMapsAsyncModule, GoogleMapsConfig } from '@bespunky/angular-google-maps/async';


/** The default dummy config to use when loading the `GoogleMapsModule` for testing. */
export const defaultTestApiConfig: GoogleMapsConfig = {
    apiUrl: { key: 'testing-key' }
};

/**
 * Creates a `TestModuleMetadata` object that can be passed into `TestBed.configureTestingModule()` in order to
 * imprort the `GoogleMapsModule` from the @bespunky/angular-google-maps/core package, with automatically provides
 * `NoOpGoogleMapsApiLoader` as the `GoogleMapsApiLoader` token.
 *
 * @export
 * @returns {TestModuleMetadata} A TestBed-ready module configuration.
 */
export function createGoogleMapsSyncTestModuleMetadata(): TestModuleMetadata
{
    return {
        imports: [GoogleMapsSyncModule.forRoot()]
    };
}

/**
 * Creates a `TestModuleMetadeta` object that can be passed into `TestBed.configureTestingModule()` in order to
 * import the `GoogleMapsModule` from the async package, and allow DI without actually downloading the API from google.
 * This changes the default `GoogleMapsApiLoader` provider to the `NoOpGoogleMapsApiLoader`.
 *
 * @export
 * @param [config] (Optional) The module configuration to use when creating the module. Default is `defaultTestApiConfig`
 * @returns A TestBed-ready module configuration.
 */
export function createGoogleMapsAsyncTestModuleMetadata(config?: GoogleMapsConfig): TestModuleMetadata
{
    return {
        imports: [GoogleMapsAsyncModule.forRoot(config || defaultTestApiConfig)],
        providers: [
            // Replace the script loader service so google api script will not be downloaded
            { provide: GoogleMapsApiLoader, useClass: NoOpGoogleMapsApiLoader }
        ]
    };
}

/**
 * Creates a jasmine spy on the `runOutsideAngular()` or `runInsideAngular()` method of the api which fakes its execution.
 * The fake implementation skips actually running the code outside/outside of angular and proceeds with executing
 * it directly (when the api is ready to use).
 *
 * @export
 * @param {GoogleMapsApiService} api The api instance to spy on.
 * @returns {jasmine.Spy} A jasmine spy which can be used to count calls to `api.runOutsideAngular()`.
 */
export function fakeTheRunXsideAngularMethod(api: GoogleMapsApiService, methodName: 'runInsideAngular' | 'runOutsideAngular'): jasmine.Spy
{
    return spyOn(api, methodName).and.callFake((fn: () => void) => fn());
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
    /** (Optional) `true` to use the async maps module; otherwise `false`. Default is `true`. */
    async?: boolean,
    /** (Optional) Custom configuration for the Google Maps API. Ignored when `async` if `false`.  */
    moduleConfig?: GoogleMapsConfig,
    /** (Optional) A function used to apply additional changes to the module definition before creating the TestBed. */
    customize?: (moduleDef: TestModuleMetadata) => void;
    /**
     * (Optional) The type of component being tested. If specified, will declare the component, compile it, and extract
     * the fixture, component, debugElement, and the native element objects.
     */
    componentType?: Type<TComponent>,
    /** (Optional) A function to execute before the component is created. Example use case could be spying on a component's constructor. */
    beforeComponentInit?: (api: GoogleMapsApiService, internalApi: GoogleMapsInternalApiService) => void,
    /** (Optional) Configures the automation of jasmine spies. */
    spies?: {
        /** `true` to fake the execution of `api.runInsideAngular()` (@see `fakeTheRunXsideAngularMethod()`); `false` to spy and call through. Default is `true`. */
        fakeRunInsideAngular?: boolean
        /** `true` to fake the execution of `api.runOutsideAngular()` (@see `fakeTheRunXsideAngularMethod()`); `false` to spy and call through. Default is `true`. */
        fakeRunOutsideAngular?: boolean
    }
}

const defaultModuleConfigOptions: IGoogleMapsTestingModuleConfigOptions = {
    async: true,
    spies: {
        fakeRunInsideAngular: true,
        fakeRunOutsideAngular: true
    }
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
export async function configureGoogleMapsTestingModule<TComponent>(options?: IGoogleMapsTestingModuleConfigOptions)
{
    let fixture     : ComponentFixture<TComponent>;
    let component   : TComponent;
    let debugElement: DebugElement;
    let element     : ElementRef;

    options = Object.assign({}, defaultModuleConfigOptions, options);

    // Create the basic testing configuration
    const moduleConfig = options.async ? createGoogleMapsAsyncTestModuleMetadata(options.moduleConfig) : createGoogleMapsSyncTestModuleMetadata();
    // Get the type of the component being compiled, if there is one
    const componentType = options?.componentType;

    // If there is a component to compile, declare it
    if (componentType)
        moduleConfig.declarations = [options.componentType];

    // If there are any additional customizations to be done to the module definition, run them
    if (options.customize)
        options.customize(moduleConfig);
    
    // Create the TestBed
    const testBed = TestBed.configureTestingModule(moduleConfig);

    // Retrieve useful services and tools
    const api         = TestBed.inject(GoogleMapsApiService);
    const internalApi = TestBed.inject(GoogleMapsInternalApiService);

    const runInsideAngular  = options.spies.fakeRunInsideAngular  ? fakeTheRunXsideAngularMethod(api, 'runInsideAngular')  : spyOn(api, 'runInsideAngular').and.callThrough();
    const runOutsideAngular = options.spies.fakeRunOutsideAngular ? fakeTheRunXsideAngularMethod(api, 'runOutsideAngular') : spyOn(api, 'runOutsideAngular').and.callThrough();

    const spies = { runInsideAngular, runOutsideAngular };

    if (options.beforeComponentInit)
        options.beforeComponentInit(api, internalApi);

    // If a component is being tested, compile it and retrieve its relevant instances
    if (componentType)
    {
        await testBed.compileComponents();

        fixture = TestBed.createComponent(componentType);

        component    = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element      = debugElement.nativeElement;
    }

    // Return all extracted services and objects for easier use
    return { fixture, component, debugElement, element, api, internalApi, spies };
}