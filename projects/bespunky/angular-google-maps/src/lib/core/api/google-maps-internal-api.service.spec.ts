import { BehaviorSubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { NgZone, EventEmitter, OnInit, SimpleChanges, SimpleChange } from '@angular/core';

import { GoogleMapsInternalApiService } from './google-maps-internal-api.service';
import { GoogleMapsApiReadyPromise } from './google-maps-api-ready.token';
import { GoogleMapsApiLoader } from '../loaders/google-maps-api-loader';
import { GoogleMapsLifecycleBase } from '../abstraction/angular/google-maps-lifecycle-base';
import { IGoogleMapsNativeObjectWrapper } from '../abstraction/angular/i-google-maps-native-object-wrapper';
import { GoogleMapsEventData } from '../abstraction/angular/events/google-maps-event-data';
import { createDefaultTestModuleConfig } from '../../testing/utils';

const EventsMapStub = [
    { name: 'Event1', reference: 'native_event1' },
    { name: 'Event2', reference: 'native_event2' }
];

class MockComponent extends GoogleMapsLifecycleBase implements OnInit
{
    // The callbacks passed-in when calling listenTo(). Stored so the native event could be fired and faked.
    public listeners: ((args: any) => void)[] = [];

    public event1: EventEmitter<void> = new EventEmitter();

    ngOnInit() { this.nativeWrapper = this.initNativeWrapper(); }

    protected initNativeWrapper(): IGoogleMapsNativeObjectWrapper
    {
        const native = {
            raiseEvent: (args: any) => this.listeners.forEach(handler => handler(args)),
            fakeProperty: null
        };

        return {
            listenTo: (eventName: string, handler: () => void) => this.listeners.push(handler),
            stopListeningTo: () => this.listeners = [],
            setFakeProperty(value: any) { native.fakeProperty = value; },
            native,
            custom: null,
        } as IGoogleMapsNativeObjectWrapper;
    }
}

describe('GoogleMapsInternalApiService', () =>
{
    let service: GoogleMapsInternalApiService;
    let tokenNextSpy: jasmine.Spy;
    let zone: NgZone;
    let loader: GoogleMapsApiLoader;
    let componentMock: MockComponent;

    beforeEach(() =>
    {
        const waitToken = new BehaviorSubject<Promise<void>>(null);

        tokenNextSpy = spyOn(waitToken, 'next').and.callThrough();

        const moduleConfig = createDefaultTestModuleConfig();
        moduleConfig.providers.push({ provide: GoogleMapsApiReadyPromise, useValue: waitToken });

        TestBed.configureTestingModule(moduleConfig);

        service = TestBed.get(GoogleMapsInternalApiService);
        zone = TestBed.get(NgZone);
        loader = TestBed.get(GoogleMapsApiLoader);

        spyOn(zone, 'runOutsideAngular').and.callFake((fn: () => void) => fn());
    });

    describe('basically', () =>
    {
        it('should be created', () => expect(service).toBeTruthy());

        it('should create a promise for later use and store it', () =>
        {
            expect(service.waitForApi).toBeTruthy();
            expect(service.waitForApi.promise instanceof Promise).toBeTruthy();
            expect(service.waitForApi.resolve instanceof Function).toBeTruthy();
            expect(service.waitForApi.reject instanceof Function).toBeTruthy();
        });

        it('should set the created promise to the `GoogleMapsApiReadyPromise` token', () =>
        {
            expect(tokenNextSpy).toHaveBeenCalledTimes(1);
            expect(tokenNextSpy.calls.mostRecent().args[0]).toBe(service.waitForApi.promise);
        });
    });

    describe('upon calling `load()`', () =>
    {
        it('should load google maps api script outside of angular and resolve the api promise', (done: DoneFn) =>
        {
            spyOn(loader, 'load').and.callFake(() => new Promise<void>(resolve => resolve()));
            spyOn(service.waitForApi, 'resolve').and.callFake(done);

            service.load();

            expect(zone.runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(loader.load).toHaveBeenCalledTimes(1);
        });

        it('should reject the api promise if the loader failed to fetch the script', (done: DoneFn) =>
        {
            spyOn(loader, 'load').and.callFake(() => new Promise<void>((resolve, reject) => reject()));
            spyOn(service.waitForApi, 'reject').and.callFake(done);

            service.load();

            expect(zone.runOutsideAngular).toHaveBeenCalledTimes(1);
            expect(loader.load).toHaveBeenCalledTimes(1);
        });
    });

    describe('upon calling `hookEmitters()', () =>
    {
        beforeEach(() =>
        {
            componentMock = new MockComponent(EventsMapStub, service);
            componentMock.ngOnInit();
        });

        it('should hook emitters but skip hooking events with no matching emitter or no observers', () =>
        {
            // Subscribe to the first event so it won't be skiped for having no observers
            componentMock.event1.subscribe(() => 'event1');

            spyOn(componentMock.nativeWrapper, 'listenTo').and.callThrough();

            service.hookEmitters(componentMock, EventsMapStub);

            // If listenTo() was called once, only one event1 got hooked and we won
            expect(componentMock.nativeWrapper.listenTo).toHaveBeenCalledTimes(1);
            expect(componentMock.listeners.length).toBe(1);
        });

        it('should create a callback that generates an event data object and emit the event', (done: DoneFn) =>
        {
            const eventArgs = { value: 'dummy' };

            // Subscribe to the first event so it won't be skiped for having no observers
            componentMock.event1.subscribe((eventData: GoogleMapsEventData) =>
            {
                expect(eventData.eventName).toBe('Event1');
                expect(eventData.emitter).toBe(componentMock.nativeWrapper);
                expect(eventData.args[0]).toEqual(eventArgs); // For unrecognized native args, the transformer should return the native args
                expect(eventData.nativeArgs[0]).toEqual(eventArgs);

                done();
            });

            service.hookEmitters(componentMock, EventsMapStub);

            componentMock.nativeWrapper.native.raiseEvent(eventArgs);
        });
    });

    describe('upon calling `unhookEmitters()`', () =>
    {
        beforeEach(() =>
        {
            componentMock = new MockComponent(EventsMapStub, service);
            componentMock.ngOnInit();
        });

        it('should remove all listeners from the native object', () =>
        {
            // Subscribe to the first event so it won't be skiped for having no observers
            componentMock.event1.subscribe(() => 'event1');

            service.hookEmitters(componentMock, EventsMapStub);

            expect(componentMock.listeners.length).toBe(1);

            spyOn(componentMock.nativeWrapper, 'stopListeningTo').and.callThrough();

            service.unhookEmitters(componentMock, EventsMapStub);

            expect(componentMock.nativeWrapper.stopListeningTo).toHaveBeenCalledTimes(EventsMapStub.length);
            expect(componentMock.listeners.length).toBe(0);
        });
    });

    describe('upon calling `delegateInputChangesToNativeObject()`', () =>
    {
        it('should pass any detected changes to the wrapper\'s appropriate setter', () =>
        {
            const newValue = 10;
            const changes: SimpleChanges = { fakeProperty: new SimpleChange(1, newValue, true) };

            const setterSpy = spyOn(componentMock.nativeWrapper as any, 'setFakeProperty').and.callThrough();

            service.delegateInputChangesToNativeObject(changes, componentMock.nativeWrapper);

            expect(setterSpy).toHaveBeenCalledTimes(1);
            expect(componentMock.nativeWrapper.native.fakeProperty).toBe(newValue);
        });
    });
});
