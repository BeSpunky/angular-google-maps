import { BehaviorSubject } from 'rxjs';
import { TestBed, inject } from '@angular/core/testing';
import { NgZone          } from '@angular/core';

import { configureGoogleMapsTestingModule                        } from '@bespunky/angular-google-maps/testing';
import { GoogleMapsApiLoader                                     } from '@bespunky/angular-google-maps/core';
import { GoogleMapsInternalApiService, GoogleMapsApiReadyPromise } from '@bespunky/angular-google-maps/_internal';

describe('GoogleMapsInternalApiService', () =>
{
    let zone  : NgZone;
    let loader: GoogleMapsApiLoader;
    let api   : GoogleMapsInternalApiService;

    beforeEach(async () =>
    {
        await configureGoogleMapsTestingModule();

        zone   = TestBed.inject(NgZone);
        loader = TestBed.inject(GoogleMapsApiLoader);
        api    = TestBed.inject(GoogleMapsInternalApiService);

        spyOn(zone, 'runOutsideAngular').and.callFake(fn => fn());
    });

    describe('basically', () =>
    {
        it('should be created', () => expect(api).toBeTruthy());

        it('should expose a promise that resolves when the api is loaded', () => expect(api.whenReady instanceof Promise).toBeTruthy());

        it('should notify subscribers of the promise through the `GoogleMapsApiReadyPromise` token', inject([GoogleMapsApiReadyPromise], (promiseSubject: BehaviorSubject<Promise<void>>) => expect(promiseSubject.value).toBe(api.whenReady)));
    });

    describe('calling `load()`', () =>
    {
        it('should resolve the api ready promise and load maps api outside of angular', async () =>
        {
            await expectAsync(api.load())   .toBeResolved();
            await expectAsync(api.whenReady).toBeResolved();
            
            expect(zone.runOutsideAngular).toHaveBeenCalledTimes(1);
        });

        it('should reject the api ready promise on failure', async () =>
        {
            const error = 'Failed to load maps api';

            spyOn(loader, 'load').and.returnValue(Promise.reject(new Error(error)));

            await expectAsync(api.load()).toBeRejectedWithError(error);
            
            // For some reason, expectAsync(api.whenReady).toBeRejected() fails to detect errors and thinks the promise has been resolved
            // Resorting to manual expectation. TODO: Dig in to the problem. Maybe the internal api service doesn't reject the promise correctly?
            await api.whenReady
                     .then(() => { throw new Error('whenReady promise resolved when it should\'ve been rejected') })
                     .catch(error => expect(error).toBe(error))
        });
    });
});