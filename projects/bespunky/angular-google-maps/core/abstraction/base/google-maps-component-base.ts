import { OnChanges, SimpleChanges, Inject, Directive, ElementRef, Input } from '@angular/core';

import { GoogleMapsComponentApiService                 } from '../../api/google-maps-component-api.service';
import { WrapperFactory                                } from '../tokens/wrapper-factory.token';
import { EmittingWrapper, EmittingNativeWrapperFactory } from '../types/abstraction';

/**
 * Provides the basic lifecycle functionality for components and directives that expose functionalities of Google Maps API and its elements.
 * Extending this class will automatically:
 * - Create event emitters hooked to the native event raised by the native Google Maps object and assign them to members decorated with @Hook.
 * - Delegate any bound property changes to their corresponding native setter function on the native Google Maps object.
 * - Instantiate a new native wrapper object and expose it to the component's user.
 * 
 * Requirements for the magic to happen:
 * --- Must ---
 * 1. Create a component or a directive and extend `GoogleMapsComponentBase`.
 * 2. Define a factory provider for the `WrapperFactory` token on the new component / directive.
 * 
 * --- To expose native events as bindable template events ---
 * 3. Add `@Hook('native_name') @Output()` marked event emitters to the component / directive.
 * 
 * --- To expose native setters as bindable template attributes ---
 * 4. Add `@Input()` members for getters/setters you would like to expose. Use the native setter function name and omit the 'set' part to name your inputs.
 * 
 * @see GoogleMapComponent source code for an example.
 */
@Directive()
export abstract class GoogleMapsComponentBase<TWrapper extends EmittingWrapper>
           implements OnChanges
{
    private nativeWrapper: TWrapper;

    @Input() public custom: any;

    /**
     * Creates an instance of GoogleMapsComponentBase.
     * 
     * @param {GoogleMapsComponentApiService} api The instance of the component api service.
     * @param {EmittingNativeWrapperFactory<TWrapper>} createNativeWrapper The factory for creating the wrapper this component should work with. Must be provided by the component's providers.
     * @param {ElementRef} element The element created for the component.
     */
    constructor(protected api: GoogleMapsComponentApiService, @Inject(WrapperFactory) protected createNativeWrapper: EmittingNativeWrapperFactory<TWrapper>, protected element: ElementRef)
    {
        this.initNativeWrapper();
        this.initEmitters();
    }

    ngOnChanges(changes: SimpleChanges)
    {
        this.api.delegateInputChangesToNativeObject(changes, this.wrapper);
    }

    /**
     * The instance of the wrapper used by the component to delegate functionality to the native object.
     *
     * @readonly
     * @type {TWrapper} The type of wrapper this component works with.
     */
    public get wrapper(): TWrapper
    {
        return this.nativeWrapper;
    }

    /**
     * Creates the native wrapper instance for this component and sets it to the `wrapper` property.
     * The default implementation simply calls the provided wrapper factory without specifying options.
     * Override this method to change implementation.
     * 
     * @protected
     * @virtual
     */
    protected initNativeWrapper(): void
    {
        this.nativeWrapper = this.createNativeWrapper(this.element);
    }
    
    /**
     * Executed by the constructor, before angular attempts to bind events. Calls the `api.hookAndSetEmitters()` method with the appropriate implementation.
     * The default call is `api.hookAndSetEmitters(this)` which will hook native events to this component instance using the inner wrapper
     * and no event filtering. Override this method to change implementation.
     * 
     * @protected
     * @virtual
     */
    protected initEmitters()
    {
        this.api.hookAndSetEmitters(this);
    }
}
