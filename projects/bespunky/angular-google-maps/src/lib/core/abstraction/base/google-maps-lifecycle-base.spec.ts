import { SimpleChange, SimpleChanges, Component, DebugElement, Input } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

import { configureGoogleMapsTestingModule } from '../../../testing/setup.spec';
import { GoogleMapsLifecycleBase } from './google-maps-lifecycle-base';
import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
import { IGoogleMapsNativeObjectEmittingWrapper } from './i-google-maps-native-object-emitting-wrapper';
import { WrapperFactory } from '../tokens/wrapper-factory.token';
import { EmittingNativeWrapperFactory } from '../types/native-wrapper-provider.type';
import { MockLifecycleComponent } from '../testing/google-maps-lifecycle-base.mock.spec';
import { MockEmittingWrapper } from '../testing/google-maps-emitting-wrapper.mock.spec';

describe('GoogleMapsLifecycleBase (abstract)', () =>
{
    let internalApi: GoogleMapsInternalApiService;
    let mockComponent: MockLifecycleComponent;
    let later: { promise: Promise<void>, resolve: () => void, reject: (reason: any) => void };
    let createNativeWrapper: EmittingNativeWrapperFactory<MockEmittingWrapper>;
    let debugElement: DebugElement;

    beforeEach(async () =>
    {
        ({ internalApi: internalApi, component: mockComponent, debugElement } = await configureGoogleMapsTestingModule({
            componentType: MockLifecycleComponent,
            // hookAndSetEmitters is called in the constructor so spy before component creation
            beforeComponentInit: (api, internalApi) => spyOn(internalApi, 'hookAndSetEmitters').and.stub()
        }));

        later = (mockComponent as any).waitForComponentInit;

        // The provider is defined at component level, so it only exists in the element's context. TestBed.inject() won't work here.
        createNativeWrapper = debugElement.injector.get(WrapperFactory) as EmittingNativeWrapperFactory<MockEmittingWrapper>;

        spyOn(internalApi, 'delegateInputChangesToNativeObject').and.stub();
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

        it('should hook emitters and set them to the component members', () =>
        {
            const hookArgs: any[] = (internalApi.hookAndSetEmitters as jasmine.Spy).calls.mostRecent().args;

            expect(internalApi.hookAndSetEmitters).toHaveBeenCalledTimes(1);
            expect(hookArgs[0]).toBe(mockComponent);
        });
    });

    describe('upon calling `ngOnInit()`', () =>
    {
        describe('basically', () =>
        {
            beforeEach(() =>
            {
                spyOn(later, 'resolve').and.stub();
            });

            it('should resolve the wait for init promise', () => expect(later.resolve).toHaveBeenCalledTimes(1));
        });

        describe('with no wrapper instance from an input member', () =>
        {
            it('should init `wrapper` with a new wrapper created using `createNativeWrapper()`', () =>
            {
                expect(mockComponent.wrapper).toBeUndefined();

                const mockComponentRaw = mockComponent as any;

                spyOn(mockComponentRaw, 'createNativeWrapper').and.callThrough();

                expect(mockComponentRaw.createNativeWrapper).toHaveBeenCalledTimes(1);
                // Verify that `wrapper` was assigned with a new wrapper created using the `createNativeWrapper()` method
                expect(mockComponent.wrapper).toBeDefined(mockComponentRaw.createNativeWrapper.calls.mostRecent().returnValue);
            });
        });
    });

    describe('when changes are detected', () =>
    {
        it('wait for component initialization and delegate the changes to the native object', fakeAsync(() =>
        {
            const changes: SimpleChanges = { value: new SimpleChange(1, 10, true) };

            mockComponent.ngOnChanges(changes);

            expect(internalApi.delegateInputChangesToNativeObject).not.toHaveBeenCalled();

            tick();

            expect(internalApi.delegateInputChangesToNativeObject).toHaveBeenCalledTimes(1);
        }));
    });
});