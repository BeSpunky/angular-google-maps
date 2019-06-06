import { OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { promiseLater } from '@bespunky/angular-zen';

import { GoogleMapsEventsMap } from '../../types/google-maps-events-map.type';
import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';

export abstract class GoogleMapsLifecycleBase implements OnInit, OnDestroy, OnChanges
{
    private waitForComponentInit: { promise: Promise<void>, resolve: () => void, reject: () => any };
    public nativeWrapper: IGoogleMapsNativeObjectWrapper;

    constructor(protected eventsMap: GoogleMapsEventsMap, protected api: GoogleMapsInternalApiService)
    {
        // initNativeWrapper cannot be called here because the map extending component hasn't been initialized yet.
        // If the component hasn't initialized yet, the wrapper hasn't either.
        // A promise is to initialize it is instantiated here and resolved after full component init (see `ngOnInit()`).
        this.waitForComponentInit = promiseLater();
    }

    ngOnInit()
    {
        this.nativeWrapper = this.initNativeWrapper();

        this.waitForComponentInit.resolve();

        this.api.hookEmitters(this, this.eventsMap);
    }

    ngOnDestroy()
    {
        this.api.unhookEmitters(this, this.eventsMap);
    }

    ngOnChanges(changes: SimpleChanges)
    {
        // `ngOnChanges()` is called before `ngOnInit()`, meaning before the wrapper has initialized.
        // Wait for full component initialization and delegate the changes.
        this.waitForComponentInit.promise.then(() => this.api.delegateInputChangesToNativeObject(changes, this.nativeWrapper));
    }

    protected abstract initNativeWrapper(): IGoogleMapsNativeObjectWrapper;
}
