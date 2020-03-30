import * as _ from 'lodash';
import { Injectable, NgZone, Inject, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GoogleMapsApiReadyPromise } from './google-maps-api-ready.token';
import { GoogleMapsConfig } from '../config/google-maps-config';
import { EventDataTransformService } from '../../utils/transform/event-data-transform.service';
import { GeometryTransformService } from '../../utils/transform/geometry-transform.service';

@Injectable({
    providedIn: 'root'
})
export class GoogleMapsApiService implements OnDestroy
{
    private mapsApiReady: Promise<void>;

    constructor(
        public config: GoogleMapsConfig,
        public eventsData: EventDataTransformService,
        public geometry: GeometryTransformService,
        private zone: NgZone,
        @Inject(GoogleMapsApiReadyPromise)
        private waitForApiPromiseCreation: BehaviorSubject<Promise<void>>)
    {
        // Fetch the promise created by the internal api and store it
        this.waitForApiPromiseCreation.subscribe(promise => this.mapsApiReady = promise);
    }

    ngOnDestroy()
    {
        this.waitForApiPromiseCreation.unsubscribe();
    }

    public get whenReady(): Promise<void>
    {
        return this.mapsApiReady;
    }

    public runOutsideAngular(fn: () => any): Promise<any>
    {
        return this.zone.runOutsideAngular(() => this.whenReady.then(fn));
    }

    public runInsideAngular(fn: () => any): Promise<any>
    {
        return this.zone.run(() => this.whenReady.then(fn));
    }
}
