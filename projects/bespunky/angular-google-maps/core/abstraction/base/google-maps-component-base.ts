import { OnChanges, SimpleChanges, Inject, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { Destroyable                                                               } from '@bespunky/angular-zen/core';

import { GoogleMapsComponentApiService } from '../../api/google-maps-component-api.service';
import { EmittingWrapper               } from '../types/abstraction';
import { WrapperInstance               } from '../factories/tokens';

/**
 * Provides the basic lifecycle functionality for components and directives that expose functionalities of Google Maps API and its elements.
 * Extending this class will automatically:
 * - Create event emitters hooked to the native event raised by the native Google Maps object and assign them to members decorated with @Hook.
 * - Delegate any bound property changes to their corresponding native setter function on the native Google Maps object.
 * - Cause the injector to instantiate new wrapper and native objects and expose the wrapper to the component's user.
 * 
 * Requirements for the magic to happen:
 * --- Must ---
 * 1. Create a component or a directive and extend `GoogleMapsComponentBase`.
 * 2. Define a factory provider for the `NativeInstance` token on the new component / directive.
 * 2. Define a factory provider for the `WrapperInstance` token on the new component / directive.
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
              extends Destroyable
           implements OnChanges, OnDestroy
{
    @Input() public custom: any;

    /**
     * Creates an instance of GoogleMapsComponentBase.
     *
     * @param {GoogleMapsComponentApiService} api The instance of the component api service.
     * @param {TWrapper} wrapper The instance of the wrapper to use with this component. Should be provided at the extending component level using the `WrapperInstance` token.
     * @param {ElementRef} element The element created for the component.
     */
    constructor(protected api: GoogleMapsComponentApiService, @Inject(WrapperInstance) public readonly wrapper: TWrapper, protected element: ElementRef)
    {
        super();

        this.initEmitters();
    }

    ngOnChanges(changes: SimpleChanges)
    {
        this.api.delegateInputChangesToNativeObject(changes, this.wrapper);
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
