import { BehaviorSubject } from 'rxjs';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgZone, EventEmitter, OnInit, SimpleChanges, SimpleChange, Component, Input, Output } from '@angular/core';

import { GoogleMapsInternalApiService } from './google-maps-internal-api.service';
import { GoogleMapsApiReadyPromise } from './google-maps-api-ready.token';
import { GoogleMapsApiLoader } from '../loaders/google-maps-api-loader';
import { GoogleMapsLifecycleBase } from '../abstraction/base/google-maps-lifecycle-base';
import { GoogleMapsEventData } from '../abstraction/events/google-maps-event-data';
import { IGoogleMapsTestingModuleConfigOptions, configureGoogleMapsTestingModule } from '../../testing/setup.spec';
import { IGoogleMapsNativeObjectEmittingWrapper } from '../abstraction/base/i-google-maps-native-object-emitting-wrapper';
import { WrapperFactory } from '../abstraction/tokens/wrapper-factory.token';
import { Wrapper } from '../decorators/wrapper.decorator';
import { Hook } from '../decorators/hook.decorator';

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

    describe('upon calling `hookAndSetEmitters()', () =>
    {
        it('should assign observables to the component\'s output members', () =>
        {
            // Subscribe to the first event so it won't be skiped for having no observers
            componentMock.event1.subscribe(() => 'event1');

            spyOn(componentMock.nativeWrapper, 'listenTo').and.callThrough();

            service.hookEmitters(componentMock);

            // If listenTo() was called once, only one event1 got hooked and we won
            expect(componentMock.nativeWrapper.listenTo).toHaveBeenCalledTimes(1);
            expect(componentMock.wrapper.listeners.length).toBe(1);
        });

        it('should create a callback that generates an event data object and emit the event', async (done: DoneFn) =>
        {
            const eventArgs = { value: 'dummy' };

            const native = await componentMock.nativeWrapper.native;
            // Subscribe to the first event so it won't be skiped for having no observers
            componentMock.event1.subscribe((eventData: GoogleMapsEventData) =>
            {
                expect(eventData.eventName).toBe('Event1', 'wrong event name');
                expect(eventData.emitter).toBe(componentMock.nativeWrapper, 'wrong emitter');
                expect(eventData.associatedEmitter).toBe(componentMock.nativeWrapper, 'wrong delegated emitter');
                expect(eventData.nativeEmitter).toBe(native, 'wrong native emitter');
                expect(eventData.args[0]).toEqual(eventArgs, 'wrong event args'); // For unrecognized native args, the transformer should return the native args
                expect(eventData.nativeArgs[0]).toEqual(eventArgs, 'wrong native event args');

                done();
            });

            service.hookEmitters(componentMock);

            native.raiseEvent(eventArgs);
        });
        
        it('should be able to hook events of a wrapper different to the component\'s inner wrapper', async (done: DoneFn) =>
        {
            const eventArgs = { value: 'dummy' };

            const secondWrapper = createNativeWrapper.call({});
            const secondNative = await secondWrapper.native;

            // Subscribe to the first event so it won't be skiped for having no observers
            componentMock.event1.subscribe((eventData: GoogleMapsEventData) =>
            {
                expect(eventData.eventName).toBe('Event1', 'wrong event name');
                expect(eventData.emitter).toBe(secondWrapper, 'wrong emitter');
                expect(eventData.associatedEmitter).toBe(componentMock.nativeWrapper, 'wrong delegated emitter');
                expect(eventData.nativeEmitter).toBe(secondNative, 'wrong native emitter');
                expect(eventData.args[0]).toEqual(eventArgs, 'wrong event args'); // For unrecognized native args, the transformer should return the native args
                expect(eventData.nativeArgs[0]).toEqual(eventArgs, 'wrong native event args');

                done();
            });

            service.hookEmitters(componentMock, secondWrapper);

            secondNative.raiseEvent(eventArgs);
        });

        // it('should allow filtering of events', fakeAsync(async () =>
        // {
        //     const shouldEmitArgs    = { shouldEmit: true };
        //     const shouldNotEmitArgs = { shouldEmit: false };

        //     spyOn(componentMock.event1, 'emit').and.callThrough();

        //     componentMock.event1.subscribe(() => )
        //     service.hookEmitters(componentMock, EventsMapStub, null, (event) => event.nativeArgs.shouldEmit);

        //     const native = await componentMock.wrapper.native;
            
        //     native.raiseEvent(shouldEmitArgs);
        //     native.raiseEvent(shouldNotEmitArgs);

        //     tick();
        //     expect(componentMock.event1.emit).toHaveBeenCalledTimes(1);
        // }));
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

class MockWrapper implements IGoogleMapsNativeObjectEmittingWrapper
{
    public listeners = [];
    public mockNative = {
        raiseEvent: (args: any) => this.listeners.forEach(handler => handler.call(this.mockNative, args)),
        fakeProperty: null
    };

    listenTo(eventName: string, handler: (...args: any[]) => void): Promise<() => void>
    {
        this.listeners.push(handler);

        return Promise.resolve(() => void 0);
    }

    stopListeningTo(eventName: string): Promise<void>
    {
        this.listeners = [];

        return Promise.resolve();
    }

    clearListeners(): Promise<void>
    {
        this.listeners = [];

        return Promise.resolve();
    }

    setFakeProperty(value: any)
    {
        this.mockNative.fakeProperty = value;
    }
    
    native = Promise.resolve(this.mockNative);
    custom: any;    
}

function createNativeWrapper(): IGoogleMapsNativeObjectEmittingWrapper
{
    return new MockWrapper();
}

@Component({
    providers: [
        { provide: WrapperFactory, useFactory: () => createNativeWrapper }
    ]
})
class MockComponent extends GoogleMapsLifecycleBase implements OnInit
{
    public options?: any;

    @Hook('native_event1') @Output() public event1: EventEmitter<any>;

    @Wrapper @Input() public wrapper: MockWrapper;
}
