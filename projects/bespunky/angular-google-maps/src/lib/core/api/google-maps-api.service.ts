import * as _ from 'lodash';
import { Injectable, NgZone, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { GoogleMapsApiReadyPromise } from './google-maps-api-ready.token';
import { GoogleMapsConfig } from '../config/google-maps-config';
import { EventDataTransformService } from '../../utils/transform/event-data-transform.service';
import { GeometryTransformService } from '../../utils/transform/geometry-transform.service';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GoogleMapsApiService
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
        this.waitForApiPromiseCreation.pipe(take(1)).subscribe(promise => this.mapsApiReady = promise);
    }

    public get whenReady(): Promise<void>
    {
        return this.mapsApiReady;
    }

    public runOutsideAngular<TResult>(fn: () => TResult): TResult
    {
        return this.zone.runOutsideAngular(fn);
    }

    public runInsideAngular<TResult>(fn: () => TResult): TResult
    {
        return this.zone.run(fn);
    }
    
    public runOutsideAngularWhenReady<TResult>(fn: () => TResult): Promise<TResult>
    {
        return this.zone.runOutsideAngular(() => this.whenReady.then(fn));
    }

    public runInsideAngularWhenReady<TResult>(fn: () => TResult): Promise<TResult>
    {
        return this.zone.run(() => this.whenReady.then(fn));
    }
}
