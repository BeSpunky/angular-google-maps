import { Injectable } from '@angular/core';

import { Coord, Path, NativeMultiPath, NativePath, FlatCoord, CoordPath, MultiPath, NativeCoord } from '../../abstraction/types/geometry.type';

@Injectable({
    providedIn: 'root'
})
export class GeometryTransformService
{
    constructor() { }

    public toLiteralCoord(coord: Coord): google.maps.LatLngLiteral
    {
        // This relies on typescript to ensure 2 items in the array
        if (this.isFlatCoord(coord)) return { lat: coord[0], lng: coord[1] };

        return coord instanceof google.maps.LatLng ? { lat: coord.lat(), lng: coord.lng() } : coord as google.maps.LatLngLiteral;
    }

    public toLiteralMultiPath(path: CoordPath): google.maps.LatLngLiteral[][]
    {
        if (!this.isMultiPath(path)) path = this.castMultPath(path);

        // Check for multipath represented as a google.maps.MVCArray object.
        if (path instanceof google.maps.MVCArray)
            return (path as unknown as NativeMultiPath).getArray().map(shape => shape.getArray().map(this.toLiteralCoord.bind(this)));

        // This is either a multipath represented as a 2d array of flat coords or
        // a multipath represented as LatLng or LatLngLiteral objects
        return (path as Coord[][]).map(shape => shape.map(this.toLiteralCoord.bind(this)));
    }

    public castMultPath(path: CoordPath): MultiPath
    {
        if (this.isMultiPath(path)) return path as MultiPath;
        
        if (path instanceof google.maps.MVCArray) return new google.maps.MVCArray([path]) as NativeMultiPath;
        
        return [path] as Coord[][];
    }

    public isMultiPath(path: CoordPath): boolean
    {
        return (path instanceof Array && path[0] instanceof Array && !this.isFlatCoord(path[0]))
            || (path instanceof google.maps.MVCArray && path.getAt(0) instanceof google.maps.MVCArray);
    }

    public isFlatCoord(coord: any): boolean
    {
        return coord instanceof Array
            && coord.length === 2
            // Latitude range
            && coord[0] >= -90
            && coord[0] <= 90
            // Longitude range
            && coord[1] >= -180
            && coord[1] <= 180;
    }
}
