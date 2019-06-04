import { OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { GoogleMapsEventsMap } from '../../types/google-maps-events-map.type';
import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
import { IGoogleMapsNativeObjectWrapper } from '../native/i-google-maps-native-object-wrapper';

export abstract class GoogleMapsLifecycleBase implements OnInit, OnDestroy, OnChanges
{
    protected nativeWrapper: IGoogleMapsNativeObjectWrapper;

    constructor(protected eventsMap: GoogleMapsEventsMap, protected api: GoogleMapsInternalApiService) { }

    ngOnInit()
    {
        this.nativeWrapper = this.initNativeWrapper();

        this.api.hookEmitters(this, this.eventsMap, this.nativeWrapper);
    }

    ngOnDestroy()
    {
        this.api.unhookEmitters(this.eventsMap, this.nativeWrapper);
    }

    ngOnChanges(changes: SimpleChanges)
    {
        this.api.delegateInputChangesToNativeObject(changes, this.nativeWrapper);
    }

    protected abstract initNativeWrapper(): IGoogleMapsNativeObjectWrapper;
}
