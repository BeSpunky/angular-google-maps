import { Injectable } from '@angular/core';
import { GeometryTransformService } from '@bespunky/angular-google-maps/core';
import { DirectionsPlace, DirectionsWaypoint, NativeDirectionsPlace, NativeDirectionsWaypoint } from '../abstraction/types/types';

/**
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

    public toNativePlace(place: DirectionsPlace): NativeDirectionsPlace
    {
        if (typeof place === 'string' || this.isNativePlace(place)) return place;

        if (this.isWaypoint(place)) return this.isNativeWaypoint(place) ? place.location : this.toNativePlace(place.location);

        return this.geometry.centerOf(place);
    }

    public isNativePlace(value: any): value is NativeDirectionsPlace
    {
        if (!value) return false;
        
        return value.placeId || value.query || value.location && this.geometry.isNativeCoord(value.location);
    }

    public toNativeWaypoint(place: DirectionsPlace): NativeDirectionsWaypoint
    {
        const waypoint = this.isWaypoint(place) ? place : { location: this.toNativePlace(place) };
        
        return this.convertWaypointLocationToNative(waypoint);
    }

    /**
     * In directions requests, origin and destination support `LatLngLiteral`s, while the `location` property of a waypoint doesn't.
     * So if the waypoint holds a literal object it must be converted to a `LatLng` object.
     *
     * @private
     * @param {NativeDirectionsWaypoint} waypoint
     */
    private convertWaypointLocationToNative(waypoint: DirectionsWaypoint): NativeDirectionsWaypoint
    {
        let location = waypoint?.location;

        if (this.geometry.isLiteralCoord(location))
            return { ...waypoint, location: new google.maps.LatLng(location.lat, location.lng) };
        
        return { ...waypoint } as NativeDirectionsWaypoint;
    }
    
    /**
     * (Type Guard)
     * 
     * 
     * 
     * 
     * @param {*} value
     * @returns {(value is NativeDirectionsWaypoint | DirectionsWaypoint)}
     */
    public isWaypoint(value: any): value is NativeDirectionsWaypoint | DirectionsWaypoint
    {
        return value && value.location && (this.isNativePlace(value.location) || this.geometry.isBoundsLike(value.location)) && ['boolean', 'undefined'].includes(typeof value.stepover);
    }

    public isNativeWaypoint(value: any): value is NativeDirectionsWaypoint
    {
        return this.isNativePlace(value?.location);
    }
}
