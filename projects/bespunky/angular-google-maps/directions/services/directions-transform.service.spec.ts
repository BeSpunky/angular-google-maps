import { producePlaceSpecs, produceWaypointSpecs, produceNativePlaceSpecs, produceFlexiblePlaceSpecs, expectPlace, expectWaypoint, produceNativeWaypointSpecs, produceFlexibleWaypointSpecs } from '@bespunky/angular-google-maps/directions/testing';
import { GeometryTransformService   } from '@bespunky/angular-google-maps/core';
import { DirectionsTransformService } from '@bespunky/angular-google-maps/directions';
import { configureGoogleMapsTestingModule } from '@bespunky/angular-google-maps/async/testing';
import { TestBed } from '@angular/core/testing';

describe('DirectionsTransformService', () =>
{
    let geometry  : GeometryTransformService;
    let directions: DirectionsTransformService;

    beforeAll(() =>
    {
        configureGoogleMapsTestingModule();

        geometry   = TestBed.inject(GeometryTransformService);
        directions = TestBed.inject(DirectionsTransformService);
    });

    function testTypeGuardFalseAgainstStandardValues(guard: (value: any) => boolean)
    {
        expect(guard(null)).toBeFalsy();
        expect(guard(undefined)).toBeFalsy();
        expect(guard({})).toBeFalsy();
        expect(guard([])).toBeFalsy();
        expect(guard([[]])).toBeFalsy();
        expect(guard(10)).toBeFalsy();
    }

    describe('Basically', () =>
    {
        it('should be created', () => expect(directions).toBeTruthy());
    });

    describe('toNativePlace', () => producePlaceSpecs('transform place to a native place', place =>
    {
        const native = directions.toNativePlace(place);

        expect(directions.isNativePlace(native)).toBeTrue();
        expectPlace(() => native, place);
    }));
    
    describe('isNativePlace', () =>
    {
        it('should determine whether an object is a native place', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => directions.isNativePlace(value));
            
            expect(directions.isNativePlace({ location: 123 })).toBeFalse();
        });

        produceNativePlaceSpecs  ('determine whether the object is a native place', place => expect(directions.isNativePlace(place)).toBeTruthy());
        produceFlexiblePlaceSpecs('determine whether the object is a native place', place => expect(directions.isNativePlace(place)).toBeFalse());
    });

    describe('toNativeWaypoint', () => produceWaypointSpecs('transform waypoint to a native waypoint', waypoint =>
    {
        const native = directions.toNativeWaypoint(waypoint);

        expect(directions.isNativeWaypoint(native)).toBeTrue();
        expectWaypoint(() => native, waypoint);
    }));

    describe('isNativeWaypoint', () =>
    {
        it('should determine whether an object is a native waypoint', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => directions.isNativeWaypoint(value));
            
            expect(directions.isNativeWaypoint({ location: 123 })).toBeFalse();
        });

        produceNativeWaypointSpecs  ('determine whether the object is a native waypoint', waypoint => expect(directions.isNativeWaypoint(waypoint)).toBeTrue());
        produceFlexibleWaypointSpecs('determine whether the object is a native waypoint', waypoint => expect(directions.isNativeWaypoint(waypoint)).toBeFalse());
    });

    describe('isWaypoint', () =>
    {
        it('should determine whether an object is a waypoint', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => directions.isWaypoint(value));
            
            expect(directions.isWaypoint({ location: 123 })).toBeFalse();
        });

        produceWaypointSpecs('determine whether the object is a waypoint', waypoint => expect(directions.isWaypoint(waypoint)).toBeTrue());
    });
});
