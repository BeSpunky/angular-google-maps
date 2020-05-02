/**
 * Provides util functions to shortcut `expect()` statements.
 */

import { GeometryTransformService, Coord } from '@bespunky/angular-google-maps/core';

/**
 * Shortcuts expecting a literal position match with a native LatLng object.
 * Uses `toBeCloseTo()` with 6 digits precision.
 *
 * @param position1 The first coordinate to compare.
 * @param position2 The second coordinate to compare.
 */
export function expectPositionEquals(position1: Coord, position2: Coord, geometry?: GeometryTransformService)
{
    geometry = geometry || new GeometryTransformService();

    position1 = geometry.toLiteralCoord(position1);
    position2 = geometry.toLiteralCoord(position2);
    
    expect(position1.lat).toBeCloseTo(position2.lat, 6);
    expect(position1.lng).toBeCloseTo(position2.lng, 6);
}
