import { BehaviorSubject } from 'rxjs';
import { TestBed, inject, async } from '@angular/core/testing';
import { NgZone                 } from '@angular/core';

import { configureGoogleMapsTestingModule               } from '@bespunky/angular-google-maps/testing';
import { GoogleMapsApiReadyPromise, GoogleMapsApiLoader } from '@bespunky/angular-google-maps/core';
import { GoogleMapsInternalApiService                   } from '@bespunky/angular-google-maps/_internal';

describe('GoogleMapsInternalApiService', () =>
{
    let zone       : NgZone;
    let loader     : GoogleMapsApiLoader;
    let api        : GoogleMapsInternalApiService;

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
        it('should resolve the api ready promise and load maps api outside of angular', async(() =>
        {
            api.load();
        
            api.whenReady.then(() => expect(zone.runOutsideAngular).toHaveBeenCalledTimes(1));
        }));

        it('should reject the api ready promise on failure', async(() =>
        {
            spyOn(loader, 'load').and.returnValue(Promise.reject('Dummy Error: Failed to load maps api'));

            api.load();
        
            api.whenReady.catch(error => expect(error).toMatch(/Failed to load/));
        }));
    });
});