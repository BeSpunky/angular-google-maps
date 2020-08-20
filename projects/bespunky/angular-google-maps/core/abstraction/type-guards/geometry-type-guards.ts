import { IBounds } from '../base/i-bounds';

export function isBoundsLiteral(object: any): object is google.maps.LatLngBoundsLiteral
{
    return !!(object && object.north && object.south && object.east && object.west);
}

export function hasBounds(object: any): object is IBounds
{
    return object?.getBounds instanceof Function;
}
