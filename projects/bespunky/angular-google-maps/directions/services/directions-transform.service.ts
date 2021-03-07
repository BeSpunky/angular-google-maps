import { Injectable } from '@angular/core';

import { GeometryTransformService                                                             } from '@bespunky/angular-google-maps/core';
import { DirectionsPlace, DirectionsWaypoint, NativeDirectionsPlace, NativeDirectionsWaypoint } from '../abstraction/types/directions.type';

/**
 * Provides flexible methods for converting and analyzing directions related types.
 * 
 * Note: As this is an independent service, it is provided in root to allow using it without importing the `GoogleMapsDirectionsModule` itself.  
 *       If at any point the service becomes dependent of the module, this should be changed to `{ providedIn: GoogleMapsDirectionsModule }`.  
 *       A single instance will be created and Ivy will tree shake the service (if it is not injected anywhere in the using app) in both cases,
 *       the only difference will be the ability to use it without importing the module.
 *
 * @export
 * @class DirectionsTransformService
 */
@Injectable({ providedIn: 'root' })
export class DirectionsTransformService
{
    constructor(private geometry: GeometryTransformService) { }

    /**
     * Converts the given place to a native directions place.
     * If the place is a waypoint, it's location will be used.
     * If the place is a `BoundsLike` type, its center coordinate will be calculated and used as the place.
     *
     * @param {DirectionsPlace} place The place to use for directions.
     * @returns {NativeDirectionsPlace} The native representation of the place.
     */
    public toNativePlace(place: DirectionsPlace): NativeDirectionsPlace
    {
        if (this.isNativePlace(place)) return place;

        if (this.isWaypoint(place)) return this.isNativeWaypoint(place) ? place.location : this.toNativePlace(place.location);

        return this.geometry.centerOf(place);
    }

    /**
     * (Type Guard) Determines whether the given value is a native directions place object.
     *
     * @param {*} value The value to test.
     * @returns {value is NativeDirectionsPlace} `true` if the value is a native directions place object; otherwise `false`.
     */
    public isNativePlace(value: any): value is NativeDirectionsPlace
    {
        return !!value && (
            typeof value === 'string' ||
            this.geometry.isNativeCoord(value) ||
            // This will detect `google.maps.Place`
            this.geometry.isNativeCoord(value.location)
        );
    }

    /**
     * Transforms a place to a native waypoint.
     * If this is a place (not already a waypoint), it will be wrapped as a waypoint and assigned as the `location` property.
     *
     * @param {DirectionsPlace} place The place to transfrom to a native waypoint.
     * @returns {NativeDirectionsWaypoint} The native waypoint representation of the place.
     */
    public toNativeWaypoint(place: DirectionsPlace): NativeDirectionsWaypoint
    {
        if (this.isNativeWaypoint(place)) return place;

        let waypoint: DirectionsWaypoint;

        if      (this.isWaypoint(place)   ) waypoint = { ...place, location: this.toNativePlace(place.location) };
        else if (this.isNativePlace(place)) waypoint = { location: place };
        else                                waypoint = { location: this.toNativePlace(place) };

        return this.ensureNativeLocationTypeSupported(waypoint);
    }

    /**
     * In directions requests, origin and destination support `LatLngLiteral`s, while the `location` property of a waypoint doesn't.
     * So if the waypoint holds a literal object it must be converted to a `LatLng` object.
     *
     * @private
     * @param {NativeDirectionsWaypoint} waypoint
     */
    private ensureNativeLocationTypeSupported(waypoint: DirectionsWaypoint): NativeDirectionsWaypoint
    {
        let location = waypoint.location;

        if (this.geometry.isLiteralCoord(location))
            return { ...waypoint, location: new google.maps.LatLng(location.lat, location.lng) };
        
        return { ...waypoint } as NativeDirectionsWaypoint;
    }
    
    /**
     * (Type Guard) Determines if the given value is either a native waypoint or flexible waypoint (i.e. `google.maps.DirectionsWaypoint` or `DirectionsWaypoint`).
     * 
     * @param {*} value The value to test.
     * @returns {(value is NativeDirectionsWaypoint | DirectionsWaypoint)} `true` if the given value is a waypoint; otherwise `false`.
     */
    public isWaypoint(value: any): value is NativeDirectionsWaypoint | DirectionsWaypoint
    {
        return !!value && value.location && (this.isNativePlace(value.location) || this.geometry.isBoundsLike(value.location));
    }

    /**
     * (Type Guard) Determines if the given value is a native waypoint (e.g. `google.maps.DirectionsWaypoint`).
     *
     * @param {*} value The value to test.
     * @returns {value is NativeDirectionsWaypoint} `true` if the value is a native waypoint; otherwise `false`.
     */
    public isNativeWaypoint(value: any): value is NativeDirectionsWaypoint
    {
        // Literal coords are not part of `google.maps.DirectionsWaypoint.location`.
        return !this.geometry.isLiteralCoord(value?.location) && this.isNativePlace(value?.location);
    }
}
