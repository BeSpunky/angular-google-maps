import { Injectable } from '@angular/core';
import { GeometryTransformService } from '@bespunky/angular-google-maps/core';
import { DirectionsPlace, NativeDirectionsPlace } from '../abstraction/types/types';

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

        return this.geometry.centerOf(place);
    }

    public isNativePlace(value: any): value is google.maps.Place
    {
        return value.placeId || value.query || value.location && this.geometry.isNativeCoord(value.location);
    }

    public toNativeWaypoint(place: DirectionsPlace, stopover?: boolean): google.maps.DirectionsWaypoint
    {
        const nativePlace = this.toNativePlace(place);

        return {
            location: this.geometry.isLiteralCoord(nativePlace) ? new google.maps.LatLng(nativePlace.lat, nativePlace.lng) : nativePlace,
            stopover
        };
    }
}
