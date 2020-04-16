import { Injectable } from '@angular/core';

import { Coord, NativeMultiPath, CoordPath, MultiPath } from '../../abstraction/types/geometry.type';

@Injectable({
    providedIn: 'root'
})
export class GeometryTransformService
{
    constructor() { }

    /**
     * Converts a coord object of a known type to a native `LatLngLiteral` object.
     *
     * @param {Coord} coord The coord to convert.
     * @returns {google.maps.LatLngLiteral} The native literal representation of the coord.
     */
    public toLiteralCoord(coord: Coord): google.maps.LatLngLiteral
    {
        // This relies on typescript to ensure 2 items in the array
        if (this.isFlatCoord(coord)) return { lat: coord[0], lng: coord[1] };

        return coord instanceof google.maps.LatLng ? { lat: coord.lat(), lng: coord.lng() } : coord as google.maps.LatLngLiteral;
    }

    /**
     * Converts a path object of a known type to native multi-path of type `LatLngLiteral[][]`.
     *
     * @param {CoordPath} path The path to convert. Can be a single or multi-path.
     * @returns {google.maps.LatLngLiteral[][]} The multi-path native literal representation of the given path.
     */
    public toLiteralMultiPath(path: CoordPath): google.maps.LatLngLiteral[][]
    {
        if (!this.isMultiPath(path)) path = this.castMultiPath(path);

        // Check for multipath represented as a google.maps.MVCArray object.
        if (path instanceof google.maps.MVCArray)
            return (path as unknown as NativeMultiPath).getArray().map(shape => shape.getArray().map(this.toLiteralCoord.bind(this)));

        // This is either a multipath represented as a 2d array of flat coords or
        // a multipath represented as LatLng or LatLngLiteral objects
        return (path as Coord[][]).map(shape => shape.map(this.toLiteralCoord.bind(this)));
    }

    /**
     * Ensures that a path is represented as a multipath.
     * Similar to lodash's `castArray()` but takes care of native google types.
     *
     * @param {CoordPath} path The path to cast as a multi-path.
     * @returns {MultiPath} The multi-path representation of the given path.
     */
    public castMultiPath(path: CoordPath): MultiPath
    {
        if (this.isMultiPath(path)) return path as MultiPath;
        
        if (path instanceof google.maps.MVCArray) return new google.maps.MVCArray([path]) as NativeMultiPath;
        
        return [path] as Coord[][];
    }

    /**
     * Determines if the given path is a multi-path.
     *
     * @param {CoordPath} path The path to test.
     * @returns {boolean} `true` if the given path is a multi-path; otherwise `false`.
     */
    public isMultiPath(path: CoordPath): boolean
    {
        return (path instanceof Array && path[0] instanceof Array && !this.isFlatCoord(path[0]))
            || (path instanceof google.maps.MVCArray && path.getAt(0) instanceof google.maps.MVCArray);
    }

    /**
     * Determines if the given object is a flat coord array.
     *
     * @param {*} coord The object to test.
     * @returns {boolean} `true` if the object is a flat coord array; otherwise `false`.
     */
    public isFlatCoord(coord: any): boolean
    {
        return coord instanceof Array 
            && coord.length === 2
            // Latitude range
            && coord[0] >= -90  && coord[0] <= 90
            // Longitude range
            && coord[1] >= -180 && coord[1] <= 180;
    }

    public createDataPoint(position: Coord): google.maps.Data.Point
    {
        return new google.maps.Data.Point(this.toLiteralCoord(position));
    }

    public createDataPolygon(path: CoordPath): google.maps.Data.Polygon
    {
        return new google.maps.Data.Polygon(this.toLiteralMultiPath(path));
    }
}
