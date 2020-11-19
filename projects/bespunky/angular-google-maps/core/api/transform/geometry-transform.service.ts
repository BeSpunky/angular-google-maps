import { Injectable } from '@angular/core';

import { Coord, NativePath, NativeMultiPath, CoordPath, MultiPath, NativeGeometry, BoundsLike, FlatCoord } from '../../abstraction/types/geometry.type';
import { IBounds                                                                                         } from '../../abstraction/base/i-bounds';

/**
 * Provides flexible methods for converting and analyzing geometry types.
 * 
 * @see [Geometry Types](/docs/additional-documentation/geometry-types.html) for more info.
 *
 * @export
 * @class GeometryTransformService
 */
@Injectable({
    providedIn: 'root'
})
export class GeometryTransformService
{
    /**
     * Converts a coord object of a known type to a flat coord array.
     *
     * @param {Coord} coord The coord to convert.
     * @returns {[number, number]} The flat coord representation of the coord.
     */
    public toFlatCoord(coord: Coord): FlatCoord
    {
        if (this.isFlatCoord(coord)) return coord;

        return coord instanceof google.maps.LatLng ? [coord.lat(), coord.lng()] : [coord.lat, coord.lng];
    }

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

        return coord instanceof google.maps.LatLng ? coord.toJSON() : coord as google.maps.LatLngLiteral;
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
        // An MVCArray of LinearRings will also be handled here.
        if (path instanceof google.maps.MVCArray)
            return (path as unknown as google.maps.MVCArray<NativePath>).getArray().map(shape => shape.getArray().map(this.toLiteralCoord.bind(this)));

        // Check for LinearRing[].
        if (path[0] instanceof google.maps.Data.LinearRing)
            return (path as google.maps.Data.LinearRing[]).map(shape => shape.getArray().map(this.toLiteralCoord.bind(this)));
        
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
        
        if (path instanceof google.maps.Data.LinearRing) return [path];

