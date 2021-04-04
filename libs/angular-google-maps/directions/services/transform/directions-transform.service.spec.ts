import { TestBed } from '@angular/core/testing';

import { configureGoogleMapsTestingModule                                                                                                                      } from '@bespunky/angular-google-maps/async/testing';
import { producePlaceSpecs, produceWaypointSpecs, produceNativePlaceSpecs, produceFlexiblePlaceSpecs, produceNativeWaypointSpecs, produceFlexibleWaypointSpecs } from '@bespunky/angular-google-maps/directions/testing';
import { GeometryTransformService                                                                                                                              } from '@bespunky/angular-google-maps/core';
import { DirectionsTransformService                                                                                                                            } from '@bespunky/angular-google-maps/directions';

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

        // TODO: This only tests for types. Create a test that actually matches content to the expected content.
        expect(directions.isNativePlace(native)).toBeTrue();
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
    
    describe('isNativePlaceObject', () =>
    {
        it('should determine whether an object is a native `google.maps.Place` object', () =>
        {
            testTypeGuardFalseAgainstStandardValues((value) => directions.isNativePlaceObject(value));
            
            expect(directions.isNativePlaceObject({ location: 123 })).toBeFalse();
        });

        produceNativePlaceSpecs('determine whether the object is a native `google.maps.Place` object', place =>
        {
            const expectIsNativePlaceObject = expect(directions.isNativePlaceObject(place));

            typeof place === 'object' && 'location' in place && geometry.isNativeCoord(place.location) ?
                expectIsNativePlaceObject.toBeTrue() :
                expectIsNativePlaceObject.toBeFalse();
        });

        produceFlexiblePlaceSpecs('determine whether the object is a native `google.maps.Place` object', place => expect(directions.isNativePlaceObject(place)).toBeFalse());
    });

    // As toNativeWaypoint() recives a DirectionsPlace, this test runs on all PLACES, not waypoints.
    // In turn, this tests waypoint types as well
    describe('toNativeWaypoint', () => producePlaceSpecs('transform waypoint to a native waypoint', waypoint =>
    {
        const native = directions.toNativeWaypoint(waypoint);

        // TODO: This only tests for types. Create a test that actually matches content to the expected content.
        expect(directions.isNativeWaypoint(native)).toBeTrue();
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
