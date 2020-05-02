import { BehaviorSubject } from 'rxjs';
import { takeWhile       } from 'rxjs/operators';
import { Injectable, NgZone, Inject } from '@angular/core';

import { GoogleMapsApiReadyPromise } from '@bespunky/angular-google-maps/_internal';
import { EventDataTransformService } from './transform/event-data-transform.service';
import { GeometryTransformService  } from './transform/geometry-transform.service';

@Injectable({
    providedIn: 'root'
})
export class GoogleMapsApiService
{
    private mapsApiReady: Promise<void>;

    constructor(
        private zone      : NgZone,
        public  eventsData: EventDataTransformService,
        public  geometry  : GeometryTransformService,
        @Inject(GoogleMapsApiReadyPromise) private apiReadyPromise: BehaviorSubject<Promise<void>>)
    {
        // Fetch the promise created by the internal api and store it
        this.apiReadyPromise.pipe(takeWhile(promise => !promise, true)).subscribe(promise => this.mapsApiReady = promise);
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
