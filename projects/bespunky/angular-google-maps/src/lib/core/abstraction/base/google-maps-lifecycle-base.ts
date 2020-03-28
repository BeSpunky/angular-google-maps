import { BehaviorSubject } from 'rxjs';
import { OnInit, OnDestroy, OnChanges, SimpleChanges, Inject, Optional } from '@angular/core';
import { promiseLater } from '@bespunky/angular-zen';

import { GoogleMapsEventsMap } from '../types/google-maps-events-map.type';
import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';
import { EmittingNativeWrapperFactory } from '../types/native-wrapper-provider.type';
import { WrapperFactory } from '../tokens/wrapper-factory.token';
import { CurrentMap } from '../tokens/current-map.token';
import { IGoogleMap } from '../../../google-map/i-google-map';
import { EventsMap } from '../events/event-map.token';
import { GoogleMap } from '../../../google-map/google-map';
import { WrapperInputSymbol } from '../../decorators/wrapper-input.decorator';

/**
 * Provides the basic lifecycle functionality for components and directives that expose functionalities of Google Maps API and its elements.
 * Extending this class will automatically:
 * - Hook event emitters to native events raised by the native Google Maps object and unhook them on destruction.
 * - Delegate any bound property changes to their corresponding native setter function on the native Google Maps object.
 * - Detect if a native object wrapper was assigned by the component's user and generate use it.
 * - Instantiate a new native wrapper object if not assigned by the component's user and expose it to the component's user.
 * 
 * Requirements for the magic to happen:
 * --- Must ---
 * 1. Create a component or a directive.
 * 2. extend `GoogleMapsLifecycleBase`.
 * 3. Define factory providers for the `WrapperFactory` tokens.
 * 4. If this is a map component, add `CurrentMapProvider` to the providers array (see `CurrentMap` token for more info).
 * 5. Expose a public member of the type of your native wrapper and decorate it with @WrapperInput(). This is step is not a must but it will keep
 *    the flexible design of the library which allows component users to specify their own wrapper instances and implementation.
 * 
 * --- To expose native events as bindable template events ---
 * 5. Define a provider for the `EventsMap` token to specify the native event names and their corresponding angular `EventEmitter` members.
 * 6. Add `@Output()` marked event emitters to the component / directive.
 * 
 * --- To expose native setters as bindable template attributes ---
 * 7. Add `@Input()` members for getters/setters you would like to expose. Use the native setter function name and omit the 'set' part to name your inputs.
 * 
 * @see GoogleMapsComponent source code for an example.
 * 
 */
export abstract class GoogleMapsLifecycleBase implements OnInit, OnDestroy, OnChanges
{
    private waitForComponentInit: { promise: Promise<void>, resolve: () => void, reject: () => any };
    private wrapperInputName: string;

    public abstract options?: any;

    constructor(
        protected api: GoogleMapsInternalApiService,
        @Inject(WrapperFactory)             private createNativeWrapper: EmittingNativeWrapperFactory,
        @Inject(CurrentMap    )             private currentMap         : BehaviorSubject<IGoogleMap>,
        @Inject(EventsMap     ) @Optional() private eventsMap          : GoogleMapsEventsMap = []
    )
    {
        this.wrapperInputName = Reflect.getMetadata(WrapperInputSymbol, this) || 'nativeWrapperInput';
    
        // initNativeWrapper cannot be called here because the map extending component hasn't been initialized yet.
        // If the component hasn't initialized yet, the wrapper hasn't either.
        // A promise is to initialize it is instantiated here and resolved after full component init (see `ngOnInit()`).
        this.waitForComponentInit = promiseLater();
    }

    ngOnInit()
    {
        this.initNativeWrapper();

        this.waitForComponentInit.resolve();

        this.api.hookEmitters(this, this.eventsMap);
    }

    ngOnDestroy()
    {
        this.api.unhookEmitters(this.nativeWrapper, this.eventsMap);
    }

    ngOnChanges(changes: SimpleChanges)
    {
        // `ngOnChanges()` is called before `ngOnInit()`, meaning before the wrapper has initialized.
        // Wait for full component initialization and delegate the changes.
        this.waitForComponentInit.promise.then(() => this.api.delegateInputChangesToNativeObject(changes, this.nativeWrapper));
    }

    public get nativeWrapper(): IGoogleMapsNativeObjectEmittingWrapper
    {
        return this[this.wrapperInputName];
    }

    private initNativeWrapper(): void
    {
        if (!this.wrapperInputName) console.warn(`[${(this as any).constructor.name}] No wrapper input property has been set for this component. Component users will not be able to bind their wrapper. See @WrapperInput() for more info.`);

        // Either component user has already set a wrapper through the tempalte, or it will be created using the factory and assigned to the input
        if (!this.nativeWrapper) this[this.wrapperInputName] = this.createNativeWrapper(this.options);

        // The map object is provided to the different factories when instantiating wrappers.
        // This is the most immediate place after instantiation to notify child components of the new GoogleMap object.
        if (this.nativeWrapper instanceof GoogleMap)
            this.currentMap.next(this.nativeWrapper);
    }
}
