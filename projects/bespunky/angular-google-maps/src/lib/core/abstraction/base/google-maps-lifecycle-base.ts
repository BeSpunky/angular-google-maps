import { OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { promiseLater } from '@bespunky/angular-zen';

import { GoogleMapsEventsMap } from '../../types/google-maps-events-map.type';
import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';

export abstract class GoogleMapsLifecycleBase implements OnInit, OnDestroy, OnChanges
{
    private waitForComponentInit: { promise: Promise<void>, resolve: () => void, reject: () => any };
    public nativeWrapper: IGoogleMapsNativeObjectEmittingWrapper;

    constructor(protected eventsMap: GoogleMapsEventsMap, protected api: GoogleMapsInternalApiService)
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
        this.nativeWrapper = this.nativeWrapperInput || this.createNativeWrapper();
    }

    /**
     * Derived components should allow component users to assign their own native wrapper in their templates.
     * This getter should return the member marked as `@Input()` which holds that wrapper passed from the template user.
     * If this is `null` or `undefined` at the moment of instantiation, a new wrapper will be created automaticlly using `createNativeWrapper()`.
     * Event hooking and property delegation will be done with that wrapper only.
     * 
     * @readonly
     * @protected
     * @abstract
     */
    protected abstract get nativeWrapperInput(): IGoogleMapsNativeObjectEmittingWrapper;
    /**
     * Should create a new wrapper of the type that corresponds to the component (e.g. `GoogleMap` for `GoogleMapComponent`, `GoogleMapsMarker` for `GoogleMapsMarkerDirective`, etc.).
     *
     * @protected
     * @abstract
     * @returns {IGoogleMapsNativeObjectEmittingWrapper} A new native wrapper corresponding to the component type.
     */
    protected abstract createNativeWrapper(): IGoogleMapsNativeObjectEmittingWrapper;
}
