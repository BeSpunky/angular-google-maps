import { OnChanges, SimpleChanges, Inject } from '@angular/core';

import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';
import { EmittingNativeWrapperFactory } from '../types/native-wrapper-provider.type';
import { WrapperFactory } from '../tokens/wrapper-factory.token';
import { IGoogleMapsNativeObject } from '../native/i-google-maps-native-object';

/**
 * Provides the basic lifecycle functionality for components and directives that expose functionalities of Google Maps API and its elements.
 * Extending this class will automatically:
 * - Create event emitters hooked to the native event raised by the native Google Maps object and assign them to members decorated with @Hook.
 * - Delegate any bound property changes to their corresponding native setter function on the native Google Maps object.
 * - Instantiate a new native wrapper object and expose it to the component's user.
 * 
 * Requirements for the magic to happen:
 * --- Must ---
 * 1. Create a component or a directive.
 * 2. extend `GoogleMapsLifecycleBase`.
 * 3. Define factory providers for the `WrapperFactory` tokens.
 * 
 * --- To expose native events as bindable template events ---
 * 4. Add `@Hook('native_name') @Output()` marked event emitters to the component / directive.
 * 
 * --- To expose native setters as bindable template attributes ---
 * 5. Add `@Input()` members for getters/setters you would like to expose. Use the native setter function name and omit the 'set' part to name your inputs.
 * 
 * @see GoogleMapsComponent source code for an example.
 */
export abstract class GoogleMapsLifecycleBase<TWrapper extends IGoogleMapsNativeObjectEmittingWrapper<IGoogleMapsNativeObject>>
                implements OnChanges
{
    private nativeWrapper: TWrapper;

    constructor(protected api: GoogleMapsInternalApiService, @Inject(WrapperFactory) protected createNativeWrapper: EmittingNativeWrapperFactory<TWrapper>)
    {
        this.initNativeWrapper();
        this.initEmitters();
    }

    ngOnChanges(changes: SimpleChanges)
    {
        this.api.delegateInputChangesToNativeObject(changes, this.wrapper);
    }

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
        this.nativeWrapper = this.createNativeWrapper();
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
