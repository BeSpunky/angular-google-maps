import { BehaviorSubject } from 'rxjs';
import { OnInit, OnDestroy, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { promiseLater } from '@bespunky/angular-zen';

import { GoogleMapsEventsMap } from '../types/google-maps-events-map.type';
import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';
import { EmittingNativeWrapperFactory } from '../types/native-wrapper-provider.type';
import { WrapperFactory } from './wrapper-factory.token';
import { IGoogleMap } from '../../../google-map/i-google-map';
import { EventsMap } from '../events/event-map.token';
import { CurrentMap } from '../../../google-map/component/current-map.provider';
import { GoogleMap } from '../../../google-map/google-map';
import { WrapperInputSymbol } from '../../decorators/wrapper-input.decorator';

export abstract class GoogleMapsLifecycleBase implements OnInit, OnDestroy, OnChanges
{
    private waitForComponentInit: { promise: Promise<void>, resolve: () => void, reject: () => any };
    
    public nativeWrapper: IGoogleMapsNativeObjectEmittingWrapper;

    public abstract options?: any;

    constructor(
        protected api: GoogleMapsInternalApiService,
        @Inject(WrapperFactory) private createNativeWrapper: EmittingNativeWrapperFactory,
        @Inject(EventsMap                   ) private eventsMap          : GoogleMapsEventsMap,
        @Inject(CurrentMap                  ) private currentMap         : BehaviorSubject<IGoogleMap>
    )
    {
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

    private initNativeWrapper(): void
    {
        const wrapperInputName = Reflect.getMetadata(WrapperInputSymbol, this);
        
        if (!wrapperInputName) console.warn(`[${(this as any).constructor.name}] No wrapper input property has been set for this component. Wrapper cannot be set by component users. See @WrapperInput() for more info.`);

        this.nativeWrapper = this[wrapperInputName] || this.createNativeWrapper(this.options);

        // The map object is provided to the different factories when instantiating wrappers.
        // This is the most immediate place after instantiation to notify the system of the new GoogleMap object.
        if (this.nativeWrapper instanceof GoogleMap)
            this.currentMap.next(this.nativeWrapper);
    }
}
