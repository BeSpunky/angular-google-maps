import { ZoomLevel } from '../types/zoom-level.enum';

export class Defaults
{
    public static readonly Center = new google.maps.LatLng(31.852775, 34.818484);
    public static readonly ZoomLevel = ZoomLevel.City;
}
