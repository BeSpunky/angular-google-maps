import { BehaviorSubject, Observable } from 'rxjs';
import { NgZone, Component, ViewChild, SimpleChanges, SimpleChange } from '@angular/core';
import { TestBed, inject, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';

import { GoogleMapsInternalApiService } from './google-maps-internal-api.service';
import { GoogleMapsApiReadyPromise } from './loader/google-maps-api-ready.token';
import { GoogleMapsApiLoader } from './loader/google-maps-api-loader';
import { configureGoogleMapsTestingModule } from '../../testing/core/setup.spec';
import { MockComponentWithLifecycle } from '../abstraction/testing/src/mock-component.spec';
import { GoogleMapsEventData } from '../abstraction/events/google-maps-event-data';
import { MockEmittingWrapper } from '../abstraction/testing/src/mock-emitting-wrapper.spec';
import { MockNative } from '../abstraction/testing/src/mock-native.spec';

describe('GoogleMapsInternalApiService', () =>
{
    let zone       : NgZone;
    let loader     : GoogleMapsApiLoader;
    let api        : GoogleMapsInternalApiService;
    let fixture    : ComponentFixture<TestHost>;
    let testHost   : TestHost;
    let component  : MockComponentWithLifecycle;
    let handleClick: jasmine.Spy;

    beforeEach(async () =>
    {
        ({ internalApi: api, fixture, component: testHost } = await configureGoogleMapsTestingModule({
            componentType: TestHost,
            customize: (def) => def.declarations.push(MockComponentWithLifecycle)
        }));

        zone   = TestBed.inject(NgZone);
        loader = TestBed.inject(GoogleMapsApiLoader);

        // Allow angular to create the inner component and fetch it with ViewChild
        fixture.detectChanges();

        component   = testHost.component;
        handleClick = spyOn(testHost, 'handleClick');

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

    describe('calling `hookAndSetEmitters()', () =>
    {
        // As angular already applied event binding to the observables created on construction time.
        // Tests calling hookAndSetEmitters will replace the observables in the component but will
        // not updating angular's event binding, therefore they must manually subscribes to the new observables.

        it('should hook events and assign observables to an emitting component', () =>
        {
            expect(component.click instanceof Observable).toBeTruthy();
            
            component.wrapper.events.raise(component.NativeClickEventName);
            
            const event = handleClick.calls.mostRecent().args[0] as GoogleMapsEventData;

            expect(event.nativeEmitter).toBe(component.wrapper.native);
        });

        it('should allow hooking events to a wrapper external to the component', (done: DoneFn) =>
        {
            const secondWrapper = new MockEmittingWrapper(new MockNative());

            api.hookAndSetEmitters(component, secondWrapper);

            component.click.subscribe((e: GoogleMapsEventData) =>
            {
                expect(e.emitter).toBe(secondWrapper);
                expect(e.nativeEmitter).toBe(secondWrapper.native);

                done();
            });

            secondWrapper.events.raise(component.NativeClickEventName);
        });

        it('should allow adding a filter to hooked events', fakeAsync(() =>
        {
            const shouldEmitArgs    = { shouldEmit: true };
            const shouldNotEmitArgs = { shouldEmit: false };

            const handler = jasmine.createSpyObj('eventHandler', ['handle']);

            api.hookAndSetEmitters(component, null, (event) => event.nativeArgs[0].shouldEmit);

            component.click.subscribe(handler.handle);

            const events = component.wrapper.events;

            events.raise(component.NativeClickEventName, shouldEmitArgs);    tick();
            events.raise(component.NativeClickEventName, shouldNotEmitArgs); tick();
            events.raise(component.NativeClickEventName, shouldEmitArgs);    tick();

            expect(handler.handle).toHaveBeenCalledTimes(2);
        }));

        it('should hook observable unsubscribes to the native object', fakeAsync(() =>
        {
            const nativeListeners = component.wrapper.events.listeners[component.NativeClickEventName];

            expect(nativeListeners.length).toBe(1);

            fixture.destroy();

            expect(nativeListeners.length).toBe(0);

            component.wrapper.events.raise(component.NativeClickEventName); tick();

            expect(testHost.handleClick).not.toHaveBeenCalled();
        }));

        it('should transform and wrap native event args', () =>
        {
            const latLngLiteral = { lat: 20, lng: 20 };
            const latLng        = new google.maps.LatLng(latLngLiteral);
            const nativeArgs    = { latLng };
                
            component.wrapper.events.raise(component.NativeClickEventName, nativeArgs);
            
            const event = handleClick.calls.mostRecent().args[0] as GoogleMapsEventData;

            expect(event.eventName        ).toBe   ('click',                     'wrong event name');
            expect(event.emitter          ).toBe   (component.wrapper,           'wrong emitter');
            expect(event.associatedEmitter).toBe   (component.wrapper,           'wrong delegated emitter');
            expect(event.nativeEmitter    ).toBe   (component.wrapper.native,    'wrong native emitter');
            expect(event.nativeArgs[0]    ).toBe   (nativeArgs,                  'wrong native event args');
            expect(event.args[0]          ).toEqual({ position: latLngLiteral }, 'wrong event args');
        });
    });

    describe('calling `delegateInputChangesToNativeObject()`', () =>
    {        
        it('should delegate input changes to their corresponding native setter', () =>
        {
            spyOn(component.wrapper, 'setProperty').and.callThrough();

            const newValue = 10;
            const changes: SimpleChanges = { property: new SimpleChange(1, newValue, true) };

            api.delegateInputChangesToNativeObject(changes, component.wrapper);

            expect(component.wrapper.setProperty).toHaveBeenCalledTimes(1);
            expect(component.wrapper.native.property).toBe(newValue);
        });

        it('should ignore inputs with not setter implementation on the wrapper', () =>
        {
            const newValue = 10;
            const changes: SimpleChanges = { nonExistantProperty: new SimpleChange(1, newValue, true) };

            expect(() => api.delegateInputChangesToNativeObject(changes, component.wrapper)).not.toThrow();
        });
    });
});

@Component({
    template: '<test-lifecycle (click)="handleClick($event)"></test-lifecycle>'
})
class TestHost
{
    @ViewChild(MockComponentWithLifecycle)
    public component: MockComponentWithLifecycle;

    public handleClick(e: GoogleMapsEventData)
    {

    }
}