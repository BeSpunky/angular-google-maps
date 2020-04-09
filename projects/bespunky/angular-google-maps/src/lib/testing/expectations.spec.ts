/**
 * Provides util functions to shortcut `expect()` statements.
 */

import { Coord } from '../core/abstraction/types/geometry-utils.type';

/**
 * Shortcuts expecting a literal position match with a native LatLng object.
 * Uses `toBeCloseTo()` with 6 digits precision.
 *
 * @param position1 The first coordinate to compare.
 * @param position2 The second coordinate to compare.
 */
export function expectPositionEquals(position1: Coord, position2: Coord)
{
    position1 = position1 instanceof google.maps.LatLng ? position1.toJSON() : position1;
    position2 = position2 instanceof google.maps.LatLng ? position2.toJSON() : position2;
    
    expect(position1.lat).toBeCloseTo(position2.lat, 6);
    expect(position1.lng).toBeCloseTo(position2.lng, 6);
}
