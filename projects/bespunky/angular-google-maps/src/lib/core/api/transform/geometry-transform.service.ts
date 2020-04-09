import { Injectable } from '@angular/core';

import { Coord } from '../../abstraction/types/geometry-utils.type';

@Injectable({
    providedIn: 'root'
})
export class GeometryTransformService
{
    constructor() { }
    
    public toCoordLiteral(coord: Coord): google.maps.LatLngLiteral
    {
        return coord instanceof google.maps.LatLng ? { lat: coord.lat(), lng: coord.lng() } : coord;
    }

    public toMultiPath(coords: Coord[] | Coord[][] | google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>): google.maps.LatLngLiteral[][]
    {
        if (coords instanceof google.maps.MVCArray)
            return coords.getArray().map(shape => shape.getArray().map(this.toCoordLiteral));
        
        if (typeof coords[0] === 'object')
            return [(coords as Coord[]).map(this.toCoordLiteral)];
        
        return (coords as Coord[][]).map(shape => shape.map(this.toCoordLiteral));
    }
}
