import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component                                  } from '@angular/core';

import { configureGoogleMapsTestingModule                                                                                                                                             } from '@bespunky/angular-google-maps/testing';
import { createLifecycleTestingHostComponentTemplate, LifecycleComponentTestHost                                                                                                      } from '@bespunky/angular-google-maps/core/testing';
import { directionsResult, producePlaceSpecs                                                                                                                                          } from '@bespunky/angular-google-maps/directions/testing';
import { FlatCoord                                                                                                                                                                    } from '@bespunky/angular-google-maps/core';
import { DirectionsCallback, DirectionsPlace, DirectionsRequestConfig, DirectionsTransformService, GoogleMapsDirectionsDirective, GoogleMapsDirectionsModule, NativeDirectionsService } from '@bespunky/angular-google-maps/directions';

/**
 * -- NOTE --
 * Events hooking and property delegation are not tested in components deriving from `GoogleMapsComponentBase`.
 * The appropriate tests are already done by `GoogleMapsComponentBase` and `GoogleMapsInternalApiService`/
 * 
 * @see `google-maps-internal-api.service.spec.ts` For testing of the hooking and delegation mechanisms.
 * @see `google-maps-component-base.spec.ts` For testing of the integration between the component and the internal API service.
 */
describe('GoogleMapsDirectionsDirective', () =>
{
    let hostFixture  : ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let transform    : DirectionsTransformService;
    let directive    : GoogleMapsDirectionsDirective;
    let nativeRouteFn: jasmine.Spy;
    
    const from    = 'tel aviv';
    const to      = 'jerusalem';
    const through = [[0, 0] as FlatCoord, 'tel aviv', { location: 'jerusalem' }];

    beforeEach(async () =>
    {
        const nativeDirectionsService = jasmine.createSpyObj('NativeDirectionsService', ['route']);

        ({ fixture: hostFixture, component: hostComponent } = await configureGoogleMapsTestingModule({
            componentType: TestHostComponent,
            customize: def =>
            {
                def.imports.push(GoogleMapsDirectionsModule.forRoot());

                def.providers.push(
                    { provide: NativeDirectionsService, useValue: nativeDirectionsService }
                )
            }
        }));
        
        hostFixture.detectChanges();

        transform     = TestBed.inject(DirectionsTransformService);
        directive     = hostComponent.testedComponent as GoogleMapsDirectionsDirective;
        nativeRouteFn = nativeDirectionsService.route;
    });

    function testRoutingDelegationToNative(setHostValues: () => void, runExpectations: (createdRequest: google.maps.DirectionsRequest) => void)
    {
        return fakeAsync(() =>
        {
            setHostValues();

            hostFixture.detectChanges();
        
            tick();

            const routingCall    = nativeRouteFn.calls.mostRecent();
            const createdRequest = routingCall?.args[0] as google.maps.DirectionsRequest;

            runExpectations(createdRequest);
        });
    }

    function testFromToDelegationToNative(from: DirectionsPlace, to: DirectionsPlace, runExpectations: (createdRequest: google.maps.DirectionsRequest) => void)
    {
        return testRoutingDelegationToNative(() =>
        {
            hostComponent.from = from;
            hostComponent.to = to;
        }, runExpectations);
    }

    function testThroughDelegationToNative(through: DirectionsPlace[], runExpectations: (createdRequest: google.maps.DirectionsRequest) => void)
    {
        return testRoutingDelegationToNative(() => hostComponent.through = through, runExpectations);
    }

    describe('basically', () =>
    {
        it('should create an instance', () => expect(directive).toBeTruthy());
        
        it('should update directions with the new options when setting `config`', testRoutingDelegationToNative(
            () =>
            {
                hostComponent.from = from;
                hostComponent.to   = to;

                hostComponent.config = { travelMode: google.maps.TravelMode.BICYCLING, avoidTolls: true };
            },
            createdRequest =>
            {
                expect(nativeRouteFn).toHaveBeenCalledTimes(2); // Once when through was set, twice when config was set.
                expect(createdRequest.origin).toBe(from);
                expect(createdRequest.destination).toBe(to);
                expect(createdRequest.waypoints).toEqual([]);
                expect(createdRequest.travelMode).toBe(google.maps.TravelMode.BICYCLING);
                expect(createdRequest.avoidTolls).toBeTrue();
            }
        ));
    });

    describe('route requests using `from` and `to`', () =>
    {
        it('should set the directions when both `from` and `to` have been set', testFromToDelegationToNative(from, to, createdRequest =>
        {
            expect(nativeRouteFn).toHaveBeenCalledTimes(1);
            expect(createdRequest.origin).toBe(from);
            expect(createdRequest.destination).toBe(to);
            expect(createdRequest.waypoints).toEqual([]);
        }));

        producePlaceSpecs('set the directions', place => testFromToDelegationToNative(place, place, createdRequest =>
        {      
            expect(nativeRouteFn).toHaveBeenCalledTimes(1);
            expect(createdRequest.origin).toEqual(transform.toNativePlace(place));
            expect(createdRequest.destination).toEqual(transform.toNativePlace(place));
            expect(createdRequest.waypoints).toEqual([]);
        })()); // Invoking the fakeAsync function using `()` before returning to ensure the test starts running

        it('should do nothing if `from` is set but `to` isn\'t', testFromToDelegationToNative(from, null, () => expect(nativeRouteFn).not.toHaveBeenCalled()));
        it('should do nothing if `to` is set but `from` isn\'t', testFromToDelegationToNative(null, to  , () => expect(nativeRouteFn).not.toHaveBeenCalled()));
    });

    describe('route requests using `through`', () =>
    {
        it('should set the directions when `through` have been set', testThroughDelegationToNative(through, createdRequest =>
        {
            expect(nativeRouteFn).toHaveBeenCalledTimes(1);
            expect(createdRequest.origin     ).toEqual(transform.toNativePlace(through[0]));
            expect(createdRequest.destination).toEqual(transform.toNativePlace(through.slice(-1)[0]));
            expect(createdRequest.waypoints  ).toEqual(through.slice(1, -1).map(waypoint => transform.toNativeWaypoint(waypoint)));
        }));
        
        producePlaceSpecs('set the directions', place => testThroughDelegationToNative([place, ...through], createdRequest =>
        {
            expect(nativeRouteFn).toHaveBeenCalledTimes(1);
            expect(createdRequest.origin     ).toEqual(transform.toNativePlace(place));
            expect(createdRequest.destination).toEqual(transform.toNativePlace(through.slice(-1)[0]));
            // TODO: Waypoints test is skipped as native LatLng objects cannot be compared using `toEqual()`. Find a way to incorporate the test.
            // expect(createdRequest.waypoints).toEqual(through.slice(0, -1).map(waypoint => transform.toNativeWaypoint(waypoint)));
        })());
        
        it('should fail if `through` is set with less than 2 items', (() =>
        {
            hostComponent.through = [through[0]];

            expect(fakeAsync(() =>
            {
                hostFixture.detectChanges();

                tick();
            })).toThrowError(/At least 2/);
        }));
    });
});

@Component({
    template: createLifecycleTestingHostComponentTemplate('<bs-google-maps-directions [through]="through" [from]="from" [to]="to" [config]="config" #testedComponent></bs-google-maps-directions>')
})
class TestHostComponent extends LifecycleComponentTestHost
{ 
    public through: DirectionsPlace[];
    public from   : DirectionsPlace;
    public to     : DirectionsPlace;
    public config : DirectionsRequestConfig;
}