import { ZoomLevel } from './zoom-level.enum';

/**
 * Default values used by the map wrapper when not specified by the user.
 *
 * @export
 * @class Defaults
 */
export class Defaults
{
    /**
     * The default center for a map which is [0, 0].
     *
     * @static
     */
    public static readonly Center = { lat: 0, lng: 0 };
    /**
     * The default zoom level for a map which is city level.
     *
     * @static
     */
    public static readonly ZoomLevel = ZoomLevel.City;
}
