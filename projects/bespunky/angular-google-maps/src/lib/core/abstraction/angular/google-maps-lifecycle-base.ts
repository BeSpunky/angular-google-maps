import { OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { GoogleMapsEventsMap } from '../../types/google-maps-events-map.type';
import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
import { IGoogleMapsNativeObjectWrapper } from '../native/i-google-maps-native-object-wrapper';

export abstract class GoogleMapsLifecycleBase implements OnInit, OnDestroy, OnChanges
{
    private wrapperInitialized: { promise: Promise<void>, resolve: () => void, reject: () => any };
    public nativeWrapper: IGoogleMapsNativeObjectWrapper;

    constructor(protected eventsMap: GoogleMapsEventsMap, protected api: GoogleMapsInternalApiService)
    {
        // initNativeWrapper cannot be called here because the map extending component hasn't been initialized yet.
        // If the component hasn't initialized yet, the wrapper hasn't either.
        // A promise is to initialize it is instantiated here and resolved after full component init (see `ngOnInit()`).
        this.wrapperInitialized = { promise: null, resolve: null, reject: null };

        const promise = new Promise<void>((resolve, reject) =>
        {
            this.wrapperInitialized.resolve = resolve;
            this.wrapperInitialized.reject = reject;
        });

        this.wrapperInitialized.promise = promise;
    }

    ngOnInit()
    {
        this.nativeWrapper = this.initNativeWrapper();

        this.wrapperInitialized.resolve();

        this.api.hookEmitters(this, this.eventsMap, this.nativeWrapper);
    }

    ngOnDestroy()
    {
        this.api.unhookEmitters(this.eventsMap, this.nativeWrapper);
    }

    ngOnChanges(changes: SimpleChanges)
    {
        // `ngOnChanges()` is called before `ngOnInit()`, meaning before the wrapper has initialized.
        // Wait for full component initialization and delegate the changes.
        this.wrapperInitialized.promise.then(() => this.api.delegateInputChangesToNativeObject(changes, this.nativeWrapper));
    }

    protected abstract initNativeWrapper(): IGoogleMapsNativeObjectWrapper;
}
