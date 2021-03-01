import { Injectable } from '@angular/core';
import { GeometryTransformService } from '../../core';
import { DirectionsPlace, NativeDirectionsPlace } from '../abstraction/types/types';

@Injectable({
    providedIn: 'root'
})
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
