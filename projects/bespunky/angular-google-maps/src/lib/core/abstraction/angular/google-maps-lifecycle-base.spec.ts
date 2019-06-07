import { SimpleChange, SimpleChanges } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GoogleMapsLifecycleBase } from './google-maps-lifecycle-base';
import { IGoogleMapsNativeObjectWrapper } from './i-google-maps-native-object-wrapper';
import { GoogleMapsInternalApiService } from '../../api/google-maps-internal-api.service';
import { GoogleMapsModule } from '../../../google-maps.module';
import { NoOpGoogleMapsApiLoader } from '../../loaders/no-op-google-maps-api-loader';
import { GoogleMapsApiLoader } from '../../loaders/google-maps-api-loader';

const EventsMapStub = [{ name: 'Event1', reference: 'event1' }];

class MockComponent extends GoogleMapsLifecycleBase
{
    constructor(protected api: GoogleMapsInternalApiService)
    {
        super(EventsMapStub, api);
    }

    protected initNativeWrapper(): IGoogleMapsNativeObjectWrapper
    {
        return {
            listenTo: () => true,
            stopListeningTo: () => true,
            native: {},
            custom: null
        } as IGoogleMapsNativeObjectWrapper;
    }
}

describe('GoogleMapsLifecycleBase (abstract)', () =>
{
    let api: GoogleMapsInternalApiService;
    let mockComponent: MockComponent;
    let later: { promise: Promise<void>, resolve: () => void, reject: (reason: any) => void };

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports: [GoogleMapsModule.forRoot({ apiUrl: 'dummyapiurl' })],
            providers: [
                // Replace the script loader service so google api script will not be downloaded
                { provide: GoogleMapsApiLoader, useClass: NoOpGoogleMapsApiLoader }
            ]
        });

        api = TestBed.get(GoogleMapsInternalApiService);
        mockComponent = new MockComponent(api);

        later = (mockComponent as any).waitForComponentInit;

        spyOn(api, 'hookEmitters').and.stub();
        spyOn(api, 'unhookEmitters').and.stub();
        spyOn(api, 'delegateInputChangesToNativeObject').and.stub();
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
        beforeEach(() =>
        {
            spyOn(later, 'resolve').and.stub();

            mockComponent.ngOnInit();
        });

        it('should set the native wrapper', () => expect(mockComponent.nativeWrapper).toBeDefined());

        it('should resolve the wait for init promise', () => expect(later.resolve).toHaveBeenCalledTimes(1));

        it('should hook emitters to the component', () =>
        {
            const hookArgs: any[] = (api.hookEmitters as jasmine.Spy).calls.mostRecent().args;

            expect(api.hookEmitters).toHaveBeenCalledTimes(1);
            expect(hookArgs[0]).toBe(mockComponent);
            expect(hookArgs[1]).toBe(EventsMapStub);
        });
    });

    describe('upon calling `ngOnDestroy()', () =>
    {
        beforeEach(() => mockComponent.ngOnDestroy());

        it('should unhook all emitters from the component', () =>
        {
            const hookArgs: any[] = (api.unhookEmitters as jasmine.Spy).calls.mostRecent().args;

            expect(api.unhookEmitters).toHaveBeenCalledTimes(1);
            expect(hookArgs[0]).toBe(mockComponent);
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
