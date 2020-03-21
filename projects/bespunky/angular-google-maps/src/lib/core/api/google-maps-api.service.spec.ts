import { BehaviorSubject } from 'rxjs';
import { NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GoogleMapsApiService } from './google-maps-api.service';
import { GoogleMapsApiReadyPromise } from './google-maps-api-ready.token';
import { configureGoogleMapsTestingModule, IGoogleMapsTestingModuleConfigOptions } from '../../testing/setup';

describe('GoogleMapsApiService', () =>
{
    let service: GoogleMapsApiService;
    let waitForApiPromiseCreation: BehaviorSubject<Promise<void>>;
    let tokenSubscribeSpy: jasmine.Spy;

    beforeEach(() =>
    {
        const waitToken = new BehaviorSubject<Promise<void>>(null);

        tokenSubscribeSpy = spyOn(waitToken, 'subscribe').and.callThrough();

        const testConfig: IGoogleMapsTestingModuleConfigOptions = {
            customize: (moduleDef) => moduleDef.providers.push({ provide: GoogleMapsApiReadyPromise, useValue: waitToken }),
            spies: { fakeRunOutsideAngular: false }
        };

        ({ api: service } = configureGoogleMapsTestingModule(testConfig));

        waitForApiPromiseCreation = TestBed.inject(GoogleMapsApiReadyPromise);
    });

    it('should create an instance', () => expect(service).toBeTruthy());

    it('should subscribe to the api promise creation observable and store the `mapsApiReady` promise', () =>
    {
        expect(tokenSubscribeSpy).toHaveBeenCalledTimes(1);

        waitForApiPromiseCreation.next(new Promise(() => ({})));

        expect((service as any).mapsApiReady instanceof Promise).toBeTruthy();
    });

    it('should allow retrieving the promise easily using the `whenReady` getter', () =>
    {
        const promise = new Promise<void>(() => ({}));

        waitForApiPromiseCreation.next(promise);

        expect(service.whenReady).toBe(promise);
    });

    it('should unsubscribe from the api promise creation observable on destroy', () =>
    {
        spyOn(waitForApiPromiseCreation, 'unsubscribe');

        service.ngOnDestroy();

        expect(waitForApiPromiseCreation.unsubscribe).toHaveBeenCalledTimes(1);
    });

    it('should allow running given function outside of angular when the maps api is ready', (done: DoneFn) =>
    {
        const promise = new Promise<void>((resolve) => resolve());

        waitForApiPromiseCreation.next(promise);

        const zone = TestBed.get(NgZone);

        const whenReadySpy = spyOnProperty(service, 'whenReady', 'get').and.callThrough();

        spyOn(zone, 'runOutsideAngular').and.callFake((fn: () => void) => fn());

        // This will call the fake `runOutsideAngular()` function which will have the `done()` function execute when the api promise resolves.
        // If the api promise doesn't resolve, `done()` will never be called and the test will fail.
        service.runOutsideAngular(done);

        // Expect the promise to be fetched and NgZone's function to be executed on the way to glory
        expect(whenReadySpy).toHaveBeenCalledTimes(1);
        expect(zone.runOutsideAngular).toHaveBeenCalledTimes(1);
    });
});
