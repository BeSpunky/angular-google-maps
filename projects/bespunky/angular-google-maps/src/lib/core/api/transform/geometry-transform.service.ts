import { Injectable } from '@angular/core';

import { Coord, MultiPath } from '../../abstraction/types/geometry-utils.type';

@Injectable({
    providedIn: 'root'
})
export class GeometryTransformService
{
    constructor() { }
    
    public toLiteralCoord(coord: Coord): google.maps.LatLngLiteral
    {
        // This relies on typescript to ensure 2 items in the array
        if (coord instanceof Array) return { lat: coord[0], lng: coord[1] };

        return coord instanceof google.maps.LatLng ? { lat: coord.lat(), lng: coord.lng() } : coord;
    }

    public toLiteralMultiPath(coords: MultiPath): google.maps.LatLngLiteral[][]
    {
        if (coords instanceof google.maps.MVCArray)
            return coords.getArray().map(shape => shape.getArray().map(this.toLiteralCoord));
        
        // This will apply to flat coord array as well
        if (typeof coords[0] === 'object')
            return [(coords as Coord[]).map(this.toLiteralCoord)];
        
        return (coords as Coord[][]).map(shape => shape.map(this.toLiteralCoord));
    }
}