        return [path] as Coord[][];
    }

    /**
     * (Type Guard) Determines if the given path is a multi-path.
     *
     * @param {CoordPath} path The path to test.
     * @returns {path is MultiPath} `true` if the given path is a multi-path; otherwise `false`.
     */
    public isMultiPath(path: CoordPath): path is MultiPath
    {
        // This is an array of...
        return (path instanceof Array &&
                 // 1. Arrays which are not flat coords (This is actually a multi-path and not a flat path like [[0, 0], [1, 1]])
                    (path[0] instanceof Array && !this.isFlatCoord(path[0]))
                 // 2. Native LinearRing objects
                 || (path[0] instanceof google.maps.Data.LinearRing))
        // This is an MVCArray of either MVCArrays or LinearRings                 
            || (path instanceof google.maps.MVCArray && (path.getAt(0) instanceof google.maps.MVCArray || path.getAt(0) instanceof google.maps.Data.LinearRing));
    }

    /**
     * (Type Guard) Checks whether the given object is a native literal coord object (i.e. `google.maps.LatLngLiteral`).
     *
     * @param {*} object The object to test.
     * @returns {object is google.maps.LatLngLiteral} `true` if the object is a native literal coord object; otherwise `false`.
     */
    public isLiteralCoord(object: any): object is google.maps.LatLngLiteral
    {
        return !!(object && object.lat && object.lng);
    }

    /**
     * (Type Guard) Checks whether the given object is a flat coord array.
     *
     * @param {*} coord The object to test.
     * @returns {coord is FlatCoord} `true` if the object is a flat coord array; otherwise `false`.
     */
    public isFlatCoord(coord: any): coord is FlatCoord
    {
        return coord instanceof Array 
            && coord.length === 2
            // Latitude range
            && coord[0] >= -90  && coord[0] <= 90
            // Longitude range
            && coord[1] >= -180 && coord[1] <= 180;
    }

    /**
     * (Type Guard) Checks whether an object is a native bounds object (i.e. `google.maps.LatLngBounds`, `google.maps.LatLngBoundsLiteral`).
     *
     * @param {*} object The object to test.
     * @returns {object is google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral} `true` if the object is a native bounds object; otherwise `false`.
     */
    public isBounds(object: any): object is google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral
    {
        return object instanceof google.maps.LatLngBounds || this.isBoundsLiteral(object);
    }

    /**
     * (Type Guard) Checks whether the object implements the `google.maps.LatLngBoundsLiteral` interface..
     *
     * @param {*} object The object to test.
     * @returns {object is google.maps.LatLngBoundsLiteral} `true` if the object implements `google.maps.LatLngBoundsLiteral`; otherwise `false`.
     */
    public isBoundsLiteral(object: any): object is google.maps.LatLngBoundsLiteral
    {
        return !!(object && object.north && object.south && object.east && object.west);
    }

    /**
     * (Type Guard) Checks whether the object implements the IBounds interface (i.e. The object is an overlay object).
     *
     * @param {*} object The object to test.
     * @returns {object is IBounds} `true` if the object implements IBounds; otherwise `false`.
     */
    public isIBounds(object: any): object is IBounds
    {
        return object?.getBounds instanceof Function;
    }

    /**
     * (Type Guard) Checks whether an object is a native data layer geometry object.
     *
     * @param {*} object The object to test.
     * @returns {object is google.maps.Data.Geometry} `true` if the object is a native data layer geometry object; otherwise `false`.
     */
    public isDataLayerGeometry(object: any): object is google.maps.Data.Geometry
    {
        return object instanceof google.maps.Data.Geometry;
    }

    /**
     * Creates a native data layer geometry for a point (google.maps.Data.Point).
     *
     * @param {Coord} position The point coordinates.
     * @returns {google.maps.Data.Point} The point geometry.
     */
    public createDataPoint(position: Coord): google.maps.Data.Point
    {
        return new google.maps.Data.Point(this.toLiteralCoord(position));
    }

    /**
     * Creates a native data layer geometry for a polygon (google.maps.Data.Polygon).
     *
     * @param {CoordPath} path The path of the polygon.
     * @returns {google.maps.Data.Polygon} The polygon geometry.
     */
    public createDataPolygon(path: CoordPath): google.maps.Data.Polygon
    {
        return new google.maps.Data.Polygon(this.toLiteralMultiPath(path));
    }

    /**
     * Defines the bounds of the given coordinate.
     *
     * @param {Coord} coord The coordinate for which bounds should be defined.
     * @returns {google.maps.LatLngBounds} The bounds of the specified coordinate.
     */
    public defineCoordBounds(coord: Coord): google.maps.LatLngBounds
    {
        coord = this.toLiteralCoord(coord);

        return new google.maps.LatLngBounds(coord, coord);
    }

    /**
     * Defines the bounds of a given path (or multipath).
     *
     * @param {CoordPath} path The path for which bounds should be defined.
     * @returns {google.maps.LatLngBounds} The bounds of the specified path.
     */
    public definePathBounds(path: CoordPath): google.maps.LatLngBounds
    {
        const multiPath = this.toLiteralMultiPath(path);

        const bounds = new google.maps.LatLngBounds();

        multiPath.forEach(path => path.forEach(coord => bounds.extend(coord)));

        return bounds;
    }

    /**
     * Defines the bound of the given data layer geometry.
     *
     * @param {NativeGeometry} geometry The geometry for which bounds should be defined.
     * @returns {google.maps.LatLngBounds} The bounds of the specified data layer geometry.
     */
    public defineGeometryBounds(geometry: NativeGeometry): google.maps.LatLngBounds
    {
        const bounds = new google.maps.LatLngBounds();
        
        geometry.forEachLatLng(coord => bounds.extend(coord));

        return bounds;
    }

    /**
     * Defines the containing bounds of all specified elements combined.
     *
     * @param {(...BoundsLike[])} elements The elements for which bounds should be defined.
     * @returns {google.maps.LatLngBounds} The containing bounds of all specified elements combined.
     */
    public defineBounds(...elements: BoundsLike[]): google.maps.LatLngBounds
    {
        return elements.reduce<google.maps.LatLngBounds>((bounds, element) =>
        {
            let elementBounds: google.maps.LatLngBounds;

            // Check for a flat coord (special array case, treated separately)
            if (this.isFlatCoord(element)) elementBounds = this.defineCoordBounds(element);
            // Check for paths
            else if (Array.isArray(element) || element instanceof google.maps.MVCArray || element instanceof google.maps.Data.LinearRing) elementBounds = this.definePathBounds(element);
            // Check for IBound implementation (e.g. GoogleMapsMarker, GoogleMapsPolygon...)
            else if (this.isIBounds(element)) elementBounds = element.getBounds();
            // Check for bounds object
            else if (this.isBounds(element)) elementBounds = element as google.maps.LatLngBounds;
            // Check for data layer geometry object
            else if (this.isDataLayerGeometry(element)) elementBounds = this.defineGeometryBounds(element as NativeGeometry);
            // Nothing matched. This is a coordinate.
            else elementBounds = this.defineCoordBounds(element as Coord);

            return bounds.union(elementBounds);
        }, new google.maps.LatLngBounds());
    }

    /**
     * Calculates the center of the given elements by constructing their bounds and extracting its center.
     *
     * @param {...BoundsLike[]} elements The elements for which center should be calculated.
     * @returns {google.maps.LatLngLiteral} The center of the bounding box for the given elements.
     */
    public centerOf(...elements: BoundsLike[]): google.maps.LatLngLiteral
    {
        return this.defineBounds(...elements).getCenter().toJSON();
    }
}
