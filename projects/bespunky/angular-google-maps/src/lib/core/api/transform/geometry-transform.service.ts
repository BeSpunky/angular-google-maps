import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GeometryTransformService
{
    constructor() { }

    public toCoordLiteral(coord: google.maps.LatLng | google.maps.LatLngLiteral | google.maps.ReadonlyLatLngLiteral): google.maps.LatLngLiteral
    {
        return coord instanceof google.maps.LatLng ? { lat: coord.lat(), lng: coord.lng() } : coord;
    }
}
