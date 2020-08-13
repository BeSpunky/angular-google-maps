import { Observable } from 'rxjs';
import { fakeAsync, tick, ComponentFixture                 } from '@angular/core/testing';
import { Component, ViewChild, SimpleChanges, SimpleChange } from '@angular/core';

import { configureGoogleMapsTestingModule                   } from '@bespunky/angular-google-maps/testing';
import { MockComponent, MockEmittingWrapper, MockNative     } from '@bespunky/angular-google-maps/core/testing';
import { GoogleMapsComponentApiService, GoogleMapsEventData } from '@bespunky/angular-google-maps/core';

describe('GoogleMapsComponentApiService', () =>
{
    let api        : GoogleMapsComponentApiService;
    let fixture    : ComponentFixture<TestHost>;
    let testHost   : TestHost;
    let component  : MockComponent;
    let handleClick: jasmine.Spy;

    beforeEach(async () =>
    {
        ({ componentApi: api, fixture, component: testHost } = await configureGoogleMapsTestingModule({
            componentType: TestHost,
            customize: (def) => def.declarations.push(MockComponent)
        }));

        // Allow angular to create the inner component and fetch it with ViewChild
        fixture.detectChanges();

        component   = testHost.component;
        handleClick = spyOn(testHost, 'handleClick');
    });

    describe('basically', () =>
    {
        it('should be created', () => expect(api).toBeTruthy());
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
            spyOn(component.wrapper, 'setSomething').and.callThrough();

            const newValue = 10;
            const changes: SimpleChanges = { something: new SimpleChange(1, newValue, true) };

            api.delegateInputChangesToNativeObject(changes, component.wrapper);

            expect(component.wrapper.setSomething).toHaveBeenCalledTimes(1);
            expect(component.wrapper.native.something).toBe(newValue);
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
    @ViewChild(MockComponent)
    public component: MockComponent;

    public handleClick(e: GoogleMapsEventData)
    {

    }
}