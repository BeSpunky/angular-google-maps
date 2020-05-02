import { TestBed } from '@angular/core/testing';
import { NgZone  } from '@angular/core';

import { configureGoogleMapsTestingModule } from '@bespunky/angular-google-maps/testing';
import { GoogleMapsApiService             } from '@bespunky/angular-google-maps/core';

describe('GoogleMapsApiService', () =>
{
    let api : GoogleMapsApiService;
    let zone: NgZone;

    beforeEach(async () =>
    {
        ({ api } = await configureGoogleMapsTestingModule({
            spies: {
                fakeRunInsideAngular : false,
                fakeRunOutsideAngular: false
            }
        }));
        
        zone = TestBed.inject(NgZone);

        spyOn(zone, 'run').and.callFake(fn => fn());
        spyOn(zone, 'runOutsideAngular').and.callFake(fn => fn());
    });

    it('should create an instance', () => expect(api).toBeTruthy());

    it('should provide a promise for indicating that maps api is ready', () => expect(api.whenReady instanceof Promise).toBeTruthy());

    it('should allow access to the configuration passed to Google Maps API', () => expect(api.config).toBeDefined());
    
    it('should allow access event data transformation api', () => expect(api.eventsData).toBeDefined());
    
    it('should allow access geometry api', () => expect(api.geometry).toBeDefined());

    it('should bring code execution to angular context', () =>
    {
        const task = () => 'done';

        const result = api.runInsideAngular(task);

        expect(result).toBe('done');
        expect(zone.run).toHaveBeenCalledTimes(1);
    });

    it('should take code execution to outside of angular context', () =>
    {
        const task = () => 'done';

        const result = api.runOutsideAngular(task);

        expect(result).toBe('done');
        expect(zone.runOutsideAngular).toHaveBeenCalledTimes(1);
    });
    
    it('should bring code execution to angular context when Google Maps API is ready', async () =>
    {
        const task = () => 'done';

        const result = await api.runInsideAngularWhenReady(task);

        expect(result).toBe('done');
        expect(zone.run).toHaveBeenCalledTimes(1);
    });

    it('should take code execution to outside of angular context when Google Maps API is ready', async () =>
    {
        const task = () => 'done';

        const result = await api.runOutsideAngularWhenReady(task);

        expect(result).toBe('done');
        expect(zone.runOutsideAngular).toHaveBeenCalledTimes(1);
    });
});
