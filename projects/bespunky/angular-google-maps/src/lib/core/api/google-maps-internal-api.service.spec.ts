import { BehaviorSubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { NgZone, EventEmitter, OnInit, SimpleChanges, SimpleChange, Component } from '@angular/core';

import { GoogleMapsInternalApiService } from './google-maps-internal-api.service';
import { GoogleMapsApiReadyPromise } from './google-maps-api-ready.token';
import { GoogleMapsApiLoader } from '../loaders/google-maps-api-loader';
import { GoogleMapsLifecycleBase } from '../abstraction/base/google-maps-lifecycle-base';
import { GoogleMapsEventData } from '../abstraction/events/google-maps-event-data';
import { IGoogleMapsTestingModuleConfigOptions, configureGoogleMapsTestingModule } from '../../testing/setup';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { WrapperFactory } from '../abstraction/tokens/wrapper-factory.token';
import { EventsMap } from '../abstraction/events/event-map.token';
import { WrapperInput } from '../decorators/wrapper-input.decorator';
import { CurrentMapProvider } from '../../google-map/component/current-map.provider';

describe('GoogleMapsInternalApiService', () =>
{
    let service      : GoogleMapsInternalApiService;
    let tokenNextSpy : jasmine.Spy;
    let zone         : NgZone;
    let loader       : GoogleMapsApiLoader;
    let componentMock: MockComponent;

    beforeEach(async () =>
    {
        const waitToken = new BehaviorSubject<Promise<void>>(null);

        tokenNextSpy = spyOn(waitToken, 'next').and.callThrough();

        const testConfig: IGoogleMapsTestingModuleConfigOptions = {
            componentType: MockComponent,
            customize: (moduleDef) => moduleDef.providers.push({ provide: GoogleMapsApiReadyPromise, useValue: waitToken })
        };

        ({ internalApi: service, component: componentMock } = await configureGoogleMapsTestingModule(testConfig));

        zone   = TestBed.inject(NgZone);
        loader = TestBed.inject(GoogleMapsApiLoader);

        spyOn(zone, 'runOutsideAngular').and.callFake((fn: () => void) => fn());

        componentMock.ngOnInit();
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

            componentMock.nativeWrapper.native.then(native => native.raiseEvent(eventArgs));
        });
    });

    describe('upon calling `unhookEmitters()`', () =>
    {
        it('should remove all listeners from the native object', () =>
        {
            // Subscribe to the first event so it won't be skiped for having no observers
            componentMock.event1.subscribe(() => 'event1');

            service.hookEmitters(componentMock, EventsMapStub);

            expect(componentMock.listeners.length).toBe(1);

            spyOn(componentMock.nativeWrapper, 'stopListeningTo').and.callThrough();

            service.unhookEmitters(componentMock.nativeWrapper, EventsMapStub);

            expect(componentMock.nativeWrapper.stopListeningTo).toHaveBeenCalledTimes(EventsMapStub.length);
            expect(componentMock.listeners.length).toBe(0);
        });
    });

    describe('upon calling `delegateInputChangesToNativeObject()`', () =>
    {        
        it('should pass any detected changes to the wrapper\'s appropriate setter', async () =>
        {
            const newValue = 10;
            const changes: SimpleChanges = { fakeProperty: new SimpleChange(1, newValue, true) };

            const setterSpy = spyOn(componentMock.nativeWrapper as any, 'setFakeProperty').and.callThrough();

            service.delegateInputChangesToNativeObject(changes, componentMock.nativeWrapper);

            const native = await componentMock.nativeWrapper.native;

            expect(setterSpy).toHaveBeenCalledTimes(1);
            expect(native.fakeProperty).toBe(newValue);
        });
    });
});

const EventsMapStub = [
    { name: 'Event1', reference: 'native_event1' },
    { name: 'Event2', reference: 'native_event2' }
];

function createNativeWrapper(): IGoogleMapsNativeObjectEmittingWrapper
{
    const mockNative = {
        raiseEvent: (args: any) => this.listeners.forEach(handler => handler(args)),
        fakeProperty: null
    };

    const native = Promise.resolve(mockNative);

    return {
        listenTo: (eventName: string, handler: () => void) =>
        {
            this.listeners.push(handler);
            return Promise.resolve();
        },
        stopListeningTo: () =>
        {
            this.listeners = [];
            return Promise.resolve();
        },
        setFakeProperty(value: any) { mockNative.fakeProperty = value; },
        native,
        custom: null,
    } as IGoogleMapsNativeObjectEmittingWrapper;
}

@Component({
    providers: [
        { provide: WrapperFactory, useFactory: () => createNativeWrapper },
        { provide: EventsMap, useValue: EventsMapStub },
        CurrentMapProvider
    ]
})
class MockComponent extends GoogleMapsLifecycleBase implements OnInit
{
    public options?: any;
    // The callbacks passed-in when calling listenTo(). Stored so the native event could be fired and faked.
    public listeners: ((args: any) => void)[] = [];

    public event1: EventEmitter<void> = new EventEmitter();

    @WrapperInput() public dummyWrapperInput: IGoogleMapsNativeObjectEmittingWrapper;
}
