import { SimpleChange, SimpleChanges, Component } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

import { configureGoogleMapsTestingModule } from '../../../testing/setup';
import { GoogleMapsLifecycleBase } from './google-maps-lifecycle-base';
import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';

describe('GoogleMapsLifecycleBase (abstract)', () =>
{
    let api: GoogleMapsInternalApiService;
    let mockComponent: MockComponent;
    let later: { promise: Promise<void>, resolve: () => void, reject: (reason: any) => void };

    beforeEach(() =>
    {
        ({ internalApi: api, component: mockComponent } = configureGoogleMapsTestingModule({
            componentType: MockComponent
        }));

        later = (mockComponent as any).waitForComponentInit;

        spyOn(api, 'hookEmitters').and.stub();
        spyOn(api, 'unhookEmitters').and.stub();
        spyOn(api, 'delegateInputChangesToNativeObject').and.stub();
    });

    afterEach(() =>
    {
        // Some of the tests don't call ngOnInit(), thus leaving the nativeWrapper property undefined.
        // The tests all pass but console errors show when jasmine automatically calls ngOnDestroy(), as it calls
        // api.unhookEmitters() with an undefined wrapper. This workaround solves it.
        if (!mockComponent.nativeWrapper)
            mockComponent.nativeWrapper = mockComponent.createNativeWrapper();
    });

    describe('basically', () =>
    {
        it('should create an instance', () => expect(mockComponent).toBeTruthy());

        it('should create and store a promise for later use when instantiated', () =>
        {
            expect(later.promise instanceof Promise).toBeTruthy();
            expect(later.resolve instanceof Function).toBeTruthy();
            expect(later.reject instanceof Function).toBeTruthy();
        });
    });

    describe('upon calling `ngOnInit()`', () =>
    {
        describe('with a wrapper instance input from the template', () =>
        {
            it('should the input to `nativeWrapper`', () =>
            {
                const wrapper = mockComponent.createNativeWrapper();

                // Simulate `@Input()` assignment of the wrapper from using template
                mockComponent.dummyInputWrapper = wrapper;

                // Allow the component to initialize
                mockComponent.ngOnInit();

                // Verify that `nativeWrapper` assigned with the wrapper passed in from the template
                expect(mockComponent.nativeWrapper).toBe(wrapper);
            });
        });

        describe('with no wrapper instance from an input member', () =>
        {
            it('should init `nativeWrapper` with a new wrapper created using `createNativeWrapper()`', () =>
            {
                expect(mockComponent.nativeWrapper).toBeUndefined();

                const createWrapperSpy = spyOn(mockComponent, 'createNativeWrapper').and.callThrough();

                // Allow the component to initialize
                mockComponent.ngOnInit();

                expect(createWrapperSpy).toHaveBeenCalledTimes(1);
                // Verify that `nativeWrapper` was assigned with a new wrapper created using the `createNativeWrapper()` method
                expect(mockComponent.nativeWrapper).toBeDefined(createWrapperSpy.calls.mostRecent().returnValue);
            });
        });

        describe('basically', () =>
        {
            beforeEach(() =>
            {
                spyOn(later, 'resolve').and.stub();

                mockComponent.ngOnInit();
            });

            it('should initialize the native wrapper', () => expect(mockComponent.nativeWrapper).toBeDefined());

            it('should resolve the wait for init promise', () => expect(later.resolve).toHaveBeenCalledTimes(1));

            it('should hook emitters to the component', () =>
            {
                const hookArgs: any[] = (api.hookEmitters as jasmine.Spy).calls.mostRecent().args;

                expect(api.hookEmitters).toHaveBeenCalledTimes(1);
                expect(hookArgs[0]).toBe(mockComponent);
                expect(hookArgs[1]).toBe(EventsMapStub);
            });
        });
    });

    describe('upon calling `ngOnDestroy()', () =>
    {
        beforeEach(() => mockComponent.ngOnDestroy());

        it('should unhook all emitters from the component', () =>
        {
            const hookArgs: any[] = (api.unhookEmitters as jasmine.Spy).calls.mostRecent().args;

            expect(api.unhookEmitters).toHaveBeenCalledTimes(1);
            expect(hookArgs[0]).toBe(mockComponent.nativeWrapper);
            expect(hookArgs[1]).toBe(EventsMapStub);
        });
    });

    describe('when changes are detected', () =>
    {
        it('wait for component initialization and delegate the changes to the native object', fakeAsync(() =>
        {
            const changes: SimpleChanges = { value: new SimpleChange(1, 10, true) };

            mockComponent.ngOnChanges(changes);

            expect(api.delegateInputChangesToNativeObject).not.toHaveBeenCalled();

            mockComponent.ngOnInit();

            tick();

            expect(api.delegateInputChangesToNativeObject).toHaveBeenCalledTimes(1);
        }));
    });
});

const EventsMapStub = [{ name: 'Event1', reference: 'event1' }];

@Component({})
class MockComponent extends GoogleMapsLifecycleBase
{
    public dummyInputWrapper: IGoogleMapsNativeObjectEmittingWrapper;

    constructor(protected api: GoogleMapsInternalApiService)
    {
        super(EventsMapStub, api);
    }

    public get nativeWrapperInput(): IGoogleMapsNativeObjectEmittingWrapper
    {
        return this.dummyInputWrapper;
    }

    public createNativeWrapper(): IGoogleMapsNativeObjectEmittingWrapper
    {
        return {
            listenTo: () => Promise.resolve(),
            stopListeningTo: () => Promise.resolve(),
            native: Promise.resolve({}),
            custom: null
        };
    }
}